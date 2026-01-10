import React from 'react'
import Link from 'next/link'
import { Star } from 'lucide-react'

const VendorCard = ({ vendor }) => {
    return (
        <Link href={`/Products/${vendor._id}`}>
            <section className='transition-all ease-in-out duration-150 hover:scale-102 cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden mx-auto w-96 h-65 md:h-72 text-black bg-white rounded-3xl'>
                <img className='text-center text-xl font-bold object-cover object-center h-45 md:h-52 w-full' src={vendor.imageUrl || "https://placehold.net/building-600x400.png"} alt={vendor.name} />
                <div className='flex w-full h-20 justify-between px-3 pt-2'>
                    <div className='flex flex-col w-68'>
                        <div className='text-2xl md:text-3xl font-bold truncate'>{vendor.name}</div>
                        <div className='text-zinc-800 pl-1'>{vendor.type} <span>|</span> {vendor.category}</div>
                    </div>
                    <div className='text-white text-lg px-2 py-1 bg-chili-red mt-2 font-semibold w-20 h-9 flex gap-1 items-center justify-center rounded-2xl'>{vendor.averagerating && <Star fill='white' size={18} />}{vendor.averagerating ? vendor.averagerating : "NEW"}
                    </div>
                </div>
            </section>
        </Link>
    )
}

export default VendorCard