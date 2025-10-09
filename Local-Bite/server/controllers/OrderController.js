import OrderModel from "../models/OrderSchema.js";
import { nanoid } from "nanoid";
import Vendor from "../models/VendorSchema.js";
import Product from "../models/ProductSchema.js";


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
        const { vendor, items } = req.body;

        if (!vendor || !items || items.length === 0) return res.status(400).json({ message: "Missing required fields !" })
        //check if product exists and amount available in future 

        const vendorexists = await Vendor.findOne({ _id: vendor })
        if (!vendorexists) {
            return res.status(404).json({ message: "Vendor Not Found" })
        }
        //total price check 
        let calculatedprice = 0;
        const productids = items.map(item => item.product)
        const productsfromdb = await Product.find({ _id: { $in: productids } })
        let itemsforDB = [];
        for (const item of items) {
            const product = productsfromdb.find(p => p._id.toString() === item.product)
            if (product) {
                calculatedprice += product.price * item.quantity;
                itemsforDB.push({
                    product: item.product,
                    quantity: item.quantity,
                    price: product.price
                })
            }
        }
        const orderidref = generateOrderReference();

        //make order 
        const neworder = new OrderModel({
            user: user,
            vendor: vendor,
            items: itemsforDB,
            totalprice: calculatedprice,
            status: "PENDING",
            orderid: orderidref
        })
        const savedorder = await neworder.save();
        res.status(201).json({ message: "Order placed, status - PENDING", OrderId: orderidref })
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
}

//update order by vendor

const updateorder = async (req, res) => {
    try {
        //check if it was really a vendor or customer
        const { role } = req.user;
        if (role !== "vendor") return res.status(401).json({ message: "Only vendor can modify order status" })

        const { OrderId } = req.params;
        const validvendor = req.user.user;
        const { status } = req.body;

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
            { status: status },
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
            orders = await OrderModel.find({ user: user }).populate('vendor', 'name imageUrl').populate('items.product', 'name price')
        }
        else if (role === "vendor") {
            const vendorprofile = await Vendor.findOne({ user: user })
            if (!vendorprofile) return res.status(404).json({ message: "Vendor Not Found" })
            orders = await OrderModel.find({ vendor: vendorprofile._id }).populate('user', 'name email').sort({ createdAt: -1 })
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

export { placeOrder, updateorder, orderHistory };