import React from 'react'
import Group from '@/app/Cards/CurrentOrder/Group'

const OrderStatus = () => {
    return (
        <div className='mt-30 text-black md:mx-28'>
            <h1 className='md:font-bold md:text-5xl font-semibold text-3xl mb-10 pl-4'>
                Current Orders:
            </h1>
            <div className='md:mx-18 mx-1'>
                <Group />
            </div>
        </div>
    )
}

export default OrderStatus