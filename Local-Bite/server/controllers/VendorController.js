import Vendor from "../models/VendorSchema.js";
import OrderModel from "../models/OrderSchema.js";
import mongoose from "mongoose";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getAllVendors = async (req, res) => {
    try {
        const ven = await Vendor.find({ isOpen: true });
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

const NumberReport = async (req, res) => {
    try {
        const { user, role } = req.user;
        if (!role === 'vendor') {
            return res.status(401).json({ message: "Only vendors can view report" })
        }

        const isvendorfound = await Vendor.findOne({ user: user })
        if (!isvendorfound) {
            res.status(404).json({ message: "Vendor not found" })
        }

        const totalstats = await OrderModel.aggregate([
            {
                $match: {
                    vendor: isvendorfound._id,
                    status: { $ne: "CANCELLED" }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$grandtotal" },
                    totalSales: { $sum: 1 }
                }
            }
        ])

        const totalrevenue = totalstats[0]?.totalRevenue || 0;
        const totalsales = totalstats[0]?.totalSales || 0;

        const activeorders = await OrderModel.countDocuments({
            vendor: isvendorfound._id,
            status: {
                $in: ['PENDING', 'ACCEPTED', 'PREPARING', 'OUT FOR DELIVERY']
            }
        });

        const recentsales = await OrderModel.find({
            vendor: isvendorfound._id,
            status: "COMPLETED"
        }).populate("user", "name email")
            .sort({ createdAt: -1 })
            .limit(10).select("grandtotal user createdAt")

        res.status(200).json({
            success: true, data: {
                totalrevenue,
                totalsales,
                activeorders,
                recentsales
            }
        })
    }
    catch (err) {
        console.log("Error in vendorcontroller number report", err)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}


const shopstatus = async (req, res) => {
    try {
        const { user, role } = req.user;
        if (role !== 'vendor') {
            return res.status(401).json({ message: "Only vendors can access this function" })
        }
        const { isshopopen } = req.body;
        if (isshopopen === undefined) {
            return res.status(400).json({ message: "Please provide isshopopen, true or false" })
        }
        if (typeof isshopopen !== "boolean") {
            return res.status(400).json({ message: "Value of isshopopen should be boolean" })
        }
        const shopstatus = await Vendor.findOneAndUpdate({ user: user }, { isOpen: isshopopen }, { new: true })

        if (!shopstatus) {
            return res.status(404).json({ message: "Vendor Not Found" })
        }
        return res.status(200).json({ success: true, data: shopstatus.isOpen })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

const loadshopstatus = async (req, res) => {
    try {
        const { user, role } = req.user;
        if (role !== 'vendor') {
            return res.status(401).json({ message: "Only vendors can view status" })
        }
        const found = await Vendor.findOne({ user: user }).select("isOpen")
        if (!found) {
            return res.status(404).json({ message: "Vendor not found" })
        }

        return res.status(200).json({ success: true, data: found.isOpen })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

export { getAllVendors, getVendorbyId, AddVendor, getVendorByUserid, VendorAnalytics, NumberReport, shopstatus, loadshopstatus };