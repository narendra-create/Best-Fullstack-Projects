"use client"
import React from 'react'
import { useState, useEffect } from 'react';

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

    return (
        <div>Order {Order?.items[0]?.product?.name}</div>
    )
}

export default Order