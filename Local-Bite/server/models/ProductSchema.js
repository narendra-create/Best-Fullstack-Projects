import mongoose from "mongoose";
import { Schema } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    imageUrl: { type: String },
    vendor: { type: String },
})

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;