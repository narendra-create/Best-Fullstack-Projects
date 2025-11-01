import React from 'react'
import CurrentProducts from '@/app/Cards/CurrentCard/page'

const Orders = () => {
    const testobj = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <section className='w-full mt-34 text-black h-full flex flex-col gap-10'>
            <div>
                <h1 className='text-6xl font-bold pl-5'>Your Orders:</h1>
                <p className='text-sm font-extralight pl-8'>(You can update the status or cancel the order here)</p>
            </div>
            <div className='flex flex-col'>
                <div className='pl-10 '>
                    <h2 className='text-4xl font-semibold mb-5'>New Orders:</h2>
                    <div className='h-full mx-10 bg-gray-700'>Db data</div>
                </div>
                <hr className='mx-5 rounded-full border-2 mt-10' />
                <div className='pl-10 mt-5 mx-auto w-full'>
                    <h2 className='text-4xl font-semibold mb-8 mx-auto w-417'>Current Orders:</h2>
                    <div className='h-full mx-auto w-[78%] bg-gray-300 grid gap-8 grid-cols-3 items-center justify-center'>
                        {testobj.map((OneOrder) => {
                            return <CurrentProducts key={OneOrder} />
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Orders