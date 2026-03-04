"use client"
import React from 'react';


const Detailordercard = ({ order, ordertime }) => {

    const background = order && order.status === "COMPLETED" ? "bg-coriander-green" : "bg-chili-red";
    const time = ordertime;

    // console.log(order, "this is order faulted")
    // console.log(ordertime, "This is Order time")

    return (
        <section className='h-screen w-full px-2 flex flex-col gap-2 items-center'>
            <div className='text-2xl font-semibold py-5 mt-2 w-full text-center pr-7 bg-gray-200 rounded-2xl'>Order Receipt</div>
            <div className='w-full md:w-[99%]'>
                <hr className='bg-gray-600 h-[0.1rem] my-0.1 md:my-1 w-[95%] md:w-full' />
                <div className='flex w-full justify-between gap-8 px-4 md:my-5 my-2'>
                    <div>
                        <div className='md:text-xl md:mt-2'><span >Order#:</span> <span className='font-bold'>{order?.orderid}</span></div>
                        <div className='md:text-xl md:mt-2'>{order?.status === "CANCELLED" ? <span>Cancellation Date: <span>{time}</span> </span> : <span>Order Date: <span>{ordertime}</span></span>}</div>
                        <div className='flex items-center gap-2 md:text-xl md:mt-2'><span className='text-xl flex items-start'>Status:</span> <span className={`flex items-end ${background} font-semibold text-sm md:text-md px-3 py-1 text-white  rounded-md`} >Completed</span></div>
                    </div>
                    <div className='md:pr-60'>
                        <div className='font-bold md:mt-2 md:text-xl'>Shipping Adress:</div>
                        <div className='md:mt-1 md:text-lg'>xyz street, United States, asia, 4001</div>
                        <div className='md:text-lg'>Phone no: 1122334455</div>
                    </div>
                </div>
                <hr className='bg-gray-600 h-[0.2rem] opacity-45 md:my-1 w-[95%] md:w-full' />
                <div className='font-semibold text-2xl md:text-3xl w-full pl-2 pt-1 md:py-5 pb-1'>Order Summery</div>
                <hr className='bg-gray-600 h-[0.2rem] opacity-45 w-[96%] md:my-1 mb-3 md:w-full md:mb-5' />
                <div className='flex flex-col md:flex-row w-full md:justify-center md:px-8 md:mb-5'>
                    <div className='md:w-[90%]'>
                        <table className='w-[99%] md:w-[99%] md:rounded-2xl'>
                            <thead className='bg-gray-200 rounded-2xl'>
                                <tr>
                                    <th className='text-left p-1.5 pl-2'>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody className='px-5 rounded-2xl'>
                                {order && order.items.map((item, i) => (
                                    <tr key={i} className='text-center text-md'>
                                        <td className='py-2 text-start mt-3 border-gray-300 border-b-2 pl-2'>{item.product.name}</td>
                                        <td className='py-2 border-gray-300 border-b-2 mt-3 font-bold'>{item.quantity}</td>
                                        <td className='py-2 border-gray-300 border-b-2 mt-3 font-bold'>₹{item.product.price}</td>
                                        <td className='py-2 border-gray-300 border-b-2 mt-3 font-bold'>₹{item.quantity * item.product.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex flex-col self-end pr-5 w-[53%] md:w-[33%] md:hidden'>
                        <div className='flex justify-between px-2'><span>Subtotal:</span> <span className='font-semibold'>₹{order?.grandtotal || "--/--"}</span></div>
                        <div className='flex justify-between px-2'><span>Delivery:</span> <span className='font-semibold'>₹{order?.deliverycharge}</span></div>
                        <div className='flex justify-between px-2'><span>Tax:</span> <span className='font-semibold'>₹{order?.platformfee}</span></div>
                        <hr className='bg-gray-500 h-[0.2rem] w-full' />
                        <div className='flex justify-between text-lg font-bold'><span>Order Total:</span> <span>₹{order?.grandtotal}</span></div>
                    </div>
                    <div className='hidden md:block w-[30%]'>
                        <table className='md:w-full md:rounded-2xl'>
                            <thead className='bg-gray-200 w-full'>
                                <tr>
                                    <th className='p-1.5 px-10 md:text-2xl w-full'>Order total:</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='py-2 text-start mt-3 border-gray-300 border-b-2'>
                                    <td className='pl-5 text-lg'>Subtotal:</td>
                                    <td className='pr-5 font-semibold'>₹{order?.subTotal}</td>
                                </tr>
                                <tr className='py-2 text-start mt-3 border-gray-300 border-b-2 pl-2'>
                                    <td className='pl-5 text-lg'>Delivery Charge:</td>
                                    <td className='pr-5 font-semibold'>₹{order?.deliverycharge}</td>
                                </tr>
                                <tr className='py-2 text-start mt-3 border-gray-300 border-b-2 pl-2'>
                                    <td className='pl-5 text-lg'>Platform fee:</td>
                                    <td className='pr-5 font-semibold'>₹{order?.platformfee}</td>
                                </tr>
                                <tr>
                                    <td className='text-right pr-10 text-lg font-semibold'>Order Total:</td>
                                    <td className='text-lg font-bold pr-5'>₹{order?.grandtotal}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr className='bg-gray-600 h-[0.2rem] opacity-45 w-[96%] md:w-full mt-3 mb-10 md:mb-5' />
                <div className='flex w-full md:w-[96%] md:mx-auto gap-5 md:gap-20 justify-between mt-3 px-2'>
                    <div className='bg-gray-100 w-[50%] pb-1 pt-2 md:pt-5 md:pb-10 md:rounded-2xl'>
                        <div className='px-3 md:pl-4 font-bold text-lg md:text-xl'>Payment Method:</div>
                        <hr className='bg-gray-300 h-[0.2rem] w-[93%] md:w-[98%] mx-auto md:mt-4 md:mb-2' />
                        <div className='px-4 pt-2 md:pl-4 text-md md:text-lg mt-3 md:mt-0 md:pt-0 font-semibold'>
                            {order?.paymentStatus === 'PAID' ? "Online Payment (Razorpay)" : "Cash On Delivery"}
                        </div>
                    </div>
                    <div className='bg-gray-100 w-[50%] pb-3 md:pb-10 pt-2 md:pt-5 md:rounded-2xl'>
                        <div className='px-3 md:pl-4 font-bold text-lg md:text-xl'>Delivery Method:</div>
                        <hr className='bg-gray-300 h-[0.2rem] w-[93%] md:w-[98%] mx-auto md:mt-4 md:mb-2' />
                        <div className='px-4 mt-3 font-semibold text-md md:text-lg md:pl-4'>
                            Standard Delivery
                            Estimated Delivery: 10min
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col items-center mt-10 gap-2'>
                    <div className='text-2xl md:text-3xl font-semibold'>🍽️ Thank you for your Order 🍴</div>
                    <div className='text-md md:text-xl text-center'><span>If you have any questions, Let Us know </span><a href='#' className='underline text-blue-600'>support@gmail.com</a></div>
                </div>
            </div>
        </section>
    )
}

export default Detailordercard;