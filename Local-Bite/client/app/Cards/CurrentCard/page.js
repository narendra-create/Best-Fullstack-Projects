"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';

const VendorProductsCard = ({ theme, Order, dbhandler }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(Order.status);

    const handleaccept = () => {
        dbhandler(Order.orderid, 'ACCEPTED')
    }

    const handleformsubmit = (e) => {
        e.preventDefault();

        if (!selectedStatus || selectedStatus === 'Select Status') {
            alert("Please Select a valid status")
            return;
        }

        dbhandler(Order.orderid, selectedStatus);
        setIsEditing(false);
    }

    const themeStyles = {
        amber: {
            border: 'border-amber-500',
            bg: 'bg-amber-500',
            text: 'text-amber-500',
            hoverBg: 'hover:bg-amber-600',
            focusbg: 'focus:bg-amber-500'
        },
        blue: {
            border: 'border-blue-400',
            bg: 'bg-blue-400',
            text: 'text-blue-400',
            hoverBg: 'hover:bg-blue-500',
            focusbg: 'focus:bg-blue-400'
        },
        green: {
            border: 'border-coriander-green',
            bg: 'bg-coriander-green',
            text: 'text-coriander-green',
            hoverBg: 'hover:bg-green-700',
            focusbg: 'focus:bg-coriander-green'
        },
        red: {
            border: 'border-chili-red',
            bg: 'bg-chili-red',
            text: 'text-chili-red',
            hoverBg: 'hover:bg-chili-red',
            focusbg: 'focus:bg-chili-red'
        },
    };
    const color = themeStyles[theme] || 'blue-400';

    return (
        <div className={`relative md:mx-auto mx-2 w-[96%] md:w-113 rounded-3xl md:border-1 ${color.border} ${color.bg} p-[0.8rem]`}>
            <div className="bg-white rounded-[1rem] text-black p-5">
                <div className='md:w-[60%] w-[90%] mx-2'>
                    <div className='flex flex-col md:mt-1'>
                        <div className='font-semibold text-2xl md:text-3xl'>{Order.orderid}</div>
                        <div className='md:mt-1 pl-1 pb-2 text-md font-sans font-medium'>{Order.user.name}</div>
                    </div>
                    <div className='mt-2 w-[98%] md:h-24 overflow-auto ml-1 text-xl font-serif'>
                        {Order.items && Order.items.map((item) => {
                            return <div key={item._id}>{item.product?.name} x {item.quantity}</div>
                        })}
                    </div>
                </div>
                <div className={`absolute top-8 right-7 text-sm md:text-lg font-medium font-mono border-2 md:w-full max-w-[120px] break-words whitespace-normal ${color.border} px-3 text-center py-1 rounded-xl`}>{Order.status}</div>
                {isEditing === false ? <div className='w-full flex mt-5 md:mt-8'>
                    <button onClick={() => {
                        if (Order.status === 'PENDING') {
                            handleaccept();
                        }
                        else {
                            setIsEditing(true);
                        }
                    }} className={`mx-auto w-[98%] ${color.border} focus:text-white ${color.focusbg} border-3 rounded-2xl hover:text-white ${color.hoverBg} transition-all ease-in-out duration-200 ${color.text} px-4 text-2xl font-normal py-2`}>
                        {Order.status === 'PENDING' ? 'ACCEPT' : "Update Status"}
                    </button>
                </div> : <div className='w-full flex mt-5 md:mt-8'>
                    <form onSubmit={handleformsubmit} className="max-w-sm mx-auto flex gap-7">
                        <select onChange={(e) => setSelectedStatus(e.target.value)} id="statusinput" className="rounded-xl border-gray-400 font-semibold hover:text-gray-500 hover:bg-gray-200 transition-all ease-in-out duration-200 block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
                            <option defaultValue={'Select Status'} value="Select Status">Select Status</option>
                            <option value="PREPARING">Preparing</option>
                            <option value="OUT FOR DELIVERY">Out for delivery</option>
                            <option value="CANCELLED">Cancelled</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                        <div className='flex gap-2'>
                            <button className={`${color.bg} ${color.border} transition-all ease-in-out duration-200 ${color.hoverBg} text-white py-2 px-5 rounded-xl font-semibold`} type="submit">
                                Update
                            </button>
                            <button className={`bg-chili-red border-chili-red border-2 hover:bg-red-800 transition-all ease-in-out duration-200 text-white py-2 px-5 rounded-xl font-semibold`} type='button' onClick={() => setIsEditing(false)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
                }
            </div>
        </div>

    )
}

export default VendorProductsCard;