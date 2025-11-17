import React from 'react'
import VendorProductsCard from '@/app/Cards/CurrentCard/page'

const Orders = () => {
    const testobj = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <section className='w-full mt-34 text-black h-full flex flex-col gap-10'>
            <div>
                <h1 className='md:text-6xl text-5xl font-bold pl-5'>Your Orders:</h1>
                <p className='text-sm font-extralight pl-8'>(You can update the status or cancel the order here)</p>
            </div>
            <div className='flex flex-col'>
                <div className='md:pl-10'>
                    <h2 className='text-3xl md:text-4xl font-semibold mb-2 md:w-417 md:mx-auto text-center bg-amber-50 py-3'>New Orders</h2>
                    <div className='h-full md:mx-auto md:w-[78%] bg-gray-300 md:grid md:gap-8 md:grid-cols-3 flex flex-col gap-5 items-center justify-center'>
                        {testobj.map((OneOrder) => {
                            return <VendorProductsCard theme={'amber'} key={OneOrder} />
                        })}
                    </div>
                </div>
                <hr className='mx-5 rounded-full border-2 mt-10' />
                <div className='md:pl-10 md:mt-5 mx-auto w-full'>
                    <h2 className='text-3xl py-4 mx-5 mt-2 rounded-md bg-amber-50 md:text-4xl font-semibold mb-8 text-center md:text-left w-[90%] md:mx-auto md:w-417'>Current Orders</h2>
                    <div className='h-full md:mx-auto md:w-[78%] bg-gray-300 md:grid md:gap-8 grid-cols-3 items-center flex flex-col gap-3 md:justify-center'>
                        {testobj.map((OneOrder) => {
                            return <VendorProductsCard theme={'blue'} key={OneOrder} />
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Orders