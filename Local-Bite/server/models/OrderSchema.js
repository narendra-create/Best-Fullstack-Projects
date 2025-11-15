import mongoose from "mongoose";
import { Schema } from "mongoose";

const Order = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true }, //vendor
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }
    }], // quantity and price
    totalprice: { type: Number, required: true }, //total price of all items
    status: {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'PREPARING', 'OUT FOR DELIVERY', 'COMPLETED', 'CANCELLED'],//Accepted', 'Preparing', 'Out for Delivery', 'Completed', 'Cancelled
        default: 'PENDING'
    },
    paymentStatus: {
        type: String,
        enum: ['PENDING', 'PAID', 'FAILED'],
        default: 'PENDING',
    },
    razorpay_order_id: {
        type: String,
    },
    razorpay_payment_id: {
        type: String,
    },
    razorpay_signature: {
        type: String,
    },
    orderid: { type: String },
    instructions: {
        type: String
    },
    createdAt: { type: Date, default: Date.now }
})

const OrderModel = mongoose.models.Order || mongoose.model("Order", Order);
export default OrderModel;