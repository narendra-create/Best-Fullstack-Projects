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
    subTotal: {
        type: Number,
        default: 0
    },
    deliverycharge: {
        type: Number,
        default: 40
    },
    platformfee: {
        type: Number,
        default: 2
    },
    discount: {
        type: Number,
        default: 0
    },
    grandtotal: {
        type: Number,
        default: 0
    },
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

Order.pre('save', function (next) {
    let total = 0;
    const delivery = 40;
    const platform = 2.4;
    const discount = 20;

    if (this.items.length > 0) {
        total = this.items.map((item) => item.price).reduce((acc, current) => acc + current, 0);
    }
    const grandtotal = total + delivery + platform - discount;

    this.deliverycharge = delivery;
    this.platformfee = platform;
    this.discount = discount;
    this.subTotal = total;
    this.grandtotal = Math.round(grandtotal)
    next();
})

const OrderModel = mongoose.models.Order || mongoose.model("Order", Order);
export default OrderModel;