import Coupons from "../models/couponschema";
import OrderModel from "../models/OrderSchema";
import Vendor from "../models/VendorSchema";

const applycoupon = async (req, res) => {
    try {
        const { coupon, totalamount } = req.body;
        const { user, role } = req.user;

        if (!coupon | !totalamount) {
            return res.status(400).json({ message: "Please provide coupon code and totalamount of order" })
        }
        if (!user | !role) {
            return res.status(401).json({ message: "Please Log in First" })
        }

        //coupon check
        const cleancoupon = coupon.trim().toUpperCase();
        if (!cleancoupon) {
            return res.status(400).json({ message: "Invalid Coupon code" })
        }
        const couponfound = await Coupons.findOne({ code: cleancoupon })

        if (!couponfound) {
            return res.status(404).json({ message: "Coupon not found" })
        }
         
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" })
    }
}