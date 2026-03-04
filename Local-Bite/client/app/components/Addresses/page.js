import React from 'react';
import AddressCard from '@/app/Cards/AddressCard/page.js';
import { ArrowLeft, Plus } from 'lucide-react';

const MyAddresses = () => {
    const demo = [1, 2, 3, 4, 5]
    return (
        <div className='w-full min-h-screen bg-gray-100'>
            <div className='cursor-text shadow-[0px_0px_55px_-50px_#000000] w-full py-1 h-18 mt-22 flex items-center gap-14 border-y border-gray-400 bg-white'>
                <button className='pl-5'>
                    <ArrowLeft />
                </button>
                <span className='text-center self-center w-[52%] text-2xl font-semibold'>Manage Addresses</span>
            </div>
            <button className='bg-white md:hidden shadow-[0px_0px_10px_-6px_rgba(0,0,0,0.35)] flex justify-center gap-8 w-[96%] mx-auto text-xl items-center h-14 rounded-lg border border-gray-400 my-2'>
                <span className='text-center align-middle'><Plus /></span><span className='font-semibold'>Add New Address</span>
            </button>
            <div className='px-5'>
                {demo && demo.map((single) => {
                    return <div key={single} className='my-5'>
                        <AddressCard />
                    </div>
                })}
            </div>
        </div>
    )
}

export default MyAddresses;