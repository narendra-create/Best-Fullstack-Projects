"use client"
import React from 'react'
import ManageItems from '@/app/Cards/ManageCard/page'
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const Manage = () => {
    const quaryclient = useQueryClient();

    const loaditems = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/product/MyProducts`, { credentials: "include" });
        if (!res.ok) throw new Error("Response error")
        const data = await res.json();
        return data.products
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ["manageItems"],
        queryFn: loaditems
    })

    const handlestock = useMutation({
        mutationFn: async ({ itemid, isopen }) => {
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
        },
        onSuccess: () => quaryclient.invalidateQueries(["manageItems"])
    })

    const handleremove = useMutation({
        mutationFn: async (itemid) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/product/delete/${itemid}`, {
                credentials: "include",
                method: "DELETE"
            })
            if (!res.ok) throw new Error("Error in response")
        },
        onSuccess: () => quaryclient.invalidateQueries(["manageItems"])
    })

    if (isLoading) return <p className="text-center mt-10 text-xl">Loading...</p>;
    if (error) return <p>Error loading products 😅</p>;

    return (
        <div className='flex flex-col'>
            <div><h1 className='text-4xl font-bold pl-10 pt-5'>Manage Your Items</h1></div>
            <div className='grid grid-cols-2 items-center justify-center gap-y-10 mx-auto mt-10 py-10 px-10 rounded-t-2xl bg-orange-50 mb-30 w-440'>
                {data && data.map((item) => {
                    return <ManageItems key={item._id} handlestock={(id, newval) => handlestock.mutate({ itemid: id, isopen: newval })} handleremove={(id) => handleremove.mutate(id)} product={item} />
                })}
            </div>
        </div>
    )
}

export default Manage