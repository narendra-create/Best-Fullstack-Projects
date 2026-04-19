"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CouponCard } from "@/app/Cards/CouponCard/page"

const mockCoupons = [
    {
        id: 1,
        title: "Summer Special Discount",
        description: "Get amazing savings on all summer menu items. Valid for dine-in and takeout orders.",
        discount: 25,
        discountType: "percentage",
        expiryDate: "2025-08-31",
    },
    {
        id: 2,
        title: "New Customer Welcome",
        description: "Special discount for first-time customers. One-time use only.",
        discount: 10,
        discountType: "fixed",
        expiryDate: "2025-12-31",
    },
    {
        id: 3,
        title: "Weekend Brunch Deal",
        description: "Enjoy our weekend brunch menu with exclusive savings every Saturday and Sunday.",
        discount: 15,
        discountType: "percentage",
        expiryDate: "2025-07-15",
    },
    {
        id: 4,
        title: "Holiday Season Offer",
        description: "Celebrate the holidays with special discounts on festive menu items.",
        discount: 20,
        discountType: "fixed",
        expiryDate: "2024-12-25",
    },
    {
        id: 5,
        title: "Loyalty Reward",
        description: "Thank you for being a loyal customer. Enjoy this exclusive discount on your next order.",
        discount: 30,
        discountType: "percentage",
        expiryDate: "2025-09-30",
    },
    {
        id: 6,
        title: "Flash Sale Friday",
        description: "Limited time offer available only on Fridays. Don't miss out on these savings!",
        discount: 40,
        discountType: "percentage",
        expiryDate: "2025-06-30",
    },
]

export default function CouponsManagement() {
    const handleAddRestaurant = (couponId) => {
        console.log("Adding restaurant to coupon:", couponId)
    }

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <header className="mb-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                                Coupons Management
                            </h1>
                            <p className="mt-1 text-muted-foreground">
                                Create and manage discount coupons for your restaurant
                            </p>
                        </div>
                        <Button className="w-full transition-all duration-200 hover:scale-[1.02] sm:w-auto">
                            <Plus className="size-4" />
                            Create New Coupon
                        </Button>
                    </div>
                </header>

                <main>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
                        {mockCoupons.map((coupon) => (
                            <CouponCard
                                key={coupon.id}
                                coupon={coupon}
                                onAddRestaurant={handleAddRestaurant}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}
