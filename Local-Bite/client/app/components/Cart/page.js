import React from 'react'
import CartProduct from '@/app/Cards/CartProduct/page'
import Checkout from '@/app/Cards/CheckoutCard/page'

const Cart = () => {
  const test = [1, 2, 3, 4, 5]
  return (
    <div className='flex text-black w-[80%] h-full mt-24 mx-auto'>
      <div className='w-[70%] flex flex-col p-5'>
        <h4 className='font-extrabold font-sans text-4xl'>Your Cart</h4>
        <div className='mt-10 h-[54%] overflow-auto'>
          {test.map((i, item) => {
            return <CartProduct key={i} />
          })}
        </div>
        <div className='mx-12.5 rounded-2xl gap-1 flex mt-5'>
          <input type="text" id='coupon' name='coupon' placeholder='Coupon code' className='bg-white pl-5 w-113 h-full focus:outline-1 outline-gray-400 rounded-lg' />
          <button className='bg-sev-yellow py-3 transition-all ease-in-out duration-150 hover:bg-yellow-700 hover:text-gray-100 px-3 rounded-xl text-gray-900 font-semibold focus:outline-1 outline-gray-400'>Apply</button>
        </div>
        <div className='flex flex-col mx-12 mt-5'>
          <label htmlFor="instructions" className='font-semibold mb-3 text-xl'>Special instructions for Restaurant</label>
          <textarea placeholder='type here (max 320)' name="instructions" id="instructions" maxLength={320} className='text-lg font-serif w-154 py-2 px-5 h-44 bg-white resize-none rounded-lg ml-1 break-words whitespace-normal'/>
        </div>
      </div>
      <div className='w-[30%] p-5'>
        <h3 className='mb-12 font-extrabold text-4xl'>Order Summary</h3>
        <Checkout />
      </div>
    </div>
  )
}

export default Cart