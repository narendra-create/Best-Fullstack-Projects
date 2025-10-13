import Product from "../models/ProductSchema.js";
import UserModel from "../models/UserSchema.js";
import Vendor from "../models/VendorSchema.js";

const AddProduct = async (req, res) => {
    try {
        const { user, role } = req.user;
        if (role !== "vendor") {
            return res.status(403).json({ message: "Only Vendors Can add products" })
        }
        const { name, description, price, imageUrl } = req.body;
        if (!name || !description || !price) {
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
        res.status(500).json({ message: "Server Error" });
    }
}
const getAllProducts = async (req, res) => {
    try {
        const pro = await Product.find({});
        res.json({pro});
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export { getProductbyVendor, AddProduct, getAllProducts };