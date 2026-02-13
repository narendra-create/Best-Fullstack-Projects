"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import Detailordercard from '@/app/Cards/OrderDetailcard/page';

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
        <div>
            <Detailordercard order={Order} />
        </div>
    )
}

export default Order