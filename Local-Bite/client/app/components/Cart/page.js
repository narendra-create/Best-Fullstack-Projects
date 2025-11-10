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
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/cart/get`, { credentials: 'include' })
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
        if (res.ok) {
          const data = await res.json();
          setitems(data.data.items)
        }
        else {
          console.log("Cannot remove item", res.data.message)
        }
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

  const plus = async (item) => {

    if (User) {
      const productid = item.product._id;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/cart/updateqty`, {
          credentials: "include",
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productid: productid,
            operation: 'increase'
          })
        })
        if (res.ok) {
          const data = await res.json();
          setitems(data.data.items);
        }
        else {
          console.log("Cannot increase item")
        }
      }
      catch (err) {
        console.log("Error while increasing items", err)
      }
    }
    else {
      const updated = items.map((itemf) =>
        itemf.cartid === item.cartid ? { ...itemf, qty: itemf.qty + 1 } : itemf
      );
      setitems(updated);
      localStorage.setItem("items", JSON.stringify(updated));
    }
  };

  const minus = async (item) => {
    if (User) {
      const productid = item.product._id;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/cart/updateqty`, {
          credentials: "include",
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productid: productid,
            operation: 'decrease'
          })
        })
        if (res.ok) {
          const data = await res.json();
          setitems(data.data.items)
        }
        else {
          console.log("Cannot decrease the item")
        }
      }
      catch (err) {
        console.log("Error while decreasing items", err)
      }
    }
    else {
      const updated = items
        .map((itemf) =>
          itemf.cartid === item.cartid
            ? { ...itemf, qty: itemf.qty > 1 ? itemf.qty - 1 : 0 }
            : itemf
        )
        .filter((itemf) => itemf.qty > 0); // remove if qty hits 0

      setitems(updated);
      localStorage.setItem("items", JSON.stringify(updated));
    }
  };

  if (CartLoading || isAuthLoading) {
    return <div className='text-black text-center mt-48 text-3xl'>Loading Cart...</div>
  }

  return (
    <div className='flex text-black w-[80%] h-full mt-24 mx-auto'>
      <div className='w-[70%] flex flex-col p-5'>
        <h4 className='font-extrabold font-sans text-4xl'>Your Cart</h4>
        <div className='mt-10 h-[54%] overflow-auto'>
          {items && items.length > 0 ? items.map((item, i) => {
            const key = User ? item._id : item.cartid
            return <CartProduct key={key} items={item} handleremove={handleRemove} plus={plus} minus={minus} />
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