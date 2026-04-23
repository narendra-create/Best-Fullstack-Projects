"use client"
import React from 'react'
import { useState } from 'react'

const ManageItems = ({ product, handlestock, handleremove }) => {
    const [stock, setstock] = useState(product?.stock ?? false)

    return (
        <div className='w-full px-2 md:px-4'>
            <section className='relative shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-full bg-white text-black mx-auto rounded-2xl flex flex-col sm:flex-row sm:h-57 gap-4 transition-all ease-in-out duration-200 hover:scale-102'>
                <img
                    src={product?.imageUrl || '/food-placeholder.jpeg'}
                    alt="Food image"
                    className='shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-48 sm:h-55 w-full sm:w-83 sm:self-center sm:ml-1 rounded-t-2xl sm:rounded-xl text-center text-xl font-bold object-cover object-center'
                />
                <div className='flex flex-col h-full justify-center pb-4 sm:pb-0 pr-24 sm:pr-20'>
                    <div className='flex items-center justify-between h-18'>
                        <span className='text-xl sm:text-3xl pl-4 h-6 font-bold truncate max-w-[160px] sm:max-w-none'>{product?.name}</span>
                        <button
                            onClick={() => {
                                const newval = !stock
                                setstock(newval)
                                handlestock(product?._id, newval)
                            }}
                            className={`cursor-pointer absolute right-0 top-2.5 self-start ${stock ? "bg-coriander-green" : "bg-chili-red"} px-3 py-2 mr-2 rounded-3xl text-white text-xs sm:text-sm font-bold flex gap-1 items-center hover:bg-gray-800 transition-all duration-200 focus:ring-2 focus:ring-black ease-in-out`}>
                            {stock ? "In Stock" : "Out of Stock"}
                        </button>
                        <button
                            onClick={() => handleremove(product?._id)}
                            className='cursor-pointer absolute right-0 top-14 self-start bg-chili-red px-3 py-2 mr-2 rounded-3xl text-white text-xs sm:text-sm font-bold flex gap-1 items-center hover:bg-red-800 transition-all duration-200 focus:ring-2 focus:ring-black ease-in-out'>
                            Remove
                        </button>
                    </div>
                    <div className='flex gap-4 pl-3 self-start h-8 font-sans text-zinc-500'>
                        <span>₹{product?.price}</span> | <span>{product?.quantity}</span>
                    </div>
                    <p className='sm:h-29 flex items-center p-3 mr-2 text-gray-500 text-base sm:text-lg w-full'>{product?.description}</p>
                </div>
            </section>
        </div>
    )
}

export default ManageItems