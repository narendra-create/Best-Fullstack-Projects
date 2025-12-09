"use client"
import React from 'react'
import ManageItems from '@/app/Cards/ManageCard/page'
import { useState, useEffect } from 'react'

const Manage = () => {
    const [items, setitems] = useState()

    const loaditems = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/product/MyProducts`, { credentials: "include" });
            if (!res.ok) throw new Error("Response error")
            const data = await res.json();
            setitems(data.products);
        }
        catch (err) {
            console.log(err, "fetching error")
        }
    }

    const handlestock = async (itemid, isopen) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/product/stock`, {
                credentials: "include",
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    isinstock: isopen,
                    itemid: itemid
                })
            })
            if (!res.ok) {
                throw new Error("Error in reponse", res, res.message)
            }
        }
        catch (err) {
            console.log("Fetching error", err)
        }
    }

    const handleremove = async (itemid) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/product/delete/${itemid}`, {
                credentials: "include",
                method: "DELETE"
            })
            if (!res.ok) throw new Error("Error in response")
        }
        catch (err) {
            console.log("Error in fetching", err)
        }
    }

    useEffect(() => {
        loaditems();
    }, [])

    return (
        <div className='flex flex-col'>
            <div><h1 className='text-4xl font-bold pl-10 pt-5'>Manage Your Items</h1></div>
            <div className='grid grid-cols-2 items-center justify-center gap-y-10 mx-auto mt-10 py-10 px-10 rounded-t-2xl bg-orange-50 mb-30 w-440'>
                {items && items.map((item) => {
                    return <ManageItems key={item._id} handlestock={handlestock} handleremove={handleremove} product={item} />
                })}
            </div>
        </div>
    )
}

export default Manage