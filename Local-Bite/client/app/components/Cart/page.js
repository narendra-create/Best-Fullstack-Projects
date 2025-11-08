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
        <div>coupon div</div>
        <div>instructions div</div>
      </div>
      <div className='w-[30%] p-5'>
        <h3 className='mb-12 font-extrabold text-4xl'>Order Summary</h3>
        <Checkout />
      </div>
    </div>
  )
}

export default Cart