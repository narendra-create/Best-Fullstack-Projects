"use client"
import React from 'react'

const CartProduct = ({ items, handleremove, vendor, plus, minus }) => {
    return (
        <div className='relative shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-black mt-4 mx-auto w-full md:w-[90%] h-29 md:h-40 bg-white flex rounded-lg md:gap-5 gap-2'>
            <img src={items.product.imageUrl || "/food-placeholder.jpeg"} alt="food image" className='w-14 h-14 md:w-30 mt-4 ml-4 md:m-5 object-cover object-center rounded-full md:h-29' />
            <div className='relative flex flex-col w-full  p-1 justify-between mt-2'>
                <div className='h-[60%] flex flex-col md:pl-4 mt-2'>
                    <div className='text-xl md:text-3xl font-semibold'>{items.name}</div>
                    <div className='font-light text-sm ml-1'>{vendor}</div>
                </div>
                <div className='h-[40%] items-center flex justify-between md:pl-5 pr-8'>
                    <div className='font-semibold text-xl md:text-3xl'><i>{items.price}rs</i></div>
                    <div className='flex gap-3 items-center'>
                        <div className='font-semibold text-xl md:text-3xl'>{items.quantity}</div>
                        <div className='flex items-center justify-center gap-1 py-2'>
                            <button type="button" onClick={() => minus(items)} className="text-black bg-hero-bg hover:text-white hover:bg-gray-900 font-medium rounded-lg  text-2xl md:text-4xl px-3 md:px-4 text-center me-2 mb-2 mt-2 h-9 md:h-9 dark:bg-hero-bg dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">-</button>
                            <button type="button" onClick={() => plus(items)} className="text-black bg-hero-bg hover:text-white hover:bg-gray-900 font-medium rounded-lg text-xl md:text-2xl px-3 md:px-4 text-center me-2 mb-2 mt-2 h-9 md:h-9 dark:bg-hero-bg dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">+</button>
                        </div>
                    </div>
                </div>
                <div className='absolute right-5 top-1.5 cursor-pointer' onClick={() => handleremove(items)}>❌</div>
            </div>
        </div>
    )
}

export default CartProduct