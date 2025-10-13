"use client"
import React from 'react'
import ProductCard from '@/app/Cards/ProductCard/page'
import { useQuery } from '@tanstack/react-query'

const Products = ({ params }) => {
    const unwrapped = React.use(params);
    const vendorId = unwrapped.vendorId;
    const getproducts = async () => {
        let res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/product/${vendorId}`)
        if (!res.ok) {
            throw new Error("Products fetching error")
        }
        const data = await res.json();
        console.log("api response ", data)
        return data.pro || [];
    }


    const {
        data: products,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["products", vendorId],
        queryFn: getproducts,
        staleTime: 1000 * 60 * 2, // (2 min) refresh time
        cacheTime: 1000 * 60 * 15 // keep cache in memory
    });
    console.log(products)

    if (isLoading) { return <p>Loading Products</p> }
    if (isError) { return <p>Error: {error.message}</p> }

    return (
        <div>
            <div className='flex items-center justify-center font-bold text-4xl bg-poha-cream text-black w-full h-118'>reserved space for vendor restaurent or stall picture
            </div>
            <hr className='bg-black w-full h-1' />
            <div className='text-5xl font-bold text-black ml-12 mt-10 font-sans'>Our Menu-</div>
            <div className='grid grid-cols-2 items-center justify-center gap-y-10 mx-auto mt-44 mb-30 w-422'>
                {products && products.map((product) => {
                    return <ProductCard product={product} key={product._id} />
                })}
            </div>
        </div>
    )
}

export default Products