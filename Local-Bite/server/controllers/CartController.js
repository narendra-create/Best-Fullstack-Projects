import Product from "../models/ProductSchema";
import Vendor from "../models/VendorSchema";
import Cart from "../models/CartSchema";


const getCart = async (req, res) => {
    try {
        const { user } = req.user;
        const cart = await Cart.findOne({ user: user }).populate('item.product', 'name imageUrl')
        if (!cart) {
            res.status(401).json({ message: "Your Cart is Empty" })
        }
        res.status(200).json({ message: "Cart Fetched", data: cart })
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
            res.status(401).json({ message: "Product Not Found" });
        };
        const cart = await Cart.findOne({ user: user });
        //cart items
        const newitems = {
            product: product._id,
            quantity: quantity || 1,
            price: product.price,
            name: product.name
        };

        if (!cart) {
            //create new cart
            const newcart = await Cart.create({
                user: user,
                vendor: product.vendor,
                item: [newitems]
            });
            return res.status(201).json({ message: "Cart Created", data: newcart });
        }
        if (cart.vendor && cart.vendor.toString() !== product.vendor.toString()) {
            return res.status(400).json({ message: "Cannot add item from a different vendor. Clear cart first." })
        }
        if (cart.item.length === 0) {
            cart.vendor = product.vendor;
        }
        //find index of existing item
        const existingitemIndex = cart.item.findIndex((item) => item.product.toString() === productid);
        if (existingitemIndex > -1) {
            cart.item[existingitemIndex].quantity += quantity || 1;
        } else {
            cart.item.push(newitems);
        }
        const updatedcart = await cart.save();
        return res.status(200).json({ message: "Item Added to Cart", data: updatedcart })
    }
    catch (err) {
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
        cart.item = cart.item.filter((item) => item.product.toString() !== productid);
        const updatedcart = await cart.save();
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
        cart.item = [];
        const updatedcart = await cart.save();
        res.status(200).json({ message: "Cart Cleared", data: updatedcart })
    }
    catch (err) {
        res.status(500).json({ message: "Server Error At Cart" })
    }
}

export { getCart, Additems, Deleteitems, Clearcart };