import React from 'react'

const AddressCard = () => {
    return (
        <section className='bg-white shadow-[0px_0px_10px_-6px_rgba(0,0,0,0.35)] flex flex-col border border-gray-300 rounded-t-xl pt-5'>
            <div className='flex flex-col px-5 pb-4'>
                <div className='text-xl font-semibold mb-2'>Home</div>
                <div>
                    <div>Narendra Modi</div>
                    <div>490225, Delhi, near india gate</div>
                    <div>New Delhi,Delhi,India</div>
                    <div>+91 9876543210</div>
                </div>
            </div>
            <div className='h-12 w-full flex items-center bg-gray-200'>
                <button className='w-[32%] cursor-pointer h-[65%] text-md font-sans text-blue-700'>Edit</button>
                <button className='w-[32%] cursor-pointer h-[65%] text-md font-sans border-x border-gray-400 text-rose-700'>Delete</button>
                <button className='w-[36%] cursor-pointer h-[65%] text-md font-sans '>Set Default</button>
            </div>
        </section>
    )
}

export default AddressCard;