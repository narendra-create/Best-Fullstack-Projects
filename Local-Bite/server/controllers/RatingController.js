import RatingModel from "../models/RatingSchema.js";
import OrderModel from "../models/OrderSchema.js";
import Vendor from "../models/VendorSchema.js";
import Product from "../models/ProductSchema.js";

const submitreview = async (req, res) => {
    try {
        const { user } = req.user;
        const { vendor, stars, review, orderid, tags } = req.body;
        const findvendor = await Vendor.findById(vendor)
        if (!findvendor) {
            return res.status(404).json({ message: "Vendor Not Found" })
        }
        const findorder = await OrderModel.findOne({ _id: orderid, user: user })
        if (!findorder) {
            return res.status(404).json({ message: "Order not found or not yours" })
        }
        if (findorder.status !== "COMPLETED") {
            return res.status(400).json({ message: "Order is not Completed Yet !" })
        }
        const findrating = await RatingModel.findOne({ order: orderid, user: user })
        if (findrating) {
            return res.status(409).json({ message: "Already Rated" })
        }
        //now submitting a new review

        const rating = await RatingModel.create({
            user: user,
            vendor: vendor,
            order: orderid,
            rating: stars,
            review,
            tags: tags
        })

        const stats = await RatingModel.aggregate([
            { $match: { vendor: findvendor._id } },
            {
                $group: {
                    _id: "$vendor",
                    avg: { $avg: "$rating" },
                    count: { $sum: 1 }
                }
            }
        ])

        const avg = stats.length ? stats[0].avg : stars;
        const count = stats.length ? stats[0].count : 1;


        await Vendor.findByIdAndUpdate(vendor, {
            averagerating: avg,
            totalratings: count
        })

        return res.status(201).json({ message: "Review Added", rating })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Server Error" })
    }
}

const getratings = async (req, res) => {
    try {
        const { vendorid } = req.params;
        const findvendor = await Vendor.findById(vendorid)
        if (!findvendor) {
            return res.status(404).json({ message: "Vendor Not Found" })
        }
        const findratings = await RatingModel.find({ vendor: vendorid }).populate("user", "name").sort({ createdAt: -1 });

        const totalratings = findratings.length;

        return res.status(200).json({
            averagerating: findvendor.averagerating,
            totalratings,
            ratings: findratings
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

export { submitreview, getratings };