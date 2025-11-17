"use client"
import React, { useEffect, useState } from 'react'

const SingleCard = ({ order }) => {
    const [Loading, setLoading] = useState(true)

    useEffect(() => {
        console.log("this is single order", order, "and this is type ", typeof order)
        if (order) {
            setLoading(false)
        }
    }, [order])


    if (Loading) {
        return <div>Loading...</div>
    }
    return (
        <section className='text-black bg-white w-full h-full flex flex-col rounded-2xl'>
            <div className='text-center font-bold text-2xl mt-10 mb-6'>Order Summery</div>
            <div className='text-center  py-5 my-2 border-y-2 border-gray-500 font-semibold text-2xl'>----- ORDER IS {order.status} -----</div>
            <div className='bg-gray-100 rounded-3xl mx-2'>
                <div className='flex items-center mt-5 mb-1 pb-4 mx-3 gap-4 border-b-2 border-gray-300'>
                    <span>
                        <img src={order.vendor.imageUrl ? order.vendor.imageUrl : '/vendorbg.jpg'} alt="•" className='w-10 h-10 rounded-full object-center object-cover' />
                    </span>
                    <span className='font-semibold text-xl'> {order.vendor.name}</span>
                </div>
                <div className='mt-3 pb-3'>
                    <div className='pl-3 mb-2 text-lg font-sans'>Order Id: {order.orderid}</div>
                    {order && order.items.map((item) => {
                        return <div className='flex justify-between px-5 mb-3 text-md items-center'>
                            <div className='flex items-center'>
                                🫑 {item.quantity} x {item.product.name}
                            </div>
                            <div className='font-semibold'>₹{item.quantity * item.product.price}</div>
                        </div>
                    })}
                </div>
            </div>
            <div className='bg-gray-100 rounded-2xl mx-2 mt-3 pb-3'>
                <div className='flex items-center mt-5 mb-1 pb-4 mx-3 gap-2 border-b-2 border-gray-300'>
                    <span>
                        <img src="/invoice.svg" alt="•" className='w-8 h-8' />
                    </span>
                    <span className='font-semibold text-xl'>Bill Summery:</span>
                </div>
                <div className='mx-8 mt-4 flex flex-col gap-2 text-md font-sans'>
                    <div className='flex justify-between items-center text-gray-500'><span className='flex items-center'>Item Total - </span> <span className='font-semibold'>₹{order.totalprice}</span></div>
                    <div className='flex justify-between items-center text-gray-500'><span className='flex items-center'>Delivery Charge -</span><span className='font-semibold'>₹40</span></div>
                    <div className='flex justify-between items-center text-gray-500'><span className='flex items-center'>Platform Fee - </span><span className='font-semibold'>₹2.4</span></div>
                    <div className='flex justify-between items-center text-gray-500'><span className='flex items-center'>Discount - </span><span className='font-semibold'>₹20</span></div>
                    <div className='flex justify-between items-center mt-1 pt-4 pb-4 border-t-2 border-gray-300'><span className='flex items-center font-semibold'>Grand Total - </span><span className='font-semibold'>₹{order.totalprice + 40 + 2.4 - 20}</span></div>
                </div>
            </div>
            <div className='bg-gray-100 rounded-2xl mx-2 mt-3 pb-3'>
                <div className='flex gap-2 items-center mx-5 border-b-2 border-gray-300 pb-5 pt-5'>
                    <span className='self-start mt-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>
                    </span>
                    <span>
                        <div className='font-semibold text-lg'>{order.user.name}</div>
                        <div className='text-sm text-gray-500'>{order.user.email}</div>
                    </span>
                </div>
                <div className='flex gap-2 pt-3 items-center mx-5 border-b-2 border-gray-300 pb-5'>
                    <span className='self-start mt-1'>
                        <img src="/money.svg" alt="•" className='w-5 h-5' />
                    </span>
                    <span className='flex flex-col'>
                        <div className='font-semibold text-lg'>Payment method</div>
                        <div className='font-normal text-sm text-gray-500'>Paid Via UPI</div>
                    </span>
                </div>
                <div className='flex gap-2 items-center mx-5 border-b-2 border-gray-300 pb-5 pt-5'>
                    <span className='self-start mt-1'>
                        <img src="/map-pin.svg" alt="•" className='w-7 h-7' />
                    </span>
                    <span className='flex flex-col h-full'>
                        <div className='font-semibold text-lg'>Adress</div>
                        <div className='break-all'>xyz street no. 29 delhi india agra hydrabaad etccccc</div>
                    </span>
                </div>
            </div>
            <div className='md:flex hidden'>buttons div</div>
        </section>
    )
}

export default SingleCard