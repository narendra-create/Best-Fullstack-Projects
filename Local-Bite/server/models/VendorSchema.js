import mongoose from "mongoose";
import { Schema } from "mongoose";

const vendorSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    isOpen: { type: Boolean, default: true },
    type: {
        type: String, required: true, enum: {
            values: ["veg", "non-veg", "veg/non-veg"],
            message: 'Type must be either veg, non-veg or veg/non-veg'
        }
    },
    averagerating: { type: Number, min: 1, max: 5 },
    totalratings: { type: Number }
})

const Vendor = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);
export default Vendor;