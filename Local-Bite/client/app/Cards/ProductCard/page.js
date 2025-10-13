import React from 'react'

const ProductCard = ({ product }) => {

    return (
        // i will change this div into Link tag later
        <div>
            <section className='w-200 bg-white text-black mx-auto rounded-2xl flex h-57 gap-4 transition-all ease-in-out duration-200 hover:scale-102'>
                <img src={product.imageUrl} alt="Food image" className='h-55 self-center ml-1 rounded-xl' />
                <div className='flex flex-col h-full justify-center'>
                    <div className='flex items-center justify-between h-18'>
                        <span className='text-3xl h-4 font-bold'>{product.name}</span>
                        <button className='self-start bg-chili-red px-4 py-2 mr-2 rounded-3xl text-white text-sm font-bold flex gap-1 items-center hover:bg-red-800 transition-all duration-200 focus:ring-2 focus:ring-black ease-in-out'>
                            Add
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#e1d5d5" viewBox="0 0 256 256">
                                <path d="M216,40V224a8,8,0,0,1-16,0V176H152a8,8,0,0,1-8-8,268.75,268.75,0,0,1,7.22-56.88c9.78-40.49,28.32-67.63,53.63-78.47A8,8,0,0,1,216,40Zm-96.11-1.31a8,8,0,1,0-15.78,2.63L111.89,88H88V40a8,8,0,0,0-16,0V88H48.11l7.78-46.68a8,8,0,1,0-15.78-2.63l-8,48A8.17,8.17,0,0,0,32,88a48.07,48.07,0,0,0,40,47.32V224a8,8,0,0,0,16,0V135.32A48.07,48.07,0,0,0,128,88a8.17,8.17,0,0,0-.11-1.31Z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className='flex gap-4 pl-5 self-start h-8 font-sans text-zinc-500'>
                        <span>₹{product.price}</span> | <span>{product.size}</span>
                    </div>
                    <p className='h-29 flex items-center p-3 mr-2 text-gray-500 text-lg'>{product.description}</p>
                </div>
            </section>
        </div >
    )
}

export default ProductCard