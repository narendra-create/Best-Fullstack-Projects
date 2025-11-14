import Product from "../models/ProductSchema.js";
import Vendor from "../models/VendorSchema.js";
import Cart from "../models/CartSchema.js";


const getCart = async (req, res) => {
    try {
        const { user } = req.user;
        const cart = await Cart.findOne({ user: user }).populate('items.product', 'name imageUrl')
        if (!cart) {
            return res.status(401).json({ message: "Your Cart is Empty" })
        }
        return res.status(200).json({ message: "Cart Fetched", data: cart })
    }
    catch (err) {
        res.status(500).json({ message: "Server Error At Cart" })
    }
}

const Additems = async (req, res) => {
    try {
        const { user } = req.user;
        const { productid, quantity } = req.body;
        const product = await Product.findById(productid);

        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        };
        if (product.stock === false) {
            return res.status(404).json({ message: "Product is sold out" })
        }
        const cart = await Cart.findOne({ user: user });
        //cart items
        const newitems = {
            product: product._id,
            quantity: quantity || 1,
            price: product.price,
            name: product.name,
        };

        if (!cart) {
            //create new cart
            const newcart = await Cart.create({
                user: user,
                items: [newitems],
                vendor: product.vendor
            });
            return res.status(201).json({ message: "Cart Created", data: newcart });
        }
        if (cart.vendor && cart.vendor.toString() !== product.vendor.toString()) {
            return res.status(400).json({ message: "Cannot add item from a different vendor. Clear cart first." })
        }
        if (cart.items.length === 0) {
            cart.vendor = product.vendor;
        }
        //find index of existing item
        const existingitemIndex = cart.items.findIndex((item) => item.product.toString() === productid);
        if (existingitemIndex > -1) {
            cart.items[existingitemIndex].quantity += quantity || 1;
        } else {
            cart.items.push(newitems);
        }
        const updatedcart = await cart.save();
        return res.status(200).json({ message: "Item Added to Cart", data: updatedcart })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error At Cart" })
    }
}

const Deleteitems = async (req, res) => {
    const { productid } = req.params;
    const { user } = req.user;
    try {
        const cart = await Cart.findOne({ user: user });
        if (!cart) {
            return res.status(401).json({ message: "Cart Not Found" })
        }
        //update the cart.item then push the new cart.item into cart - leave only items that does't match with productid
        cart.items = cart.items.filter((item) => item.product.toString() !== productid);
        const updatedcart = await cart.save();

        await updatedcart.populate('items.product', 'name imageUrl')

        return res.status(200).json({ message: "Item removed", data: updatedcart })
    }
    catch (err) {
        res.status(500).json({ message: "Server Error At Cart" })
    }
}

const Clearcart = async (req, res) => {
    const { user } = req.user;
    try {
        const cart = await Cart.findOne({ user: user })
        if (!cart) {
            return res.status(401).json({ message: "Cart Not Found" });
        }
        cart.items = [];
        const updatedcart = await cart.save();
        return res.status(200).json({ message: "Cart Cleared", data: updatedcart })
    }
    catch (err) {
        res.status(500).json({ message: "Server Error At Cart" })
    }
}

const updatequantity = async (req, res) => {
    try {
        const { user } = req.user;
        const { productid, operation } = req.body;
        const cart = await Cart.findOne({ user: user })

        if (!cart) {
            return res.status(404).json({ message: "Cart Not found" })
        }

        const itemindex = cart.items.findIndex((item) => item.product.toString() === productid);

        if (itemindex === -1) {
            return res.status(404).json({ message: "Item Not found in Cart" })
        }
        const item = cart.items[itemindex];

        if (operation === 'increase') {
            item.quantity += 1

        } else if (operation === 'decrease') {

            if (item.quantity > 1) {
                item.quantity -= 1;
            }
            else {
                cart.items.pull(item._id);
            }

        } else {
            return res.status(400).json({ message: "Invalid operation , must be 'increase' or 'decrease'" })
        }

        const updatedcart = await cart.save();

        await updatedcart.populate('items.product', 'name imageUrl')
        return res.status(200).json({ message: "Quantity Updated", data: updatedcart })
    } catch (err) {
        return res.status(500).json({ message: "Server Error At Cart" })
    }
}
//total amount counter for guest
const getsubtotal = async (req, res) => {
    try {
        const { items } = req.body;
        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ message: "Invalid items data" })
        }
        let subtotal = 0;
        const populateditems = [];

        for (const item of items) {
            const product = await Product.findById(item.productid);
            if (product && product.stock) {
                const itemprice = product.price;
                const itemqty = item.quantity || 1;
                subtotal += itemprice * itemqty;
                populateditems.push({
                    cartid: item.cartid,
                    quantity: item.quantity,
                    name: product.name,
                    price: product.price,
                    product: {
                        _id: product._id,
                        imageUrl: product.imageUrl
                    }
                })
            }
        }
        const deliverycharge = 40;
        const platformfee = 2.4;
        const discount = 20;
        const grandtotal = subtotal + deliverycharge + platformfee + discount;
        return res.status(200).json({
            data: {
                items: populateditems,
                subTotal: subtotal,
                deliverycharge: deliverycharge,
                platformfee: platformfee,
                discount: discount,
                grandtotal: grandtotal
            }
        });
    }
    catch (err) {
        console.log("Error in Guestcart - getsubtotal")
        return res.status(500).json({ message: "Server Error" })
    }
}

export { getCart, Additems, Deleteitems, Clearcart, updatequantity, getsubtotal };