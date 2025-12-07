import Product from "../models/ProductSchema.js";
import UserModel from "../models/UserSchema.js";
import Vendor from "../models/VendorSchema.js";

const AddProduct = async (req, res) => {
    try {
        const { user, role } = req.user;
        if (role !== "vendor") {
            return res.status(403).json({ message: "Only Vendors Can add products" })
        }
        const { name, description, price, imageUrl, quantity, type } = req.body;
        if (!name || !description || !price || !type || !quantity) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }
        const vendorprofile = await Vendor.findOne({ user: user });
        console.log(vendorprofile, user)
        if (!vendorprofile) {
            return res.status(404).json({ message: "Vendor Not Found" })
        }
        const newProduct = new Product({
            name: name,
            description: description,
            price: price,
            imageUrl: imageUrl,
            quantity: quantity,
            type: type,
            vendor: vendorprofile._id,
        })
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const getProductbyVendor = async (req, res) => {
    try {
        const { vendorId } = req.params;
        const pro = await Product.find({ vendor: vendorId });
        if (!pro) return res.status(404).json({ message: "Products not found" })
        res.json({ pro });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" });
    }
}
const getAllProducts = async (req, res) => {
    try {
        const pro = await Product.find({});
        res.json({ pro });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const getProductsbyUser = async (req, res) => {
    try {
        const { user } = req.user;
        const vendorfound = await Vendor.findOne({ user })
        if (!vendorfound) {
            return res.status(404).json({ message: "Vendor Not Found" })
        }
        const products = await Product.find({ vendor: vendorfound._id });
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "Your Product Catelog is Empty" })
        }
        return res.status(200).json({ products })
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error - Location Productcontroller" })
    }
}

const setstock = async (req, res) => {
    try {
        const { user, role } = req.user;
        const { isinstock, itemid } = req.body;
        if (role !== "vendor") {
            return res.status(401).json({ message: "Only Vendors Can do this" })
        }

        if (isinstock === undefined) {
            return res.status(400).json({ message: "Please provide isinstock as true or false" })
        }
        if (typeof isinstock !== Boolean) {
            return res.status(400).json({ message: "The isinstock should be boolean" })
        }
        const vendorfound = await Vendor.findOne({ user: user })
        if (!vendorfound) {
            return res.status(404).json({ message: "Vendor not found" })
        }
        const productfound = await Product.findOneAndUpdate({ vendor: vendorfound._id, _id: itemid }, { $set: { stock: isinstock } }, { new: true })
        return res.status(200).json({ message: "Update success" })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

const removeproduct = async (req, res) => {
    try {
        const { user, role } = req.user;
        const { itemid } = req.params;
        if (!itemid) {
            return res.status(400).json({ message: "Please provide item id in url" })
        }
        if (role !== "vendor") {
            return res.status(401).json({ message: "Only vendors can do this" })
        }
        const vendorfind = await Vendor.findOne({ user: user })
        if (!vendorfind) {
            return res.status(404).json({ message: "Vendor Not Found" })
        }
        const deleteproduct = await Product.findOneAndDelete({ vendor: vendorfind._id, _id: itemid })
        return res.status(200).json({ message: "Item Deleted" })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

export { getProductbyVendor, AddProduct, getAllProducts, getProductsbyUser };