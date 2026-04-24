"use client";

import { useEffect } from "react";

export default function MobileCouponDrawer({
    isOpen,
    onClose,
    coupons = [],
    onApply,
}) {
    // lock scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            />

            {/* Bottom Sheet */}
            <div
                className={`fixed bottom-0 left-0 w-full z-50 bg-white rounded-t-2xl shadow-xl
        transition-transform duration-300
        ${isOpen ? "translate-y-0" : "translate-y-full"}`}
            >
                {/* Drag Indicator */}
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-2" />

                {/* Header */}
                <div className="flex items-center justify-between px-4 pb-2 border-b">
                    <h2 className="font-semibold text-lg">Available Coupons</h2>
                    <button onClick={onClose} className="text-xl">✕</button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3 overflow-y-auto h-[65vh]">
                    {coupons?.length === 0 && (
                        <p className="text-sm text-gray-500">No coupons available</p>
                    )}

                    {coupons.map((c) => (
                        <div
                            key={c?._id}
                            className="border rounded-xl p-3 flex justify-between items-start"
                        >
                            <div>
                                <h3 className="font-medium">{c?.code}</h3>
                                <p className="text-xs text-gray-500">{c?.description}</p>
                            </div>

                            <button
                                onClick={() => {
                                    onApply(c?._id, c?.code);
                                    onClose();
                                }}
                                className="text-green-600 text-sm font-semibold"
                            >
                                Apply
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}