"use client"
import React from 'react'
import { useState } from 'react'

const ManageItems = ({ product, handlestock, handleremove }) => {
    const [stock, setstock] = useState(product.stock)

    return (
        <div>
            <section className='relative shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-200 bg-white text-black mx-auto rounded-2xl flex h-57 gap-4 transition-all ease-in-out duration-200 hover:scale-102'>
                <img src={product.imageUrl || '/food-placeholder.jpeg'} alt="Food image" className='shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-55 w-83 self-center ml-1 rounded-xl text-center text-xl font-bold object-cover object-center' />
                <div className='flex flex-col h-full justify-center'>
                    <div className='flex items-center justify-between h-18'>
                        <span className='text-3xl h-4 font-bold'>{product.name}</span>
                        <button
                            onClick={() => {
                                const newval = !product.stock
                                setstock(newval)
                                handlestock(product._id, newval)
                            }}
                            className={`cursor-pointer absolute right-0 top-2.5 self-start ${stock ? "bg-coriander-green": "bg-chili-red"} px-4 py-2 mr-2 rounded-3xl text-white text-sm font-bold flex gap-1 items-center hover:bg-gray-800 transition-all duration-200 focus:ring-2 focus:ring-black ease-in-out`}>
                            {stock ? "In Stock" : "Out of Stock"}
                        </button>
                        <button onClick={() => handleremove(product._id)} className='cursor-pointer absolute right-0 top-14 self-start bg-chili-red px-4 py-2 mr-2 rounded-3xl text-white text-sm font-bold flex gap-1 items-center hover:bg-red-800 transition-all duration-200 focus:ring-2 focus:ring-black ease-in-out'>
                            Remove
                        </button>
                    </div>
                    <div className='flex gap-4 pl-3 self-start h-8 font-sans text-zinc-500'>
                        <span>₹{product.price}</span> | <span>{product.quantity}</span>
                    </div>
                    <p className='h-29 flex items-center p-3 mr-2 text-gray-500 text-lg w-[90%]'>{product.description}</p>
                </div>
            </section>
        </div>
    )
}

export default ManageItems