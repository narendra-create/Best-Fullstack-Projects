import React from 'react'
import ProductCard from '@/app/Cards/ProductCard/page'

const Products = async ({ params }) => {
    const vendorId = await params.vendorId;
    return (
        <div>
            <div className='flex items-center justify-center font-bold text-4xl bg-neutral-300 text-black w-full h-118'>reserved space for vendor restaurent or stall picture
            </div>
            <hr className='bg-black w-full h-1' />
            <div className='text-5xl font-bold text-black ml-12 mt-10 font-sans'>Our Menu-</div>
            <div className='grid grid-cols-2 items-center justify-center gap-y-10 mx-auto mt-44 w-422'>
                {Product.map((product) => {
                    return <ProductCard product={product} key={product.name} />
                })}
            </div>
        </div>
    )
}

export default Products