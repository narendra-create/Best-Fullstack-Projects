import { useState } from "react"
import React from 'react'



const PaymentPage = ({ totalamount, loading, handleback, handlepayment, handlecod }) => {

    const [method, setmethod] = useState("")


    const handlesubmit = () => {
        if (method === "online-pay") {
            handlepayment();
        }
        else if (method === "cash-on-delivery") {
            handlecod();
        }
        else {
            alert("Please Choose Valid Payment Option")
        }
    }

    const handlemethod = (e) => {
        setmethod(e.target.value)
        console.log(e.target.value)
    }

    if (loading) {
        return <div className='loader w-full my-50 mx-auto'></div>
    }

    return (
        <section className='rounded-2xl mt-[10%] mb-15 w-full flex flex-col h-[90%] p-5 py-10 bg-gray-200 justify-center items-center'>
            <div className='w-full bg-gray-50 rounded-2xl py-2 flex justify-between px-5 items-center'>
                <span className='text-2xl font-semibold'>Total Amount -</span>
                <span className='text-2xl font-bold'>₹{totalamount}</span>
            </div>
            <form className='w-full flex flex-col items-center px-1' onSubmit={handlesubmit}>
                <div className='mt-5 w-full'>
                    <select onChange={handlemethod} name="payment-method" id="payment-method" className='bg-gray-50 rounded-lg font-semibold text-lg py-2 px-5 w-full'>
                        <option value="#">Select Payment Method</option>
                        <option value="cash-on-delivery">Cash On Delivery</option>
                        <option value="online-pay">Online Payment</option>
                        <option value="#">"Card (currently not available)"</option>
                    </select>
                </div>
                <button type='submit' className='py-2 px-5 text-2xl font-semibold font-sans text-white bg-lime-600 hover:bg-lime-800 rounded-2xl mt-10 w-[80%]'>Pay and order</button>
                <button type="button" onClick={handleback} className='py-2 px-1 text-xl font-semibold font-sans text-black border-1 border-gray-100 bg-gray-50 hover:bg-gray-200 rounded-2xl mt-5 w-[80%]'>Back To Previous</button>
            </form>
        </section>
    )
}

export default PaymentPage