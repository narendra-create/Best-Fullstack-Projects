import mongoose from "mongoose";
import { Schema } from "mongoose";

const Rating = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    tags: { type: Array },
    review: { type: String },
    createdAt: { type: Date, default: Date.now }
})

Rating.index({ user: 1, order: 1, unique: true })
//user + order must be unique because only one review per order



const RatingModel = mongoose.models.Rating || mongoose.model("Rating", Rating);
export default RatingModel;