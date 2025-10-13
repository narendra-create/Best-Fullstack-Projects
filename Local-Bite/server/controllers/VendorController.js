import Vendor from "../models/VendorSchema.js";
import mongoose from "mongoose";



const getAllVendors = async (req, res) => {
    try {
        const ven = await Vendor.find({});
        res.status(200).json({ ven });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
const getVendorbyId = async (req, res) => {
    try {
        const venid = req.params.id;
        const vendor = await Vendor.findById(venid);
        if (vendor) {
            res.status(201).json({vendor});
        }
        else {
            res.status(404).json({ message: "Vendor Not Found" });
        }

    }
    catch (error) {
        res.status(500).json({ message: `Server Error` })
    }
}
const AddVendor = async (req, res) => {
    try {
        const { name, category, imageUrl } = req.body;
        if (!name || !category) {
            throw new Error("Missing Required fields: name, category");
        }
        const currentName = await Vendor.findOne({ name: name })
        if (!currentName) {
            const newVendor = new Vendor({
                name: name,
                category: category,
                imageUrl: imageUrl,
                isOpen: true,
            })
            await newVendor.save();
            return res.status(200).json({ message: "vendor added successfully" })
        }
        else {
            return res.status(400).json({ message: "Vendor already exists", vendor: currentName });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

export { getAllVendors, getVendorbyId, AddVendor };