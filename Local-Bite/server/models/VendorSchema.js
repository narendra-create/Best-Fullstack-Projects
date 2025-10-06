import mongoose from "mongoose";
import { Schema } from "mongoose";

const vendorSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    isOpen: { type: Boolean, default: true },
})

const Vendor = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);
export default Vendor;