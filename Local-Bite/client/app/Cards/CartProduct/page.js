import React from 'react'

const CartProduct = () => {
    return (
        <div className='relative shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-black mt-4 mx-auto w-[90%] h-40 bg-white flex rounded-xl gap-5'>
            <img src="/food-placeholder.jpeg" alt="food image" className='w-30 m-5 object-cover object-center rounded-full h-29' />
            <div className='relative flex flex-col w-full  p-1 justify-between my-2'>
                <div className='h-[60%]  flex flex-col pl-4 mt-2'>
                    <div className='text-3xl font-semibold'>Burger</div>
                    <div className='font-light text-sm ml-1'>Narendra fast foods</div>
                </div>
                <div className='h-[40%] items-center  flex justify-between pl-5 pr-8'>
                    <div className='font-semibold text-3xl'><i>150rs</i></div>
                    <div className='flex gap-3 items-center'>
                        <div className='font-semibold text-3xl'>2</div>
                        <div className='flex items-center justify-center gap-1 py-2'>
                            <button type="button" className="text-black bg-hero-bg hover:text-white hover:bg-gray-900 font-medium rounded-lg text-4xl px-4 text-center me-2 mb-2 mt-2 h-9 dark:bg-hero-bg dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">-</button>
                            <button type="button" className="text-black bg-hero-bg hover:text-white hover:bg-gray-900 font-medium rounded-lg text-2xl px-4 text-center me-2 mb-2 mt-2 h-9 dark:bg-hero-bg dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">+</button>
                        </div>
                    </div>
                </div>
                <div className='absolute right-5 top-1.5 cursor-pointer'>❌</div>
            </div>
        </div>
    )
}

export default CartProduct