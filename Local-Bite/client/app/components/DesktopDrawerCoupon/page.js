"use client";

import { useEffect } from "react";

/**
 * CouponDrawer
 *
 * Props:
 * - isOpen: boolean
 * - onClose: () => void
 * - coupons: Array<{
 *     _id?: string,
 *     code: string,
 *     description: string,
 *     discounttype: "percentage" | "flat" | "free delivery",
 *     discountvalue?: number,
 *     minimumordervalue?: number,
 *     maxdiscountvalue?: number,
 *   }>
 * - onApply: (id, code) => void
 */
export default function DesktopDrawerCoupon({ isOpen, onClose, coupons = [], onApply }) {
    // Disable background scroll when open
    useEffect(() => {
        if (!isOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => {
            if (e.key === "Escape") onClose?.();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    const handleApply = (coupon) => {
        onApply?.(coupon?._id, coupon?.code);
        onClose?.();
    };

    const renderMeta = (c) => {
        const type = (c?.discounttype || "").toLowerCase();
        const parts = [];

        if (type === "percentage") {
            if (c?.discountvalue != null) parts.push(`${c?.discountvalue}% off`);
            if (c?.maxdiscountvalue != null) parts.push(`Up to ₹${c?.maxdiscountvalue}`);
            if (c?.minimumordervalue != null) parts.push(`Min order ₹${c?.minimumordervalue}`);
        } else if (type === "flat") {
            if (c?.discountvalue != null) parts.push(`Flat ₹${c?.discountvalue} off`);
            if (c?.minimumordervalue != null) parts.push(`Min order ₹${c?.minimumordervalue}`);
        } else if (type === "free delivery") {
            parts.push("Free delivery");
            if (c?.minimumordervalue != null) parts.push(`Min order ₹${c?.minimumordervalue}`);
        }

        return parts;
    };

    return (
        <div
            className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
            aria-hidden={!isOpen}
        >
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                    }`}
            />

            {/* Drawer */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Available Coupons"
                className={`absolute right-0 top-0 h-full w-[360px] max-w-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Available Coupons</h2>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-700"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
                    {coupons?.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-sm text-gray-500">
                            No coupons available
                        </div>
                    ) : (
                        coupons?.map((c, idx) => {
                            const meta = renderMeta(c);
                            return (
                                <div
                                    key={c?._id || c?.code || idx}
                                    className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <div className="inline-block px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold tracking-wide border border-dashed border-emerald-300">
                                                {c?.code}
                                            </div>
                                            {meta?.length > 0 && (
                                                <div className="mt-2 text-sm font-medium text-gray-900">
                                                    {meta.join(" • ")}
                                                </div>
                                            )}
                                            {c?.description && (
                                                <p className="mt-1 text-sm text-gray-500 leading-snug">
                                                    {c?.description}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleApply(c)}
                                            className="shrink-0 text-sm font-semibold text-emerald-600 hover:text-white hover:bg-emerald-600 border border-emerald-600 rounded-lg px-3 py-1.5 transition-colors"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </aside>
        </div>
    );
}