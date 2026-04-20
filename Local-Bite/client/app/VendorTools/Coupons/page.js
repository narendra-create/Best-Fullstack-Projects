"use client"
import CouponCard from "@/app/Cards/CouponCard/page";
import Link from "next/link";

export default function CouponsPage() {

    const coupons = [
        {
            id: 1,
            code: "Summer Special Discount",
            description: "Celebrate summer with exclusive discounts on all menu items.",
            discountValue: 25,
            discountType: "percentage",
            expiryDate: "Jul 31, 2026",
        },
        {
            id: 2,
            code: "New Customer Welcome",
            description: "Flat discount for first-time customers.",
            discountValue: 10,
            discountType: "flat",
            expiryDate: "Dec 31, 2026",
        },
        {
            id: 3,
            code: "Weekend Brunch Deal",
            description: "Special weekend offer to attract more customers.",
            discountValue: 15,
            discountType: "percentage",
            expiryDate: "Jun 30, 2026",
        },
        {
            id: 4,
            code: "Happy Hour Special",
            description: "Boost evening sales between 4 PM and 7 PM.",
            discountValue: 20,
            discountType: "percentage",
            expiryDate: "Aug 15, 2026",
        },
        {
            id: 5,
            code: "Loyalty Reward",
            description: "Reward returning customers with a small discount.",
            discountValue: 5,
            discountType: "flat",
            expiryDate: "May 1, 2026",
        },
        {
            id: 6,
            code: "Family Combo Saver",
            description: "Perfect savings for groups of 4 or more.",
            discountValue: 30,
            discountType: "percentage",
            expiryDate: "Sep 30, 2026",
        },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold">Coupons Management</h1>
                    <p className="text-sm md:text-lg text-gray-500">
                        Manage and add coupons to your restaurant
                    </p>
                </div>
                <Link
                    href="/VendorTools/AddCoupon"
                    className="bg-black z-80 text-white px-4 py-2 rounded-lg text-sm md:text-md hover:bg-gray-800 transition inline-block">
                    + Create New Coupon
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-360 mx-auto md:mt-14">
                {coupons.map((coupon) => (
                    <CouponCard
                        key={coupon.id}
                        coupon={coupon}
                    />
                ))}
            </div>

        </div>
    );
}