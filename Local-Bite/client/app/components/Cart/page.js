"use client"
import React, { useEffect, useState } from 'react'
import CartProduct from '@/app/Cards/CartProduct/page'
import Checkout from '@/app/Cards/CheckoutCard/page'
import { useAuth } from '@/app/contexts/AuthContext'

const Cart = () => {
  const [items, setitems] = useState([])
  const { User, isLoading: isAuthLoading } = useAuth();
  const [subtotal, setsubtotal] = useState(0);
  const [CartLoading, setCartLoading] = useState(true);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const loadcart = async () => {
    setCartLoading(true)
    if (isAuthLoading) return;
    if (User) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/cart/get`, { credentials: 'include' })
        const data = await res.json();
        setsubtotal(data.data.subTotal || 0);
        setitems(data.data.items || [])
        setDeliveryCharge(data.data.deliverycharge || 0);
        setDiscount(data.data.discount);
        setPlatformFee(data.data.platformfee);
        setGrandTotal(data.data.grandtotal);
      }
      catch (err) {
        console.log("Error while getting cart", err)
        setitems([])
      }
    }
    else {
      const localitems = JSON.parse(localStorage.getItem("items")) || [];
      if (localitems.length === 0) {
        setitems([]);
        setsubtotal(0);
        setCartLoading(false);
        return;
      }
      try {
        //new api endpoint use for getting total price
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/cart/getprice`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            items: localitems
          })
        })
        if (!res.ok) throw new Error("Failed to calculate total price of cart");
        const data = await res.json();
        setitems(data.data.items || []);
        setsubtotal(data.data.subTotal || 0);
        setDeliveryCharge(data.data.deliverycharge || 0);
        setPlatformFee(data.data.platformfee || 0);
        setDiscount(data.data.discount || 0);
        setGrandTotal(data.data.grandtotal || 0);
      }
      catch (err) {
        console.log("Error fetching cart", err)
        setitems([]);
        setsubtotal(0);
      }
    }
    setCartLoading(false);
  }

  useEffect(() => {
    loadcart();
  }, [User, isAuthLoading])


  const handleRemove = async (item) => {
    if (User) {
      const productid = item.product._id;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/cart/delete/${productid}`, { credentials: "include", method: "DELETE" })
        if (res.ok) {
          loadcart();
        }
        else {
          console.log("Cannot remove item", res.data.message);
        }
      } catch (err) {
        console.log("Error while deleting the item", err);
      }
    }
    else {
      try {
        const existing = JSON.parse(localStorage.getItem("items")) || [];
        const updated = existing.filter((itemf) => itemf.cartid !== item.cartid);
        localStorage.setItem("items", JSON.stringify(updated));
        loadcart();
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
          loadcart();
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
      try {
        const existing = JSON.parse(localStorage.getItem("items")) || [];
        const updated = existing.map((itemf) =>
          itemf.cartid === item.cartid ? { ...itemf, quantity: itemf.quantity + 1 } : itemf);
        localStorage.setItem("items", JSON.stringify(updated));
        loadcart();
      }
      catch (err) {
        console.log("Error happend while increasing", err)
      }
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
          loadcart();
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
      const existing = JSON.parse(localStorage.getItem("items")) || [];
      const updated = existing
        .map((itemf) =>
          itemf.cartid === item.cartid
            ? { ...itemf, quantity: itemf.quantity > 1 ? itemf.quantity - 1 : 0 }
            : itemf
        )
        .filter((itemf) => itemf.quantity > 0); // remove if qty hits 0

      localStorage.setItem("items", JSON.stringify(updated));
      loadcart();
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
        <Checkout subTotal={subtotal} />
      </div>
    </div>
  )
}

export default Cart;