import { instance } from "../config/razorpay";
import crypto from 'crypto';

export const createorder = async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount) {
            return res.status(400).json({ success: false, message: "Amount is required" })
        }

        const options = {
            amount: Number(amount * 100),
            currency: 'INR',
            receipt: `receipt_order_${new Date().getTime()}`
        }

        const order = await instance.orders.create(options);

        if (!order) {
            return res.status(500).send('Error creating order')
        }

        res.status(200).json({ success: true, order })
    }
    catch (err) {
        console.log("Error creating order at payment controller", err)
        res.status(500).send("Server Error")
    }
}

export const verifypayment = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ success: false, message: 'Missing payment details' });
        }
        body = razorpay_order_id + '|' + razorpay_payment_id;

        const demosignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = demosignature === razorpay_signature;

        if (isAuthentic) {
            //this is where i store things in database
            res.status(200).json({ success: true, message: "Payment Successfull" })
        }
        else {
            res.status(400).json({ success: false, message: "Payment Verification Failed" })
        }
    }
    catch (err) {
        console.log("Error in verification of razorpay", err)
        return res.status(500).json({ message: "Server Error" })
    }
}