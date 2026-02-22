"use client"
import React from 'react'
import OrderCard from '@/app/Cards/ReviewCard/page'
import { useEffect, useState } from 'react'
import submitreview from '@/app/Utility/ReviewPoster'

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