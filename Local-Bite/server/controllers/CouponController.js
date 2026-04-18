import Coupons from "../models/couponschema";
import OrderModel from "../models/OrderSchema";
import Vendor from "../models/VendorSchema";

const applycoupon = async (req, res) => {
    try {
        const { coupon, totalamount, deliverycharge, vendor } = req.body;
        const { user, role } = req.user;

        if (!coupon || !totalamount || !deliverycharge || !vendor) {
            return res.status(400).json({ message: "Please provide coupon code and totalamount of order" })
        }
        if (!user || !role) {
            return res.status(401).json({ message: "Please Log in First" })
        }

        if (role !== "customer") {
            return res.status(403).json({ message: "Only customers can use coupons" });
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
        if (!couponfound.isActive) {
            return res.status(409).json({ message: "Sorry Coupon is not active right now" })
        }
        if (new Date() > couponfound.expiryDate) {
            return res.status(410).json({ message: "Coupon expired" })
        }

        //coupon expiry and user check
        if (couponfound.usageLimit <= couponfound.usedCount) {
            return res.status(409).json({ message: "Coupon usage limit reached" })
        }
        const usercount = couponfound.usersUsed.filter(entry =>
            entry.userId.equals(user)
        ).length;

        if (couponfound.perUserLimit <= usercount) {
            return res.status(403).json({ message: "Limit reached for this coupon" })
        }

        //checking minimum order value
        if (totalamount < couponfound.minOrderAmount) {
            return res.status(400).json({
                message: `Minimum order value should be ₹${couponfound.minOrderAmount}`
            });
        }

        //checking days
        const today = new Date().toLocaleString("en-US", { weekday: "short" });
        if (couponfound.validDays?.length > 0 && !couponfound.validDays?.includes(today)) {
            return res.status(409).json({ message: `Coupon not available today only these days - ${couponfound.validDays}` })
        }
        const now = new Date();
        const currenttime = now.toTimeString().slice(0, 5);
        if (currenttime > couponfound.validTimeRange?.end || currenttime < couponfound.validTimeRange?.start) {
            return res.status(409).json({ message: "Coupon not valid at this time" })
        }

        //check if the restaurent or vendor is applicable
        const vendorfound = await Vendor.findById(vendor)
        if (!vendorfound) return res.status(404).json({ message: "Vendor not found" });

        const checkvendor = couponfound.applicableRestaurants.some(id =>
            id.equals(vendorfound._id)
        );

        if (!checkvendor) {
            return res.status(400).json({ message: "Not applicable on this vendor" });
        }

        const isuserexisting = await OrderModel.findOne({ user: user })
        if (isuserexisting && couponfound.userType === "new") {
            return res.status(403).json({ message: "This coupon is only valid for new Users" })
        }

        //Calculating discount by type
        const discountCalculator = {
            percentage: (total, coupon) => {
                let d = (total * coupon.discountValue) / 100;
                return coupon.maxDiscountAmount ? Math.min(d, coupon.maxDiscountAmount) : d;
            },
            flat: (_, coupon) => { return coupon.discountValue },
            free_delivery: (_, __, deliverycharge) => {
                return deliverycharge;
            }
        }
        //final number of discount
        const discount = discountCalculator[couponfound.discountType](
            totalamount,
            couponfound,
            deliverycharge
        );
        const finalPrice = Math.max(0, totalamount - discount);
        return res.status(200).json({ message: "Successfully discounted", discountedprice: finalPrice })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" })
    }
}

const addcoupon = async (req, res) => {
    try {
        const { user, role } = req.user;
        const { code,
            discountType,
            discountValue,
            maxDiscountAmount,
            minOrderAmount,
            applicableRestaurants,
            userType,
            usageLimit,
            perUserLimit,
            startDate,
            expiryDate,
            validDays,
            validTimeRange } = req.body;


        if (!code ||
            !discountType ||
            !userType ||
            perUserLimit <= 0 ||
            !startDate ||
            !expiryDate) {
            return res.status(400).json({ message: "Please fill all the required details" })
        }
        if (!user || !role) {
            return res.status(401).json({ message: "Please Log in first" })
        }

        //role check
        if (role === "customer") {
            return res.status(403).json({ message: "Customers cannot do this operation" })
        }
        //for future after making new user type - ADMIN
        // else if (role === "admin") {
        // const cleancoupon = coupon.trim().toUpperCase();

        // }
        else if (role === "vendor") {
            const cleancoupon = coupon.trim().toUpperCase();
            const vendorfound = await Vendor.findOne({ user: user })
            if (!vendorfound) {
                return res.status(404).json({ message: "Vendor Not found" })
            }
            if (!cleancoupon) {
                return res.status(400).json({ message: "Invalid Coupon" })
            }
            const couponfound = await Coupon.findOne({ code: cleancoupon })
            if (couponfound) {
                return res.status(409).json({ message: "Coupon Already Exists" })
            }

            if (discountType === "percentage") {
                if (discountValue <= 0 || discountValue > 100) {
                    return res.status(400).json({ message: "Invalid percentage value" });
                }
            }

            if (discountType === "flat") {
                if (discountValue <= 0) {
                    return res.status(400).json({ message: "Invalid flat discount" });
                }
            }

            if (discountType === "free_delivery") {
                discountValue = 0;
            }

            if (maxDiscountAmount && discountType !== "percentage") {
                return res.status(400).json({
                    message: "Max discount only applies to percentage coupons"
                });
            }

            if (minOrderAmount < 0) {
                return res.status(400).json({ message: "Invalid minimum order amount" });
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" })
    }
}

export { applycoupon }