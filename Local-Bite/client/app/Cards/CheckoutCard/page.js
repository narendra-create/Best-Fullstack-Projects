import React from 'react'

const Checkout = ({ subTotal, discount, platformfee, deliverycharge, grandtotal }) => {

    return (
        <section className='bg-white rounded-xl'>
            <div className='pt-6'>
                <div className='flex flex-col gap-2 mb-5 text-gray-600'>
                    <div className='flex justify-between mx-5 bg-amber-50 text-xl'>
                        <div className='font-semibold font-serif'>subtotal</div>
                        <div>{subTotal}</div>
                    </div>
                    <div className='flex justify-between mx-5 bg-amber-50 text-xl'>
                        <div className='font-semibold font-serif'>delivery charge</div>
                        <div>{deliverycharge}</div>
                    </div>
                    <div className='flex justify-between mx-5 bg-amber-50 text-xl'>
                        <div className='font-semibold font-serif'>platform fee</div>
                        <div>{platformfee}</div>
                    </div>
                    <div className='flex justify-between mx-5 bg-amber-50 text-xl'>
                        <div className='font-semibold font-serif'>discount</div>
                        <div>{discount}</div>
                    </div>
                </div>
                <div className='flex justify-between mx-5 text-2xl font-semibold bg-gray-100 mb-6'>
                    <div>Total -</div>
                    <div>{subTotal > 0 ? grandtotal : 0}</div>
                </div>
                <button className='rounded-2xl mx-7 py-3 hover:bg-lime-800 transition-all ease-in-out duration-150 bg-lime-600 font-bold w-88 text-white'>CheckOut</button>
            </div>
            <hr className='mx-5 mt-8 mb-3 border-t-4 border-gray-200' />
            <div className='mx-5 mt-5'>
                <div className='flex justify-between mx-15 items-center'>
                    <div className='font-normal text-lg text-gray-500'>Estimated delivery time</div>
                    <div className='font-semibold text-md'>45 min</div>
                </div>
                <hr className='mx-1 border-t-4 mt-5 mb-3 border-gray-200' />
                <div className='mx-3'>
                    <h3 className='font-semibold text-xl'>Supported Payment Methods:</h3>
                    <div className='flex items-center gap-2 text-2xl pb-5'>
                        <img src="/mastercard-png.png" alt="MASTERCARD" />
                        •
                        <img src="/visa.png" alt="VISA" className='w-[73px]' />
                        •
                        <img src="/UPI-01.png" alt="UPI" className='w-[75px]' />
                        •
                        <img src="/money.svg" alt="COD" className='w-[45px]' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Checkout