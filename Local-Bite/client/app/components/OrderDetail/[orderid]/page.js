"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import Detailordercard from '@/app/Cards/OrderDetailcard/page';
import submitreview from '@/app/Utility/ReviewPoster';
import ReviewChecker from '@/app/Utility/ReviewChecker';

const Order = ({ params }) => {
    const { orderid } = React.use(params);
    const [Order, setOrder] = useState();
    const [review, setreview] = useState();
    const [Loading, setLoading] = useState(true);
    //review states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [Review, setReview] = useState("")
    const [tags, setTags] = useState([]);

    const loadorder = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/order/currentsingle/${orderid}`, { credentials: "include" })
        if (!res.ok) {
            throw new Error("Maybe there is an error with api")
        }
        const { order } = await res.json();
        setOrder(order)
    }

    const checkrating = async () => {
        const n = await ReviewChecker(Order?._id);
        setreview(n);
        setSelectedRating(n?.stars || 0);
        setLoading(false);
    }

    useEffect(() => {
        loadorder()
    }, [])

    useEffect(() => {
        if (Order?._id) {
            checkrating();
        }
        console.log(Order)
    }, [Order])

    // useEffect(() => {
    //     console.log(selectedRating, review)
    // }, [selectedRating])


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

    if (Loading) {
        return <div role="status" className='flex items-center justify-center w-40 mx-auto h-screen'>
            <svg aria-hidden="true" className="inline w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }

    return (
        <div>
            <Detailordercard order={Order} ordertime={ordertime} />
            <footer className='bottom-0 bg-white flex flex-col items-center pb-6 pt-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-t-2 sticky mt-6'>
                <p className="text-md md:text-xl text-center font-semibold text-gray-600 uppercase tracking-wider">{review?.rated ? "Thank You for your Review" : "Rate your meal"}</p>
                {review?.rated === false ?
                    <div className="flex gap-2 mt-5 md:mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className="w-7 h-7 md:w-8 md:h-8 hover:fill-amber-300 cursor-pointer transition-all active:scale-125"
                                fill={star <= selectedRating ? "#FBBF24" : "none"}
                                color={star <= selectedRating ? "#FBBF24" : "#D1D5DB"}
                                onClick={() => openRatingModal(star)}
                            />
                        ))}
                    </div> : <div className="flex gap-2 mt-5 md:mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className="w-7 h-7 md:w-8 md:h-8 transition-all active:scale-125"
                                fill={star <= selectedRating ? "#FBBF24" : "none"}
                                color={star <= selectedRating ? "#FBBF24" : "#D1D5DB"}
                                onClick={() => { alert("You Have Already Rated This Order") }}
                            />
                        ))}
                    </div>}
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