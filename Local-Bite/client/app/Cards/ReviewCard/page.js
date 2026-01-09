"use client"
import React, { useState } from 'react';
import { Star } from 'lucide-react';

const OrderCard = ({ order, submitreview }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [Review, setReview] = useState("")
    const [tags, setTags] = useState([]);

    const quickTags = ["Fast Delivery", "Hot Food", "Great Packaging", "Portion Size"];

    const openRatingModal = (rating) => {
        setSelectedRating(rating);
        setIsModalOpen(true);
    };

    console.log(Review, tags)

    const formatTime = (date) => {
        if (!date) return "—";
        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    };

    const toggleTag = (tag) => {
        setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };

    return (
        <div className="p-4 md:p-1 bg-gray-50 flex flex-col items-center">
            {/*The Outside View */}
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-4 border hover:scale-103 transition-all ease-in-out duration-175 hover:mx-4 border-gray-100">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">{order?.vendor.name} <span className='font-semibold'>{order.items.length === 1 && `- ${order?.items[0].product.name}`}</span></h3>
                        <p className="text-sm text-gray-500 font-medium">{order?.status} • {formatTime(order.completedAt)}</p>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">₹{order?.grandtotal}</span>
                </div>

                {order.items.length > 1 && (<div className="mt-4 pt-1 border-t">
                    <div className='pb-2 pl-1 border-b mb-1'>
                        {order?.items?.map((item) => {
                            return <div key={item.product.name}>{item.product.name} x {item.quantity}</div>
                        })}
                    </div>
                </div>
                )}
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Rate your meal</p>
                <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={28}
                            className="hover:fill-amber-300 cursor-pointer transition-all active:scale-125"
                            fill={star <= selectedRating ? "#FBBF24" : "none"}
                            color={star <= selectedRating ? "#FBBF24" : "#D1D5DB"}
                            onClick={() => openRatingModal(star)}
                        />
                    ))}
                </div>
            </div>

            {/*THE Bottom popup*/}
            {
                isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-in fade-in duration-300">
                        <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300">
                            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" onClick={() => setIsModalOpen(false)} />

                            <h2 className="text-xl font-bold text-center">How was your order?</h2>
                            <p className="text-gray-500 text-center text-sm mb-4">You gave it {selectedRating} stars!</p>

                            {/* Quick Tags */}
                            <div className="flex flex-wrap gap-2 justify-center mb-6">
                                {quickTags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={`px-4 py-2 rounded-full border text-sm transition-all ${tags.includes(tag) ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-300 text-gray-600'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>

                            <textarea
                                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                                placeholder="Tell us more (optional)..."
                                rows="3"
                                onChange={(e) => setReview(e.target.value)}
                            />

                            <button
                                onClick={() => submitreview(selectedRating, order._id, tags, Review, order.vendor)}
                                className="w-full bg-black text-white font-bold py-4 rounded-xl mt-6 hover:bg-gray-800"
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default OrderCard;