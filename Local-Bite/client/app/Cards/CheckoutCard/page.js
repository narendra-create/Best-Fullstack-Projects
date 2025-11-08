import React from 'react'

const Checkout = () => {
    return (
        <section className='bg-white rounded-xl'>
            <div className='pt-6'>
                <div className='flex flex-col gap-2 mb-5 text-gray-600'>
                    <div className='flex justify-between mx-5 bg-amber-50 text-xl'>
                        <div className='font-semibold font-serif'>subtotal</div>
                        <div>100</div>
                    </div>
                    <div className='flex justify-between mx-5 bg-amber-50 text-xl'>
                        <div className='font-semibold font-serif'>delivery charge</div>
                        <div>45</div>
                    </div>
                    <div className='flex justify-between mx-5 bg-amber-50 text-xl'>
                        <div className='font-semibold font-serif'>platform fee</div>
                        <div>2.40</div>
                    </div>
                    <div className='flex justify-between mx-5 bg-amber-50 text-xl'>
                        <div className='font-semibold font-serif'>discount</div>
                        <div>20</div>
                    </div>
                </div>
                <div className='flex justify-between mx-5 text-2xl font-semibold bg-gray-100 mb-3'>
                    <div>Total -</div>
                    <div>500</div>
                </div>
                <button className='rounded-2xl mx-7 py-3 hover:bg-lime-800 transition-all ease-in-out duration-150 bg-lime-600 font-bold w-88 text-white'>CheckOut</button>
            </div>
            <div>lower div</div>
        </section>
    )
}

export default Checkout