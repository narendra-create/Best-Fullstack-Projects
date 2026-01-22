import OrderModel from "../models/OrderSchema.js";
import { nanoid } from "nanoid";
import Vendor from "../models/VendorSchema.js";
import Product from "../models/ProductSchema.js";
import instance from '../config/razorpay.js';
import mongoose from "mongoose";

const deliverycharge = 40;
const platformfee = 2.4;
const discount = 20;

const allcharges = deliverycharge + platformfee - discount;


const generateOrderReference = () => {
    //like this - IE-251008-AB12CD
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const randomPart = nanoid(6).toUpperCase();

    return `IE-${year}${month}${day}-${randomPart}`;
}

//place order 

const placeOrder = async (req, res) => {
    try {
        const { user } = req.user;
        const { vendor, items, instructions } = req.body;

        if (!vendor || !items || items.length === 0) return res.status(400).json({ message: "Missing required fields !" })
        //check if product exists and amount available in future 

        const vendorexists = await Vendor.findOne({ _id: vendor })
        if (!vendorexists) {
            return res.status(404).json({ message: "Vendor Not Found" })
        }


        if (!vendorexists.isOpen) {
            return res.status(503).json({ message: "Vendor Closed" })
        }
        //total price check 
        let calculatedprice = 0;
        const productids = items.map(item => item.product._id)
        const productsfromdb = await Product.find({ _id: { $in: productids } })
        let itemsforDB = [];
        for (const item of items) {
            const productid = item.product._id.toString();
            const product = productsfromdb.find(p => p._id.toString() === productid);
            if (product) {
                calculatedprice += product.price * item.quantity;
                itemsforDB.push({
                    product: item.product,
                    quantity: item.quantity,
                    price: product.price * item.quantity
                })
            }
        }
        const orderidref = generateOrderReference();
        const withtaxprice = calculatedprice + allcharges
        //for delivery  charge , platform fee and discount

        //create razorpay order
        const options = {
            amount: Math.round(withtaxprice * 100),
            currency: 'INR',
            receipt: orderidref
        }
        // console.log(withtaxprice, calculatedprice, "This is the console", "and this is db items -", itemsforDB)
        const razorpayorder = await instance.orders.create(options);

        if (!razorpayorder) {
            return res.status(500).json({ message: "Error Creating Razorpay order" })
        }
        //make order 
        const neworder = new OrderModel({
            user: user,
            vendor: vendor,
            items: itemsforDB,
            status: "PENDING",
            orderid: orderidref,
            instructions: instructions,
            paymentStatus: "PENDING",
            razorpay_order_id: razorpayorder.id,
        })
        const savedorder = await neworder.save();
        res.status(201).json({
            success: true,
            message: "Order created, proceed to payment",
            razorpayorder: razorpayorder,
            orderId: savedorder.orderid,
            razorpayKeyId: process.env.RAZORPAY_ID
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

//update order by vendor

const updateorder = async (req, res) => {
    try {
        //check if it was really a vendor or customer
        const { role, user } = req.user;
        if (role !== "vendor") return res.status(401).json({ message: "Only vendor can modify order status" })

        const { OrderId } = req.params;
        const validvendor = user;
        const { status } = req.body;
        const updatefields = { status };

        if (status === "ACCEPTED") updatefields.acceptedAt = new Date();
        if (status === "PREPARING") updatefields.preparedAt = new Date();
        if (status === "OUT FOR DELIVERY") updatefields.outForDeliveryAt = new Date();
        if (status === "COMPLETED") updatefields.completedAt = new Date();
        if (status === "CANCELLED") updatefields.cancelledAt = new Date();

        if (!status || !OrderId) return res.status(400).json({ message: "Please provide OrderId and status (eg. PENDING, ACCEPTED, PREPARING, OUT FOR DELIVERY, COMPLETED, CANCELLED )" }) //(`Pending`, `Accepted`, `Preparing`, `Out for Delivery`, `Completed`, `Cancelled`)

        const vendorprofile = await Vendor.findOne({ user: validvendor })
        if (!vendorprofile) {
            return res.status(403).json({ message: "Don't Interfare with other orders" })
        }

        const updatedOrder = await OrderModel.findOneAndUpdate(
            {
                orderid: OrderId,
                vendor: vendorprofile._id
            },
            updatefields,
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order Not Found !!" })
        }
        return res.status(200).json({ message: "Status Updated Successfully", updatedOrder })
    } catch (err) {
        return res.status(500).json({ message: "Server Error" })
    }
}

//Order history for client and vendor

const orderHistory = async (req, res) => {
    try {
        const { user, role } = req.user;
        let orders;
        if (role === "customer") {
            orders = await OrderModel.find({ user: user, status: { $in: ['COMPLETED', 'CANCELLED'] } }).populate('vendor', 'name imageUrl').populate('items.product', 'name price')
        }
        else if (role === "vendor") {
            const vendorprofile = await Vendor.findOne({ user: user })
            if (!vendorprofile) return res.status(404).json({ message: "Vendor Not Found" })
            orders = await OrderModel.find({ vendor: vendorprofile._id, status: { $in: ['COMPLETED', 'CANCELLED'] } }).populate('user', 'name email').sort({ createdAt: -1 })
        }

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No Orders Found" })
        }
        return res.status(200).json({ message: "Order History Fetched", orders })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

const getcurrentorders = async (req, res) => {
    try {
        const { user, role } = req.user;
        if (!user || !role) {
            return res.status(400).json({ message: "Unable to get role and userid, please log in" })
        }
        let currentorders;

        if (role === 'customer') {
            currentorders = await OrderModel.find({ user: user, status: { $nin: ['COMPLETED', 'CANCELLED'] } }).populate('items.product', 'name price imageUrl').populate('vendor', 'name imageUrl').sort({ createdAt: -1 })
        }
        if (role === 'vendor') {
            const vendorprofile = await Vendor.findOne({ user: user })
            if (!vendorprofile) {
                return res.status(404).json({ message: "Vendor Not Found" })
            }
            const neworders = await OrderModel.find({ vendor: vendorprofile._id, paymentStatus: 'PAID', status: 'PENDING' }).populate('user', 'name email').populate('items.product', 'name price imageUrl').sort({ createdAt: -1 })
            const ongoingorders = await OrderModel.find({ vendor: vendorprofile._id, paymentStatus: 'PAID', status: { $nin: ['PENDING', 'CANCELLED', 'COMPLETED'] } }).populate('user', 'name email').populate('items.product', 'name price imageUrl').sort({ createdAt: -1 })
            return res.status(200).json({ message: "Current orders and new orders fetched", ongoingorders, neworders })
        }
        if (!currentorders || currentorders.length === 0) {
            return res.status(404).json({ message: "No Orders found" })
        }
        res.status(200).json({ message: "Current Orders Fetched", orders: currentorders })
    }
    catch (err) {
        console.log("Error in getcurrentorders", err)
        return res.status(500).json({ message: "Error in Server" })
    }
}

const getsingleorder = async (req, res) => {
    try {
        const { role } = req.user;
        const { orderid } = req.params;
        if (!orderid) {
            res.status(400).json({ message: "Please give valid orderid" })
        }
        if (role === 'customer') {
            const find = await OrderModel.findOne({ orderid: orderid }).populate('vendor', 'imageUrl name').populate('items.product', 'name price imageUrl').populate('user', 'name email')
            return res.status(200).json({ message: "Fetch successfull", order: find })
        }
        else {
            return res.status(404).json({ message: "Only customer can see detailed status" })
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error" })
    }
}

const cashorder = async (req, res) => {
    try {
        const { user } = req.user;
        const { vendor, items, instructions } = req.body;

        const vendorfound = await Vendor.findOne({ _id: vendor })
        if (!vendorfound) {
            return res.status(404).json({ message: "Sorry We can't find vendor" })
        }
        if (!vendorfound.isOpen) {
            return res.status(503).json({ message: "Sorry the vendor is closed" })
        }

        const productids = items.map(item => item.product._id)
        const dbproducts = await Product.find({ _id: { $in: productids } })
        let itemsarray = [];
        let calculatedprice = 0;
        for (const item of items) {
            const productid = item.product._id.toString();
            const product = dbproducts.find(p => p._id.toString() === productid)
            if (product) {
                calculatedprice += product.price * item.quantity;
                itemsarray.push({
                    product: item.product,
                    quantity: item.quantity,
                    price: product.price * item.quantity
                })
            }
        }

        const orderid = generateOrderReference();
        const withtaxprice = calculatedprice + allcharges

        const neworder = new OrderModel({
            user: user,
            vendor: vendor,
            items: itemsarray,
            status: "PENDING",
            paymentStatus: "CASH",
            orderid: orderid,
            instructions: instructions
        })
        const savedorder = await neworder.save();

        res.status(201).json({
            success: true,
            message: "Order Created",
            orderstatus: "PENDING",
            orderId: savedorder.orderid
        })
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error" })
    }
}

const payonline = async (req, res) => {
    try {
        const { user } = req.user;
        const { orderid } = req.params;
        if (!orderid) {
            return res.status(404).json({ message: "Please give orderid" })
        }
        if (!user) {
            return res.status(401).json({ message: "Please Log in first" })
        }
        const order = await OrderModel.findOne({ orderid: orderid, user: user })
        if (!order) {
            return res.status(404).json({ message: "Order Not Found" })
        }
        if (order.paymentStatus === "PAID") {
            return res.status(400).json({ message: "Order Aleady Paid" })
        }
        const withtaxprice = order.grandtotal + allcharges;


        const options = {
            amount: Math.round(withtaxprice * 100),
            currency: 'INR',
            receipt: order.orderid
        }

        const razorpayorder = await instance.orders.create(options);

        if (!razorpayorder) {
            console.log(razorpayorder)
            return res.status(500).json({ message: "Error Creating order on Razorpay" })
        }

        order.razorpay_order_id = razorpayorder.id;
        order.paymentStatus = "PENDING"
        const savedorder = await order.save();

        res.status(200).json({
            success: true,
            message: "Order Created, Now go and pay",
            razorpayorder: razorpayorder,
            orderId: savedorder.orderid,
            razorpayKeyId: process.env.RAZORPAY_ID
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

const cancelorder = async (req, res) => {
    try {
        const { user } = req.user;
        const { orderid } = req.params;
        const cancelableorders = ["PENDING", "ACCEPTED"]

        if (!mongoose.Types.ObjectId.isValid(orderid)) {
            return res.status(400).json({ message: "Invalid Order ID" });
        }
        if (!user) {
            return res.status(401).json({ message: "Please Log in first" })
        }
        if (!orderid) {
            return res.status(404).json({ message: "Please Provide Order id" })
        }
        const findorder = await OrderModel.findOne({ _id: orderid, user: user })

        if (!cancelableorders.includes(findorder.status)) {
            return res.status(400).json({ message: "Cannot Cancel the order because it is already on the way or preparing" })
        }

        if (!findorder) return res.status(404).json({ message: "Order not found or you are not authorized" })

        findorder.status = "CANCELLED";
        await findorder.save();
        return res.status(200).json({ message: `Order ${findorder.orderid} is Cancelled` })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}



export { placeOrder, updateorder, orderHistory, getcurrentorders, getsingleorder, cashorder, payonline, cancelorder };