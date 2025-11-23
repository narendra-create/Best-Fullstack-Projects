import Vendor from "../models/VendorSchema.js";
import OrderModel from "../models/OrderSchema.js";
import mongoose from "mongoose";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
            res.status(201).json({ vendor });
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
        const { name, category, imageUrl, type } = req.body;
        if (!name || !category || !type) {
            throw new Error("Missing Required fields: name, category, type");
        }
        const currentName = await Vendor.findOne({ name: name })
        if (!currentName) {
            const newVendor = new Vendor({
                name: name,
                category: category,
                imageUrl: imageUrl,
                isOpen: true,
                type: type
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

const getVendorByUserid = async (req, res) => {
    try {
        const { user, role } = req.user;
        if (role !== 'vendor') return res.status(401).json({ message: "User does not have vendor account" })
        const vendor = await Vendor.findOne({ user: user })
        console.log(vendor)
        return res.status(200).json({ vendor })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: `Server error` })
    }
}

const VendorAnalytics = async (req, res) => {
    try {
        const { user, role } = req.user;
        if (role === 'customer') {
            return res.status(401).json({ message: "Only vendors can view analytics" })
        }

        const isvendorfound = await Vendor.findOne({ user: user })
        if (!isvendorfound) {
            return res.status(404).json({ message: "Vendor not found" })
        }

        //starting the operation 
        const report = await OrderModel.aggregate([
            {
                $match: { vendor: isvendorfound._id }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    Total_Orders: { $sum: 1 },
                    totalrevenue: { $sum: "$grandtotal" },
                    Avg_Value: { $avg: "$grandtotal" }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);


        if (!report) {
            res.status(400).json({ message: "Error in aggregate" })
        }

        const formatted = report.map((item) => ({
            month: MONTHS[item._id.month - 1],
            year: item._id.year,
            Total_Orders: item.Total_Orders,
            totalrevenue: item.totalrevenue,
            Avg_Value: Math.round(item.Avg_Value)
        }))

        return res.status(200).json({ success: true, data: formatted })
    }
    catch (err) {
        console.log("this is error in analytics ", err)
        return res.status(500).json({ message: "Server error in analytics controller" })
    }
}


export { getAllVendors, getVendorbyId, AddVendor, getVendorByUserid, VendorAnalytics };