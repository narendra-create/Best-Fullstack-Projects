"use client"
import React from 'react'
import { v4 as uuid } from 'uuid'
import { useAuth } from '@/app/contexts/AuthContext'

const ProductCard = ({ product }) => {
    //hooks
    const { User, isLoading } = useAuth();
    //functions

    const handleLocal = () => {
        try {
            const existing = JSON.parse(localStorage.getItem("items")) || [];
            const itemsArray = Array.isArray(existing) ? existing : [existing];

            const existingItem = itemsArray.find(
                (item) => item.productid === product._id
            );

            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
                console.log("qty increased")
            }
            else {
                const newItem = {
                    productid: product._id,
                    cartid: uuid(),
                    quantity: 1,             
                };
                itemsArray.push(newItem);
                console.log(`🆕 Added new product: ${product.name}`);
            }

            localStorage.setItem("items", JSON.stringify(itemsArray))
            console.log("added successfully", JSON.stringify(product))
        }
        catch (err) {
            console.log("error", err)
        }
    }

    const handleDbCart = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/cart/add`, {
            credentials: "include",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productid: product._id,
                quantity: 1
            })
        }).then(async res => {
            if (res.ok) {
                console.log("SUCCESS ✔️")
            }
            else {
                console.log("Error in server response of adding product")
            }
        }).catch(err => {
            console.log("Error while fetching", err)
        })
    }

    const handleadd = () => {
        if (isLoading) return;
        if (User) {
            handleDbCart();
        } else {
            handleLocal();
        }
    }

    //main page
    return (
        // i will change this div into Link tag later
        <div>
            <section className='relative shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:w-200 mx-2 w-[24.5rem] bg-white text-black md:mx-auto rounded-2xl flex flex-col md:flex-row md:h-57 md:gap-4 transition-all ease-in-out duration-200 hover:scale-102'>
                <img src={product.imageUrl || '/food-placeholder.jpeg'} alt="Food image" className='shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-55 md:w-83 w-[24rem] self-center md:ml-1 rounded-xl text-center text-xl font-bold object-cover object-center' />
                <div className='flex flex-col h-full justify-center'>
                    <div className='flex md:pl-0 pl-4 items-center justify-between h-18'>
                        <span className='md:text-3xl text-2xl h-4 font-bold first-letter:uppercase'>{product.name}</span>
                        <button onClick={handleadd} className='cursor-pointer absolute right-0 top-2.5 self-start bg-chili-red px-4 py-2 mr-2 rounded-3xl text-white text-sm font-bold flex gap-1 items-center hover:bg-red-800 transition-all duration-200 focus:ring-2 focus:ring-black ease-in-out'>
                            Add
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#e1d5d5" viewBox="0 0 256 256">
                                <path d="M216,40V224a8,8,0,0,1-16,0V176H152a8,8,0,0,1-8-8,268.75,268.75,0,0,1,7.22-56.88c9.78-40.49,28.32-67.63,53.63-78.47A8,8,0,0,1,216,40Zm-96.11-1.31a8,8,0,1,0-15.78,2.63L111.89,88H88V40a8,8,0,0,0-16,0V88H48.11l7.78-46.68a8,8,0,1,0-15.78-2.63l-8,48A8.17,8.17,0,0,0,32,88a48.07,48.07,0,0,0,40,47.32V224a8,8,0,0,0,16,0V135.32A48.07,48.07,0,0,0,128,88a8.17,8.17,0,0,0-.11-1.31Z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className='flex pl-4 md:pt-2.5 gap-4 md:pl-1 self-start h-8 font-sans text-zinc-500'>
                        <span>₹{product.price}</span> | <span>{product.quantity}</span>
                    </div>
                    <p className='h-full flex items-center md:p-3 px-5 pb-5 mr-2 text-gray-500 md:text-lg text-md w-[90%]'>{product.description}</p>
                </div>
            </section>
        </div >
    )
}

export default ProductCard