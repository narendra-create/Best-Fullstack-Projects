import crypto from 'crypto';
import OrderModel from '../models/OrderSchema.js'

const verifypayment = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature, db_order_id } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !db_order_id) {
            return res.status(400).json({ success: false, message: 'Missing payment details' });
        }
        const body = razorpay_order_id + '|' + razorpay_payment_id;

        const demosignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = demosignature === razorpay_signature;

        if (isAuthentic) {
            //this is where i store things in database
            const updatedorder = await OrderModel.findOneAndUpdate({ orderid: db_order_id },
                {
                    $set: {
                        paymentStatus: 'PAID',
                        status: 'ACCEPTED',
                        razorpay_payment_id: razorpay_payment_id,
                        razorpay_signature: razorpay_signature
                    }
                },
                { new: true }
            )

            if (!updatedorder) {
                return res.status(404).json({ success: false, message: "Order Not Found!" })
            }
            res.status(200).json({ success: true, message: "Payment Successfull", orderid: updatedorder.orderid })
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

export default verifypayment;