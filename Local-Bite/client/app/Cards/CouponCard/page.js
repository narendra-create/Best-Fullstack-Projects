import { Calendar } from "lucide-react";

export default function CouponCard({ coupon }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border p-5 w-full max-w-lg hover:shadow-md transition">

            {/* Header */}
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg md:text-xl">{coupon?.code}</h3>

                <span className="text-xs md:text-sm font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {coupon?.discountType === "percentage" ? `+ ${coupon?.discountValue}% OFF` : `₹ ${coupon?.discountValue} OFF`}
                </span>
            </div>

            {/* Description */}
            <p className="text-sm h-14 text-gray-500 mb-4">
                {coupon?.description}
            </p>

            {/* Expiry */}
            <div className="flex items-center text-sm text-gray-400 mb-4">
                <Calendar size={16} className="mr-2" />
                Expires: {coupon?.expiryDate}
            </div>

            {/* Button */}
            <button className="w-full bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                + Add My Restaurant
            </button>
        </div>
    );
}