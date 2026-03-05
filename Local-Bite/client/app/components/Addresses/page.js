"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import AddressCard from '@/app/Cards/AddressCard/page.js';
import AddressPopup from '@/components/ui/AddressPopup/page.js';
import { ArrowLeft, Plus } from 'lucide-react';

const MyAddresses = () => {
    const [adding, setadding] = useState(false);

    const handlesubmitaddress = async (object) => {
        console.log(object)
    }

    const demo = [1, 2, 3, 4, 5]
    return (
        <div className='w-full min-h-screen bg-gray-100'>
            <div className='cursor-text shadow-[0px_0px_55px_-50px_#000000] w-full py-1 h-18 md:h-24 mt-22 flex items-center gap-14 md:gap-0 border-y border-gray-400 bg-white'>
                <button className='pl-5 md:pl-12'>
                    <ArrowLeft />
                </button>
                <span className='text-center md:text-right md:pr-[26%] font-mono self-center w-[52%] md:w-[82%] text-xl md:text-4xl font-semibold'>Manage-Addresses</span>
                <button onClick={() => setadding(true)} className='hover:font-bold hover:scale-98 hover:text-shadow-md transition-all ease-in-out duration-150 hover:inset-shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.2)] md:flex hidden gap-2 px-6 items-center justify-center py-3 rounded-lg text-lg bg-trust text-white'>
                    <span className='text-center align-middle'><Plus /></span><span className='font-semibold'>Add New Address</span>
                </button>
            </div>
            <button onClick={() => setadding(true)} className='bg-white md:hidden shadow-[0px_0px_10px_-6px_rgba(0,0,0,0.35)] flex justify-center gap-8 w-[96%] mx-auto text-xl items-center h-14 rounded-lg border border-gray-400 my-2'>
                <span className='text-center align-middle'><Plus /></span><span className='font-semibold'>Add New Address</span>
            </button>
            <div className='px-5 flex flex-col md:grid grid-cols-3 md:gap-4 md:px-16'>
                {demo && demo.map((single) => {
                    return <div key={single} className='my-5'>
                        <AddressCard />
                    </div>
                })}
            </div>
            <AddressPopup isOpen={adding} onClose={() => setadding(false)} onSubmit={handlesubmitaddress} />
        </div>
    )
}

export default MyAddresses;