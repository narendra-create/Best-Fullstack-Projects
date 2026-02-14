"use client"
import React from 'react';


const Detailordercard = ({ order }) => {

    const demo = [{
        name: "Masala dosa",
        qty: 2,
        price: 25,
        total: 50
    },
    {
        name: "Masala Idli",
        qty: 1,
        price: 20,
        total: 20
    }]

    const background = order && order.status === "COMPLETED" ? "bg-coriander-green" : "bg-chili-red";

    return (
        <section className='h-screen w-full px-2 flex flex-col gap-2 items-center'>
            <div className='text-2xl font-semibold py-5 mt-2 w-full text-center pr-7 bg-gray-200 rounded-2xl'>Order Receipt</div>
            <hr className='bg-gray-600 h-[0.1rem] my-0.1 w-[95%]' />
            <div className='flex w-full justify-between gap-8 px-4 my-2'>
                <div>
                    <div>Order#: <span className='font-bold'>1235456</span></div>
                    <div>Order Date: <span>February 13 2026</span></div>
                    <div className='flex items-center gap-2'><span className='text-xl flex items-start'>Status:</span> <span className={`flex items-end ${background} font-semibold text-sm px-3 py-1 text-white  rounded-md`} >Completed</span></div>
                </div>
                <div>
                    <div className='font-bold'>Shipping Adress:</div>
                    <div>xyz street, United States, asia, 4001</div>
                    <div>Phone no: 1122334455</div>
                </div>
            </div>
            <hr className='bg-gray-600 h-[0.1rem] w-[95%]' />
            <div className='font-semibold text-2xl w-full pl-2 pt-1 pb-1'>Order Summery</div>
            <hr className='bg-gray-300 h-[0.1rem] w-[96%]' />
            <div className='w-full'>
                <table className='w-[99%]'>
                    <thead className='bg-gray-200'>
                        <tr>
                            <th className='text-left p-1.5 pl-2'>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody className='px-5'>
                        {demo && demo.map((item, i) => (
                            <tr key={i} className='text-center text-md'>
                                <td className='py-2 text-start mt-3 border-gray-300 border-b-2 pl-2'>{item.name}</td>
                                <td className='py-2 border-gray-300 border-b-2 mt-3 font-bold'>{item.qty}</td>
                                <td className='py-2 border-gray-300 border-b-2 mt-3 font-bold'>{item.price}</td>
                                <td className='py-2 border-gray-300 border-b-2 mt-3 font-bold'>{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex flex-col self-end pr-5 w-[53%]'>
                <div className='flex justify-between px-2'><span>Subtotal:</span> <span className='font-semibold'> $50</span></div>
                <div className='flex justify-between px-2'><span>Delivery:</span> <span className='font-semibold'>$40</span></div>
                <div className='flex justify-between px-2'><span>Tax:</span> <span className='font-semibold'>$4</span></div>
                <hr className='bg-gray-500 h-[0.2rem] w-full' />
                <div className='flex justify-between text-lg font-bold'><span>Order Total:</span> <span>$100</span></div>
            </div>
            <hr className='bg-gray-300 h-[0.1rem] w-[96%]' />
            <div className='flex w-full gap-5 justify-between mt-3 px-2'>
                <div className='bg-gray-100 w-[50%] pb-1 pt-2'>
                    <div className='px-3 font-bold'>Payment Method:</div>
                    <hr className='bg-gray-300 h-[0.2rem] w-[93%] mx-auto' />
                    <div className='px-4 pt-2 mt-3 font-semibold'>
                        Credit Card(visa)
                        <br />
                        ************1234
                    </div>
                </div>
                <div className='bg-gray-100 w-[50%] pb-3 pt-2'>
                    <div className='px-3 font-bold'>Delivery Method:</div>
                    <hr className='bg-gray-300 h-[0.2rem] w-[93%] mx-auto' />
                    <div className='px-4 mt-3 font-semibold'>
                        Standard Delivery
                        Estimated Delivery: 10min
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Detailordercard