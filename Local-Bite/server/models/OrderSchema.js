import mongoose from "mongoose";
import { Schema } from "mongoose";

const Order = new Schema({
    user: { type: ObjectId },//From User
    vendor: { type: ObjectId }, //vendor
    items: { type: Array }, // quantity and price
    totalprice: { type: Number }, //total price of all items
    status: { type: String }, //(`Pending`, `Accepted`, `Preparing`, `Out for Delivery`, `Completed`, `Cancelled`)
    createdAt: { type: Date }
})

const OrderModel = mongoose.models.Order || mongoose.model("Order", Order);
export default OrderModel;