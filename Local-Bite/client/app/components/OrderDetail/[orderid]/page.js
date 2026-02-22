"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import Detailordercard from '@/app/Cards/OrderDetailcard/page';
import submitreview from '@/app/Utility/ReviewPoster';

const Order = ({ params }) => {
    const { orderid } = React.use(params);
    const [Order, setOrder] = useState()

    const loadorder = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/order/currentsingle/${orderid}`, { credentials: "include" })
        if (!res.ok) {
            throw new Error("Maybe there is an error with api")
        }
        const { order } = await res.json();
        setOrder(order)
    }

    useEffect(() => {
        loadorder()
    }, [])

    useEffect(() => {
        console.log(Order)
    }, [Order])

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

    const ordertime = Order?.status === "CANCELLED" ? formatTime(Order?.cancelledAt) : formatTime(Order?.completedAt)

    const toggleTag = (tag) => {
        setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    };

    return (
        <div>
            <Detailordercard order={Order} ordertime={ordertime} />
            <footer className='bottom-0 bg-white flex flex-col items-center pb-6 pt-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-t-2 sticky mt-6'>
                <p className="text-md text-center font-semibold text-gray-600 uppercase tracking-wider">Rate your meal</p>
                <div className="flex gap-2 mt-5">
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
                {
                    isModalOpen && (
                        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-in fade-in duration-300">
                            <div className="relative bg-white w-full max-w-md rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300">
                                <div className='absolute right-5 top-5 text-lg font-bold'>
                                    <svg onClick={() => setIsModalOpen(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>
                                </div>
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
                                    onClick={() => submitreview(selectedRating, Order._id, tags, Review, Order.vendor)}
                                    className="w-full bg-black text-white font-bold py-4 rounded-xl mt-6 hover:bg-gray-800"
                                >
                                    Submit Review
                                </button>
                            </div>
                        </div>
                    )
                }
            </footer>
        </div>
    )
}

export default Order