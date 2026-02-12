"use client"
import React from 'react'
import OrderCard from '@/app/Cards/ReviewCard/page'
import { useEffect, useState } from 'react'

const OrderHistory = () => {
    //states and data
    const [Orders, setOrders] = useState()
    //functions
    const loadorders = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/order/history`, { credentials: "include" })
        if (!res.ok && res.status != 404) {
            alert("Unable to Load orders")
            throw new Error("Unable to Load orders")
        }
        else if (res.status === 404) {
            alert("No completed Orders Found")
        }
        const { orders } = await res.json();
        setOrders(orders)
        console.log(orders)
    }
    //selectedRating, tags, Review
    const submitreview = async (selectedRating, orderid, tags, Review, vendor) => {
        if (!vendor || !selectedRating || !orderid) {
            alert("Please fill Required fields before submitting")
            return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/review/submit`, {
            credentials: "include",
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                vendor: vendor,
                stars: selectedRating,
                review: Review,
                orderid: orderid,
                tags: tags
            })
        })

        if (!res.ok) {
            throw new Error("Error while fetching")
        }
        const { data } = await res.json();
        console.log(`Review Added - ${data?.rating}`)
        alert("Review Added")
    }

    //use effects
    useEffect(() => {
        loadorders();
    }, [])

    //main app
    return (
        <div>
            <h1 className='text-2xl rounded-2xl font-bold text-center mt-2 mx-1 pr-6 pb-5 text-white pt-6 bg-chili-red'>My Orders</h1>
            <div className='mt-2 md:mx-auto flex flex-col md:grid md:grid-cols-3 md:items-start md:justify-center md:mt-8 md:w-[70%]'>
                {Orders && Orders.map((order) => {
                    return <OrderCard key={order._id} order={order} submitreview={submitreview} />
                })}
            </div>
        </div>
    )
}

export default OrderHistory