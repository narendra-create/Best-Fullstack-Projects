import Product from "../models/ProductSchema.js";

const getProductbyVendor = async (req, res) => {
    try {
        const { vendorId } = req.params;
        const ven = await Product.find({ vendor: vendorId });
        res.json(ven);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
const getAllProducts = async (req, res) => {
    try {
        const ven = await Product.find({});
        res.json(ven);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
const AddProduct = async (req, res) => {
    try {
        const { name, description, price, imageUrl, vendorId } = req.body;
        if (!name || !description || !price || !imageUrl || !vendorId) {
            return res.status(400).json({ message: "Please provide all required fields." });
        }
        const newProduct = new Product({
            name: name,
            description: description,
            price: price,
            imageUrl: imageUrl,
            vendor: vendorId,
        })
        const savedProduct = await newProduct.save();
        res.status(201).json({message: "Product added successfully!"});
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export { getProductbyVendor, AddProduct, getAllProducts };