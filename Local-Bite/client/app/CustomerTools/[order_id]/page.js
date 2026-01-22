"use client"
import React, { useEffect, useState } from 'react'
import SingleCard from '@/app/Cards/CurrentOrder/Single'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const OrderDetail = ({ params }) => {
    //load order values here
    const router = useRouter()

    const [Order, setOrder] = useState()
    const [Loading, setLoading] = useState(true)
    const { order_id } = React.use(params);

    const loadorder = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/order/currentsingle/${order_id}`, {
                credentials: 'include'
            }
            )
            if (!res.ok) {
                console.log("Unable to fetch single order")
            }
            const data = await res.json();
            setOrder(data.order)
            setLoading(false)
        }
        catch (err) {
            console.log("Error in fetching", err)
            setLoading(false);
        }
    }

    const cancelorder = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/order/cancelorder/${Order._id}`, {
            credentials: "include",
            method: "PATCH"
        })

        if (!res.ok) {
            throw new Error("Cannot fetch")
        }
        const data = await res.json();

        alert(data.message)
        setTimeout(() => {
            router.push('/')
        }, 1500);
    }

    useEffect(() => {
        loadorder();
    }, [])

    useEffect(() => {
        console.log("this is database result", Order)
    }, [Order])

    return (
        <div className='w-full h-screen text-black bg-hero-bg pt-22'>
            <div className='font-bold text-3xl pl-4 bg-chili-red text-white rounded-b-2xl py-10'>Current Order:</div>
            <div>
                <SingleCard order={Order} />
            </div>
            <footer className='md:hidden sticky h-22 flex items-end justify-evenly px-5 bg-white text-black bottom-0'>
                <Link href={`/Products/${Order?.vendor._id}`} ><button className='border-2 border-red-200 bg-chili-red text-white px-6 py-3 rounded-lg mb-4'>Restaurent page</button></Link>
                <button className='border-2 border-chili-red text-chili-red px-4 py-3 rounded-lg mb-4' onClick={cancelorder}>Cancel Order</button>
            </footer>
        </div>
    )
}

export default OrderDetail