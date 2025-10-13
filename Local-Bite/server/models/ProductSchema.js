import mongoose from "mongoose";
import { Schema } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    imageUrl: { type: String },
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
    quantity: {
        type: String, required: true,
    },
    type: {
        type: String, required: true, enum: {
            values: ["veg", "non-veg"],
            message: 'Type must be either veg or non-veg'
        }
    }
})

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;