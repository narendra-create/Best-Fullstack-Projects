import React from 'react'

const Orders = () => {
    return (
        <section className='w-full mt-34 bg-black h-full flex flex-col gap-10'>
            <div>
                <h1 className='text-4xl font-bold pl-6'>Your Orders:</h1>
                <p className='text-sm font-extralight pl-6'>(You can update the status or cancel the order here)</p>
            </div>
            <div className='flex flex-col'>
                <div className='pl-10 '>
                    <h2 className='text-2xl font-semibold mb-5'>New Orders:</h2>
                    <div className='h-full mx-10 bg-gray-700'>Db data</div>
                </div>
                <hr className='mx-5 rounded-full border-2 mt-10' />
                <div className='pl-10 mt-5'>
                    <h2 className='text-2xl font-semibold mb-5'>Current Orders:</h2>
                    <div className='h-full mx-10 bg-gray-700'>Current orders db data</div>
                </div>
            </div>
        </section>
    )
}

export default Orders