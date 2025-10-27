"use client"
import React, { useEffect } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify'
import { useState } from "react"
import { useQuery } from '@tanstack/react-query'
import ProductCard from '@/app/Cards/ProductCard/page'

const AddProducts = () => {
    const [Currentfields, setCurrentfields] = useState({ name: "", quantity: 0, price: 0, description: "", type: "" })
    const [CurrentimgUrl, setCurrentimgUrl] = useState("")
    const [InputImage, setInputImage] = useState("")


    const getVendorData = async () => {
        try {
            let res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/vendor/user`, { credentials: 'include' })
            if (!res.ok) {
                throw new Error("Problem in fetching")
            }
            const data = await res.json();
            console.log("coming from vendordata", data.vendor, "And the data =", data);
            return data.vendor;
        }
        catch (err) {
            console.log(err)
        }
    }

    const getVendorProducts = async (vendorId) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/product/${vendorId}`);
        if (!res.ok) throw new Error("Fetch failed")
        const data = await res.json();
        return data.pro;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "name" && value.length > 49) return; // prevent extra chars
        if (name === "description" && value.length > 180) return;
        setCurrentfields({
            ...Currentfields,
            [name]: name === "price" ? Number(value) : value,
        });
    };

    const handleimage = (e) => {
        setInputImage(e.target.value);
    }

    const imageclick = () => {
        setCurrentimgUrl(InputImage);
    }

    const addFood = async (e, vendorId) => {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/product/${vendorId}`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: Currentfields.name,
                type: Currentfields.type,
                imageUrl: CurrentimgUrl,
                price: Currentfields.price,
                quantity: Currentfields.quantity,
                description: Currentfields.description
            })
        }).then(async res => {
            const data = await res.json();
            if (res.ok) {
                console.log("success")
                toast.success('Added ✔️', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide,
                });

            }
            else {
                toast.error(`${data.message}`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide,
                });
            }
        }).catch(err => {
            console.log("Error", err)
        })
    }

    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ["vendor"],
        queryFn: getVendorData,
    });

    const { data: products, isLoading: productsLoading } = useQuery({
        queryKey: ["vendorProducts", user?.user], // depends on user
        queryFn: () => getVendorProducts(user?.user),
        enabled: !!user, // only run after user is fetched
    });

    useEffect(() => {
        console.log(user)
        console.log(products)
    }, [products])


    if (userLoading) {
        return <div role="status" className='flex items-center justify-center w-40 mx-auto h-screen'>
            <svg aria-hidden="true" className="inline w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }

    return (
        <div className='mt-38'>
            <ToastContainer position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide} />

            <div id='add-area' className='w-464 h-154 text-black bg-zinc-100 mx-auto rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.18)]'>
                <h1 id='heading' className='text-4xl font-bold pl-10 pt-10 pb-10'>Add Products Here 👇</h1>
                <div id='addcard' className='flex items-center justify-between px-20'>
                    <div>
                        <h2 id='preheading' className='text-2xl mb-10 font-bold pt-1'>Preview Of Food Card:</h2>
                        <section className='shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-200 bg-white text-black mx-auto rounded-2xl flex h-57 gap-4 transition-all ease-in-out duration-200 hover:scale-102'>
                            <img src={CurrentimgUrl || "/food-placeholder.jpeg"} alt="Food image" className='shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-55 w-83 self-center ml-1 rounded-xl text-center text-xl font-bold object-cover object-center' />
                            <div className='flex flex-col h-full justify-center'>
                                <div className='flex items-center justify-between h-18 w-109 mb-2 overflow-hidden break-all whitespace-normal'>
                                    <span className="mb-2 h-4 text-3xl font-bold pt-0" maxLength={49}>{Currentfields.name}</span>
                                </div>
                                <div className='flex gap-4 pl-5 self-start h-8 font-sans text-zinc-500'>
                                    <span>₹{Currentfields.price}</span> | <span className='w-88 overflow-hidden'>{Currentfields.quantity}</span>
                                </div>
                                <p className="p-3 mr-2 text-gray-500 text-lg w-109 overflow-hidden h-24 mb-3 break-all whitespace-normal block">
                                    {Currentfields.description}
                                </p>
                            </div>
                        </section>
                        <div className='my-5 flex gap-5'>
                            <div className='w-157'>
                                <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Food Image URL</label>
                                <input type="text" required onChange={handleimage} id="imageUrl" name='imageUrl' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-coriander-green focus:border-coriander-green block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-coriander-green dark:focus:border-coriander-green dark:shadow-xs-light" placeholder='https://' />
                            </div>
                            <button onClick={imageclick} className='self-end hover:scale-103 transition-all ease-in-out duration-200 font-semibold text-white bg-chili-red rounded-full h-12 w-38 text-sm'>Preview Image</button>
                        </div>
                    </div>
                    {/* the add section */}
                    <section className='h-96 w-215'>
                        <form className="max-w-sm mx-auto" onSubmit={(e) => addFood(e, user.user)}>
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Product Name</label>
                                <input required type="text" onChange={handleChange} id="name" name='name' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-coriander-green focus:border-coriander-green block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-coriander-green dark:focus:border-coriander-green dark:shadow-xs-light" placeholder="CheeseCake" />
                            </div>
                            <div className="mb-5 flex gap-10">
                                <div>
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Price</label>
                                    <input required type="number" onChange={handleChange} id="price" name='price' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-coriander-green focus:border-coriander-green block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-coriander-green dark:focus:border-coriander-green dark:shadow-xs-light" />
                                </div>
                                <div>
                                    <label htmlFor="quantity" className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Quantity</label>
                                    <input required type="text" onChange={handleChange} placeholder='eg.1 Plate or 200gm' id='quantity' name='quantity' className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-coriander-green focus:border-coriander-green block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-coriander-green dark:focus:border-coriander-green dark:shadow-xs-light' />
                                </div>
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="description" className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>Description</label>
                                <textarea required name="description" onChange={handleChange} id="description" placeholder='Define your product' className='break-words whitespace-normal shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-coriander-green focus:border-coriander-green block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-coriander-green dark:focus:border-coriander-green dark:shadow-xs-light'></textarea>
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="type" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Food Type</label>
                                <select required id="type" name='type' onChange={handleChange} className="shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Select-Food-Type</option>
                                    <option value="veg">Veg</option>
                                    <option value="non-veg">Non-Veg</option>
                                </select>
                            </div>
                            <button type="submit" className="text-white font-semibold bg-sev-yellow hover:bg-sev-yellow focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-yellow-700 dark:focus:ring-sev-yellow">Add Product</button>
                        </form>
                    </section>
                </div >
            </div>
            <div id='show-area' className='w-full h-188 overflow-y-auto'>
                <div className='font-bold text-4xl font-sans border-b-3 border-black pb-8 text-black mx-auto mt-20 mb-20 w-full text-center'>Your Restaurent foods</div>
                <div className='grid grid-cols-2 items-center justify-center gap-y-10 mx-auto mb-30 w-422'>
                    {products ? products.map((products, key) => {
                        return <ProductCard key={key} product={products} />
                    }) : <div>No products Available</div>}
                </div>
            </div>
        </div >
    )
}


export default AddProducts