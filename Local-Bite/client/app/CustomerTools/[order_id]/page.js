import React from 'react'
import SingleCard from '@/app/Cards/CurrentOrder/Single'

const OrderDetail = async ({ params }) => {
    const par = await params
    //load order values here
    const [Order, setOrder] = useState()
    return (
        <div className='w-full h-screen text-black bg-hero-bg pt-22'>
            <div className='font-bold text-3xl pl-4 bg-chili-red text-white rounded-b-2xl py-10'>Current Order:</div>
            <div>
                <SingleCard />
            </div>
            <footer className='md:hidden sticky h-22 flex items-end justify-evenly px-5 bg-white text-black bottom-0'>
                <button className='border-2 border-red-200 bg-chili-red text-white px-6 py-3 rounded-lg mb-4'>Restaurent page</button>
                <button className='border-2 border-chili-red text-chili-red px-4 py-3 rounded-lg mb-4'>Cancel Order</button>
            </footer>
        </div>
    )
}

export default OrderDetail