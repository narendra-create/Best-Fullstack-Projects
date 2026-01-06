"use client"
import React, { useState, useEffect } from 'react'
import Group from '@/app/Cards/CurrentOrder/Group'
import Link from 'next/link'
import Script from 'next/script'

const OrderStatus = () => {
    const [Loading, setLoading] = useState(true)
    const [Orders, setOrders] = useState([])

    const loadorders = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/order/current`, { credentials: 'include' })
            if (!res.ok) {
                console.log("Error fetching current orders")
            }
            const data = await res.json();
            console.log(data, data.orders)
            setOrders(data.orders);
            setLoading(false);
        }
        catch (err) {
            console.log("Fetching Error", err)
            setLoading(false)
            setOrders([])
        }
    }

    const paynow = async (order) => {
        try {
            if (!order || !order.vendor || !order.items || order.items.length === 0) {
                alert("Check items and vendor before Paying")
                return;
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/order/pay-online/${order.orderid}`, {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            if (!res.ok) {
                console.log(res.message, "amount - ", order?.amount)
                alert("Error while fetching Online pay")
            }
            const data = await res.json();
            const { razorpayorder, orderId, razorpayKeyId } = data;
            console.log(razorpayorder, "Order detail")

            const options = {
                key: razorpayKeyId,
                amount: razorpayorder.amount,
                currency: 'INR',
                name: "Local-Bite",
                description: 'Paying Online For food order',
                order_id: razorpayorder.id,

                handler: async function (response) {
                    try {
                        const verificationData = {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            db_order_id: orderId
                        }

                        const verifyres = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/payment/verify-payment`, {
                            credentials: 'include',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(verificationData)
                        })

                        if (!verifyres.ok) {
                            throw new Error("Payment Verification Failed")
                        }

                        const result = await verifyres.json();
                        if (result.success) {
                            setLoading(true)
                            window.location.href = `/Status/order-success/${result.orderid}`
                            loadorders();
                        }
                        else {
                            setLoading(true);
                            window.location.href = `/Status/order-failure`;
                            setTimeout(() => {
                                setLoading(false)
                            }, 1000);
                        }
                    }
                    catch (err) {
                        console.log("Error in handlecheckout", err)
                        alert("Payment verification failed")
                    }
                },
                prefill: {
                    email: order?.user?.email || ""
                },
                theme: {
                    color: "#F37254"
                }
            }
            const rzp = new window.Razorpay(options);
            rzp.open();
        }
        catch (error) {
            console.error("Order creation failed:", error.response?.data || error.message || error);
            // console.log(items, placeorderres.json, data)
            alert(`Error creating order. Please try again.`);
        }
    }

    useEffect(() => {
        loadorders();
    }, [])
    useEffect(() => {
        console.log(Orders)
    }, [])


    if (Loading) {
        return <div className='loader w-full my-50 mx-auto'></div>
    }

    return (
        <div className='text-black relative min-h-screen h-auto'>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div className='absolute inset-0 -z-30 h-full w-full'>
                <img src="/blured.jpg" alt="." className='h-full w-full object-cover' /></div>
            <div className='h-24 bg-white rounded-b-3xl opacity-40'></div>
            <h1 className='md:font-bold md:text-5xl font-semibold text-3xl mb-2 pl-4 pt-8'>
                Current Orders:
            </h1>
            <div className='flex w-full mx-2 mb-5 text-white gap-3 pl-2 mt-5'>
                <button className='px-4 py-1 border-2 border-white focus:bg-white focus:text-black hover:bg-white hover:text-black transition-all ease-in-out duration-200 rounded-2xl text-md text-black'>Paid</button>
                <button className='px-4 py-1 border-2 border-white focus:bg-white focus:text-black hover:bg-white hover:text-black transition-all ease-in-out duration-200 rounded-2xl text-md text-black'>Unpaid</button>
            </div>
            {Orders && Orders.length > 0 ? <div className='md:mx-18 mx-1.5 h-full md:grid grid-cols-3 items-start justify-center gap-5'>
                {Orders && Orders.map((Order) => {
                    return <Link href={`/CustomerTools/${Order.orderid}`} key={Order.orderid}> <Group order={Order} paynow={paynow} /></Link>
                })}
            </div> : <div className='md:mx-18 mx-1.5 h-full'>
                You don't have Any Active Orders</div>
            }
        </div>
    )
}

export default OrderStatus