import mongoose from "mongoose";
import { Schema } from "mongoose";

const CartItems = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product', // Reference to your 'Product' model
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1.'],
        default: 1,
    },
    price: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    vendor: {
        type: String,
        required: true
    }
});

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor',
        default: null
    },
    items: [CartItems],

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
    }

}, { timestamps: true });

CartSchema.pre('save', function (next) {
    let total = 0;
    const deliverycharge = 40;
    const discount = 20;
    const platformfee = 2.4;
    // Calculate the total by iterating over the items
    if (this.items.length > 0) {
        total = this.items
            .map((item) => item.price * item.quantity)
            .reduce((acc, current) => acc + current, 0);
    }

    // If the cart is now empty, reset the vendor
    if (this.items.length === 0) {
        this.vendor = null;
    }

    const grandtotal = deliverycharge + discount + platformfee + total;

    this.deliverycharge = deliverycharge;
    this.platformfee = platformfee;
    this.discount = discount;
    this.subTotal = total;
    this.grandtotal = grandtotal;
    next();
})


const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;