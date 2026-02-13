import React from 'react'

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

    return (
        <section className='w-full px-2 flex flex-col gap-2 items-center'>
            <div className='text-2xl font-semibold py-5 mt-2 w-full text-center pr-7 bg-gray-200 rounded-2xl'>Order Receipt</div>
            <hr className='bg-gray-600 h-[0.1rem] my-0.1 w-[95%]' />
            <div className='flex w-full justify-between gap-8 px-4 my-2'>
                <div>
                    <div>Order#: <span className='font-bold'>1235456</span></div>
                    <div>Order Date: <span>February 13 2026</span></div>
                    <div>Status: <span>Completed</span></div>
                </div>
                <div>
                    <div className='font-bold'>Shipping Adress:</div>
                    <div>xyz street, United States, asia, 4001</div>
                    <div>Phone no: 1122334455</div>
                </div>
            </div>
            <div>Order Summery</div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {demo && demo.map((item, i) => (
                            <tr key={i}>
                                <td>{item.name}</td>
                                <td>{item.qty}</td>
                                <td>{item.price}</td>
                                <td>{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>Prices</div>
            <div className='flex'>
                <div>Payment Method</div>
                <div>Shipping method</div>
            </div>
            <div>Thanks for your purchase</div>
        </section>
    )
}

export default Detailordercard