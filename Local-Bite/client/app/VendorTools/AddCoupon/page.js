"use client";
import { useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";

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
        const { name, value, type } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                type === "number"
                    ? value === ""
                        ? ""
                        : Number(value)
                    : value,
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

        if (form.discountType === "percentage") {
            if (!form.discountValue || !form.maxDiscountAmount) {
                alert("Enter discount and max discount");
                return;
            }
        }

        if (form.discountType === "flat") {
            if (!form.discountValue) {
                alert("Enter flat discount value");
                return;
            }
        }

        if (new Date(form.expiryDate) <= new Date(form.startDate)) {
            alert("Expiry must be after start date");
            return;
        }

        const formattedForm = {
            ...form,
            startDate: new Date(form.startDate).toISOString(),
            expiryDate: new Date(form.expiryDate).toISOString(),
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/coupon/addcoupon`, {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedForm),
            });
            const data = await res.json();

            if (!res.ok) {
                toast.error(`${data.message}`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide,
                });
                return;
            }
            toast.success('Added ✔️', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
            return;
        } catch (err) {
            console.error(err);
            toast.error(`Creation Failed`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl md:mt-[12%] shadow-md max-w-3xl mx-auto"
        >
            <ToastContainer position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide} />
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
                <label htmlFor="discountType">Discount Type</label>
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
                <label htmlFor="discountValue">Value</label>
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
                <label htmlFor="minOrderAmount">Minimum Order Amount</label>
                <input
                    name="minOrderAmount"
                    type="number"
                    placeholder="Min Order Amount"
                    value={form.minOrderAmount}
                    onChange={handleChange}
                    className="border p-2 rounded-lg"
                />

                {/* User Type */}
                <label htmlFor="userType">User Type</label>
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
                <label htmlFor="usageLimit">Usage Limit</label>
                <input
                    name="usageLimit"
                    type="number"
                    placeholder="Total Usage Limit"
                    value={form.usageLimit}
                    onChange={handleChange}
                    className="border p-2 rounded-lg"
                />

                {/* Per User Limit */}
                <label htmlFor="perUserLimit">Peruser Limit</label>
                <input
                    name="perUserLimit"
                    type="number"
                    placeholder="Per User Limit"
                    value={form.perUserLimit}
                    onChange={handleChange}
                    className="border p-2 rounded-lg"
                />

                {/* Dates */}
                <label htmlFor="startDate">Start Date</label>
                <input
                    name="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={handleChange}
                    className="border p-2 rounded-lg"
                />

                <label htmlFor="expiryDate">Expiry Date</label>
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