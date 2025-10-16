"use client"
import React from 'react'

const AddProducts = () => {

    return (
        <div>
            <div id='add-area' className='w-full h-154 bg-black'>
                <h1 id='heading' className='text-4xl font-bold pl-10 pt-10 pb-10'>Add Products Here 👇</h1>
                <div id='addcard' className='flex items-center justify-between px-20'>
                    <div>
                        <h2 id='preheading' className='text-2xl mb-10 font-bold pt-1'>Preview Of Food Card:</h2>
                        <section className='shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white text-black rounded-2xl flex h-57 gap-4 transition-all ease-in-out duration-200 hover:scale-102'>
                            <img src='https://placehold.net/building-600x400.png' alt="Food image" className='shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-55 w-83 self-center ml-1 rounded-xl text-center text-xl font-bold object-cover object-center' />
                            <div className='flex flex-col h-full justify-center'>
                                <div className='flex items-center justify-between h-18'>
                                    <input type='text' placeholder='Name' className='text-3xl h-4 font-bold'></input>
                                </div>
                                <div className='flex gap-4 pl-5 self-start h-8 font-sans text-zinc-500'>
                                    <input type='number' placeholder='Price'></input> | <input type='number' placeholder='Quantity'></input>
                                </div>
                                <input placeholder='Description of item' className='h-29 flex items-center p-3 mr-2 text-gray-500 text-lg'></input>
                            </div>
                        </section>
                    </div>
                    <section className='h-96 w-215'>
                        <form className="max-w-sm mx-auto">
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                                <input type="text" id="name" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-coriander-green focus:border-coriander-green block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-coriander-green dark:focus:border-coriander-green dark:shadow-xs-light" placeholder="CheeseCake" required />
                            </div>
                            <div className="mb-5 flex gap-10">
                                <div>
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                    <input type="number" id="price" name='price' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-coriander-green focus:border-coriander-green block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-coriander-green dark:focus:border-coriander-green dark:shadow-xs-light" required />
                                </div>
                                <div>
                                    <label htmlFor="quantity" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Quantity</label>
                                    <input type="number" id='quantity' name='quantity' className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-coriander-green focus:border-coriander-green block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-coriander-green dark:focus:border-coriander-green dark:shadow-xs-light' />
                                </div>
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="description" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Description</label>
                                <textarea name="description" id="description" placeholder='Define your product' className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-coriander-green focus:border-coriander-green block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-coriander-green dark:focus:border-coriander-green dark:shadow-xs-light'></textarea>
                            </div>
                            <div className='mb-5'>
                                <label htmlFor="type" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Food Type</label>
                                <select required id="type" name='type' className="shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="veg">Veg</option>
                                    <option value="non-veg">Non-Veg</option>
                                </select>
                            </div>
                            <button type="submit" className="text-white font-semibold bg-sev-yellow hover:bg-sev-yellow focus:ring-4 focus:outline-none focus:ring-yellow-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-yellow-700 dark:focus:ring-sev-yellow">Add Product</button>
                        </form>
                    </section>
                </div >
            </div>
            <div id='show-area' className='w-full h-188 overflow-y-auto bg-amber-400'>
                n
            </div>
        </div >
    )
}


export default AddProducts