import React from 'react'

const PaymentPage = () => {
    return (
        <div className='bg-black text-black w-full h-full px-[20%] py-[20%]'>
            <section className='bg-white rounded-2xl my-[5%] w-full flex flex-col'>
                <div>Choose method</div>
                <div>total price to be paid - 500inr</div>
                <div>Payment method</div>
                <button>Pay and order</button>
            </section>
        </div>
    )
}

export default PaymentPage