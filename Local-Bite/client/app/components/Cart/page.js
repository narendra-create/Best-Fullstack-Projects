"use client"
import React, { useEffect, useState } from 'react'
import CartProduct from '@/app/Cards/CartProduct/page'
import Checkout from '@/app/Cards/CheckoutCard/page'
import { useAuth } from '@/app/contexts/AuthContext'
import Script from 'next/script'
import Protect from '@/app/CustomerGuard/page'
import PaymentPage from '@/app/Cards/Payment-page/page'

const Cart = () => {
  const [items, setitems] = useState([])
  const { User, isLoading: isAuthLoading } = useAuth();
  const [subtotal, setsubtotal] = useState(0);
  const [CartLoading, setCartLoading] = useState(true);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [instructions, setinstructions] = useState("");
  const [vendordb, setvendordb] = useState()
  const [methodclick, setmethodclick] = useState(false)
  const [checkoutloading, setcheckoutloading] = useState(true)


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
        setvendordb(data.data.vendor)
      }
      catch (err) {
        console.log("Error while getting cart", err)
        setitems([])
      }
    }
    else {
      const localData = JSON.parse(localStorage.getItem("items")) || [];
      let localitems = Array.isArray(localData) ? localData : [localData];
      // console.log(localitems)
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
        // console.log(res)
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

  const clearcart = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/cart/clear`, {
        credentials: 'include',
        method: 'DELETE'
      })
      if (!res.ok) {
        throw new Error("Cannot Clear the cart")
        return;
      }
      const data = await res.json();
      // console.log(data, "This is clear cart data")
      setitems(data.data)
    }
    catch (err) {
      console.log(err, "Error in clearcart")
    }
  }

  useEffect(() => {
    loadcart();
  }, [User, isAuthLoading])

  // useEffect(() => {
  //   // console.log(items, "This is items")
  //   // console.log(User, "This is User")
  //   // console.log(grandTotal, "This is grandtotal")
  // }, [items])

  const handlechange = (e) => {
    setinstructions(e.target.value)
  }


  const handleRemove = async (item) => {
    if (User) {
      const productid = item.product._id;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/cart/delete/${productid}`, { credentials: "include", method: "DELETE" })
        if (res.ok) {
          const data = await res.json();
          // console.log("remove data", data)
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
          const data = await res.json();
          // console.log("plus data", data)
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
          const data = await res.json();
          // console.log("minus data", data)
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

  const handleCheckout = async () => {
    if (!User) {
      alert("Please Log in first ❌")
      //redirect to login page here
      return;
    }
    if (items.length === 0 || !vendordb || !vendordb._id) {
      console.log(items, vendordb)
      alert("Your cart is empty or vendor missing")
      return;
    }
    try {
      const placeorderres = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/order/place`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vendor: vendordb._id,
          items: items,
          instructions: instructions
        })
      })
      if (!placeorderres.ok) {
        // console.log(placeorderres)
        throw new Error("Failed to Create Order")
      }
      const data = await placeorderres.json();
      console.log(data)
      const { razorpayKeyId, orderId, razorpayorder } = data;

      const options = {
        key: razorpayKeyId,
        amount: razorpayorder.amount,
        currency: 'INR',
        name: 'Local-Bite',
        description: 'Food Order Payment',
        order_id: razorpayorder.id,

        handler: async function (response) {
          try {
            const verificationData = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              db_order_id: orderId
            };

            const verifyres = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/payment/verify-payment`, {
              credentials: 'include',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(verificationData)
            })
            if (!verifyres.ok) {
              // console.log(verifyres)
              throw new Error("Payment Verification Failed")
            }
            const verifyresult = await verifyres.json();

            if (verifyresult.success) {
              setCartLoading(true)
              clearcart();
              //for redirecting into success page
              window.location.href = `/Status/order-success/${verifyresult.orderid}`;
              loadcart();
            }
            else {
              setCartLoading(true)
              window.location.href = `/Status/order-failure`;
              setTimeout(() => {
                setCartLoading(false)
              }, 1000);
            }
          }
          catch (err) {
            console.log("Error in handlecheckout", err)
            alert("Payment verification failed")
          }
        },
        prefill: {
          email: User.email
        },
        theme: {
          color: "#F37254"
        }
      }
      const rzp = new window.Razorpay(options);
      rzp.open();
    }
    catch (error) {
      console.error("Order creation failed:", error.response?.data || error.message || error);
      // console.log(items, placeorderres.json, data)
      alert(`Error creating order. Please try again.`);
    }
  }

  const handlecashpayment = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/order/place-cash`, {
      credentials: "include"
      , method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
      , body: JSON.stringify({
        vendor: vendordb._id,
        items: items,
        instructions: instructions
      })
    })

    if (res.ok) {
      const { orderId } = await res.json();
      setCartLoading(true)
      clearcart();
      window.location.href = `/Status/order-success/${orderId}`;
      loadcart();
    }
    else {
      setCartLoading(true)
      window.location.href = `/Status/order-failure`
      setTimeout(() => {
        setCartLoading(false)
      }, 1000);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setcheckoutloading(false)
    }, 2000);
  }, [methodclick])


  if (CartLoading || isAuthLoading) {
    return <div className='text-black text-center mt-48 text-3xl w-full'>Loading Cart...</div>
  }

  return (
    <Protect>
      <div className='flex md:flex-row flex-col text-black md:w-[80%] h-full mt-24 w-full md:px-0 md:mx-auto'>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
        <div className='md:w-[70%] w-full  flex flex-col p-5'>
          <h4 className='font-extrabold font-sans text-4xl'>Your Cart</h4>
          <div className='mt-10 w-full h-[54%] overflow-auto'>
            {items && items.length > 0 ? items.map((item, i) => {
              const key = User ? item._id : item.cartid
              return <CartProduct key={key ? key : item.cartid} items={item} vendor={vendordb?.name ?? ''} handleremove={handleRemove} plus={plus} minus={minus} />
            }) : <div className='text-black'>Your cart is empty</div>}
          </div>
          <div className='md:mx-12.5 mx-3 rounded-2xl gap-1 flex items-center justify-between px-2 py-2 mt-5 border-1 border-gray-100 bg-gray-50'>
            <input type="text" id='coupon' name='coupon' placeholder='Coupon code' className='pl-5 md:py-0 py-3.5 md:w-113 h-full focus:outline-1 outline-gray-400 bg-gray-50 rounded-lg' />
            <button className='bg-sev-yellow py-3 transition-all ease-in-out duration-150 hover:bg-yellow-700 hover:text-gray-100 px-3 rounded-xl text-gray-900 font-semibold focus:outline-1 outline-gray-400'>Apply</button>
          </div>
          <div className='flex flex-col md:mx-12 mt-5'>
            <label htmlFor="instructions" className='font-semibold mb-3 text-xl'>Special instructions for Restaurant</label>
            <textarea onChange={e => handlechange(e)} placeholder='type here (max 320)' name="instructions" id="instructions" maxLength={320} className='text-md md:text-lg font-serif w-95 md:w-154 py-2 px-5 h-44 bg-gray-50 border-1 border-gray-100 resize-none rounded-lg ml-1 break-words whitespace-normal' />
          </div>
        </div>
        {methodclick ? <div className='md:w-[30%] w-[100%] p-5'>
          <h3 className='md:mb-12 mb-6 font-extrabold text-3xl md:text-4xl'>Choose Payment Method</h3>
          <PaymentPage loading={checkoutloading} totalamount={grandTotal} handlepayment={handleCheckout} handleback={() => {
            setmethodclick(false)
          }} handlecod={handlecashpayment} />
        </div> : <div className='md:w-[30%] w-[100%] p-5'>
          <h3 className='md:mb-12 mb-6 font-extrabold text-3xl md:text-4xl'>Order Summary</h3>
          <Checkout loading={checkoutloading} isCartEmpty={items.length === 0} subTotal={subtotal} deliverycharge={deliveryCharge} methodclick={() => {
            setmethodclick(true)
          }} grandtotal={grandTotal} discount={discount} platformfee={platformFee} />
        </div>}
      </div>
    </Protect>
  )
}

export default Cart;