"use client";
import { useState } from "react";

export default function AddCouponForm() {
    const [form, setForm] = useState({
        code: "",
        discountType: "percentage",
        discountValue: "",
        maxDiscountAmount: "",
        minOrderAmount: "",
        userType: "all",
        usageLimit: "",
        perUserLimit: 1,
        startDate: "",
        expiryDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.code ||
            !form.discountType ||
            !form.userType ||
            !form.perUserLimit ||
            !form.startDate ||
            !form.expiryDate
        ) {
            alert("Fill required fields");
            return;
        }

        try {
            const res = await fetch("/api/coupons/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            alert(data.message);
        } catch (err) {
            console.error(err);
            alert("Error creating coupon");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl md:mt-[12%] shadow-md max-w-3xl mx-auto"
        >
            <h2 className="text-xl font-semibold mb-4">Create Coupon</h2>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Code */}
                <input
                    name="code"
                    placeholder="Coupon Code"
                    value={form.code}
                    onChange={handleChange}
                    className="border uppercase p-2 rounded-lg"
                />

                {/* Discount Type */}
                <select
                    name="discountType"
                    value={form.discountType}
                    onChange={handleChange}
                    className="border p-2 rounded-lg"
                >
                    <option value="percentage">Percentage</option>
                    <option value="flat">Flat</option>
                    <option value="free_delivery">Free Delivery</option>
                </select>

                {/* Discount Value */}
                {form.discountType !== "free_delivery" && (
                    <input
                        name="discountValue"
                        type="number"
                        placeholder="Discount Value"
                        value={form.discountValue}
                        onChange={handleChange}
                        className="border p-2 rounded-lg"
                    />
                )}

                {/* Max Discount */}
                {form.discountType === "percentage" && (
                    <input
                        name="maxDiscountAmount"
                        type="number"
                        placeholder="Max Discount Amount"
                        value={form.maxDiscountAmount}
                        onChange={handleChange}
                        className="border p-2 rounded-lg"
                    />
                )}

                {/* Min Order */}
                <input
                    name="minOrderAmount"
                    type="number"
                    placeholder="Min Order Amount"
                    value={form.minOrderAmount}
                    onChange={handleChange}
                    className="border p-2 rounded-lg"
                />

                {/* User Type */}
                <select
                    name="userType"
                    value={form.userType}
                    onChange={handleChange}
                    className="border p-2 rounded-lg"
                >
                    <option value="all">All Users</option>
                    <option value="new">New Users</option>
                    <option value="existing">Existing Users</option>
                </select>

                {/* Usage Limit */}
                <input
                    name="usageLimit"
                    type="number"
                    placeholder="Total Usage Limit"
                    value={form.usageLimit}
                    onChange={handleChange}
                    className="border p-2 rounded-lg"
                />

                {/* Per User Limit */}
                <input
                    name="perUserLimit"
                    type="number"
                    placeholder="Per User Limit"
                    value={form.perUserLimit}
                    onChange={handleChange}
                    className="border p-2 rounded-lg"
                />

                {/* Dates */}
                <input
                    name="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={handleChange}
                    className="border p-2 rounded-lg"
                />

                <input
                    name="expiryDate"
                    type="date"
                    value={form.expiryDate}
                    onChange={handleChange}
                    className="border p-2 rounded-lg"
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
                Create Coupon
            </button>
        </form>
    );
}