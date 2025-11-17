import React from 'react'
import Group from '@/app/Cards/CurrentOrder/Group'

const OrderStatus = () => {
    return (
        <div className='text-black md:mx-28 relative h-screen'>
            <div className='absolute top-0 -z-30 h-full'>
                <img src="/blured.jpg" alt="." className='h-full object-cover object-center' /></div>
            <div className='h-24 bg-white rounded-b-3xl opacity-40'></div>
            <h1 className='md:font-bold md:text-5xl font-semibold text-3xl mb-2 pl-4 pt-8'>
                Current Orders:
            </h1>
            <div className='flex w-full mx-2 mb-5 text-white gap-3 pl-2 mt-5'>
                <button className='px-4 py-1 border-2 border-white focus:bg-white focus:text-black hover:bg-white hover:text-black transition-all ease-in-out duration-200 rounded-2xl text-md text-black'>Paid</button>
                <button className='px-4 py-1 border-2 border-white focus:bg-white focus:text-black hover:bg-white hover:text-black transition-all ease-in-out duration-200 rounded-2xl text-md text-black'>Unpaid</button>
            </div>
            <div className='md:mx-18 mx-1.5 h-full'>
                <Group />
            </div>
        </div>
    )
}

export default OrderStatus