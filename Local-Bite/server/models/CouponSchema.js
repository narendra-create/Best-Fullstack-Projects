import mongoose from "mongoose";
import { Schema } from "mongoose";

const couponschema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },

        discountType: {
            type: String,
            enum: ["percentage", "flat", "free_delivery"],
            required: true,
        },

        discountValue: {
            type: Number,
            default: 0, // not needed for free_delivery
        },

        maxDiscountAmount: Number,

        minOrderAmount: {
            type: Number,
            default: 0,
        },

        // Food delivery specific
        applicableRestaurants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Vendor",
            },
        ],
        // empty = all restaurants

        // user targeting
        userType: {
            type: String,
            enum: ["all", "new", "existing"],
            default: "all",
        },

        // usage control
        usageLimit: Number,
        usedCount: {
            type: Number,
            default: 0,
        },

        perUserLimit: {
            type: Number,
            default: 1,
        },

        usersUsed: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                usedAt: { type: Date, default: Date.now },
            },
        ],
        description: {
            type: String,
            required: true
        },

        // timing
        startDate: {
            type: Date,
            required: true,
        },

        expiryDate: {
            type: Date,
            required: true,
        },

        validDays: {
            type: [String], // ["Mon", "Tue"]
        },

        validTimeRange: {
            start: String, // "10:00"
            end: String,   // "14:00"
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Coupons = mongoose.models.Couponschema || mongoose.model("Coupons", couponschema);
export default Coupons;