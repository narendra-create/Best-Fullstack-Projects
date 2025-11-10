"use client"
import React, { useEffect, useState } from 'react'
import CartProduct from '@/app/Cards/CartProduct/page'
import Checkout from '@/app/Cards/CheckoutCard/page'
import { useAuth } from '@/app/contexts/AuthContext'

const Cart = () => {
  const [items, setitems] = useState([])
  const { User, isLoading: isAuthLoading } = useAuth();
  const [CartLoading, setCartLoading] = useState(true)

  useEffect(() => {
    const loadcart = async () => {
      setCartLoading(true)
      if (isAuthLoading) return;
      if (User) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/cart/get`)
          const data = await res.json();
          setitems(data.data.items || [])
        }
        catch (err) {
          console.log("Error while getting cart", err)
          setitems([])
        }
      }
      else {
        const localitems = JSON.parse(localStorage.getItem("items")) || [];
        setitems(localitems);
      }
      setCartLoading(false);
    }
    loadcart();
  }, [User, isAuthLoading])


  const handleRemove = async (item) => {
    if (User) {
      const productid = item.product._id;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/cart/delete/${productid}`, { credentials: "include", method: "DELETE" })
        const data = await res.json();
        setitems(data.data.items);
      } catch (err) {
        console.log("Error while deleting the item", err)
      }
    }
    else {
      try {
        const existing = JSON.parse(localStorage.getItem("items")) || [];
        const updated = existing.filter((itemf) => itemf.cartid !== item.cartid);
        localStorage.setItem("items", JSON.stringify(updated));
        setitems(updated);
        console.log(`🗑️ Removed ${item.cartid}`);
      } catch (err) {
        console.error("Error removing item:", err);
      }
    }
  };

  const plus = (cartid) => {
    const updated = items.map((item) =>
      item.cartid === cartid ? { ...item, qty: item.qty + 1 } : item
    );
    setitems(updated);
    localStorage.setItem("items", JSON.stringify(updated));
  };

  const minus = (cartid) => {
    const updated = items
      .map((item) =>
        item.cartid === cartid
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 0 }
          : item
      )
      .filter((item) => item.qty > 0); // remove if qty hits 0

    setitems(updated);
    localStorage.setItem("items", JSON.stringify(updated));
  };

  return (
    <div className='flex text-black w-[80%] h-full mt-24 mx-auto'>
      <div className='w-[70%] flex flex-col p-5'>
        <h4 className='font-extrabold font-sans text-4xl'>Your Cart</h4>
        <div className='mt-10 h-[54%] overflow-auto'>
          {items && items.length > 0 ? items.map((item, i) => {
            return <CartProduct key={i} items={item} handleremove={handleRemove} plus={plus} minus={minus} />
          }) : <div className='text-black'>Your cart is empty</div>}
        </div>
        <div className='mx-12.5 rounded-2xl gap-1 flex mt-5'>
          <input type="text" id='coupon' name='coupon' placeholder='Coupon code' className='bg-white pl-5 w-113 h-full focus:outline-1 outline-gray-400 rounded-lg' />
          <button className='bg-sev-yellow py-3 transition-all ease-in-out duration-150 hover:bg-yellow-700 hover:text-gray-100 px-3 rounded-xl text-gray-900 font-semibold focus:outline-1 outline-gray-400'>Apply</button>
        </div>
        <div className='flex flex-col mx-12 mt-5'>
          <label htmlFor="instructions" className='font-semibold mb-3 text-xl'>Special instructions for Restaurant</label>
          <textarea placeholder='type here (max 320)' name="instructions" id="instructions" maxLength={320} className='text-lg font-serif w-154 py-2 px-5 h-44 bg-white resize-none rounded-lg ml-1 break-words whitespace-normal' />
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