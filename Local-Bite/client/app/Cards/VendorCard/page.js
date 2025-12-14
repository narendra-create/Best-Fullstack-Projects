import React from 'react'
import Link from 'next/link'

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
                    <div className='text-white text-sm px-2 py-1 bg-chili-red mt-2 font-semibold w-20 h-9 flex gap-1 items-center justify-center rounded-2xl'>₹150
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                        </svg>
                    </div>
                </div>
            </section>
        </Link>
    )
}

export default VendorCard