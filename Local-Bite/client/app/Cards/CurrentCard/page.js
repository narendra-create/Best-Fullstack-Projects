import React from 'react'

const VendorProductsCard = ({ theme }) => {

    const themeStyles = {
        amber: {
            border: 'border-amber-500',
            bg: 'bg-amber-500',
            text: 'text-amber-500',
            hoverBg: 'hover:bg-amber-500',
        },
        blue: {
            border: 'border-blue-400',
            bg: 'bg-blue-400',
            text: 'text-blue-400',
            hoverBg: 'hover:bg-blue-400',
        },
        green: {
            border: 'border-coriander-green',
            bg: 'bg-coriander-green',
            text: 'text-coriander-green',
            hoverBg: 'hover:bg-coriander-green',
        },
        red: {
            border: 'border-chili-red',
            bg: 'bg-chili-red',
            text: 'text-chili-red',
            hoverBg: 'hover:bg-chili-red',
        },
    };
    const color = themeStyles[theme] || 'blue-400';

    return (
        <div className={`relative mx-auto w-113 rounded-3xl border-1 ${color.border} ${color.bg} p-[0.8rem]`}>
            <div className="bg-white rounded-[1rem] text-black p-5">
                <div className='w-[60%] mx-2'>
                    <div className='flex flex-col mt-1'>
                        <div className='font-semibold text-4xl'>order and</div>
                        <div className='mt-1 pl-1 text-md font-sans font-medium'>customer name</div>
                    </div>
                    <div className='mt-2 ml-1 text-xl font-serif'>quantity x name</div>
                </div>
                <div className='absolute top-8 right-7 font-medium font-mono'>Preparing</div>
                <div className='w-full justify-between px-2 items-center flex mt-8'>
                    <button className={`${color.border} border-3 rounded-2xl hover:text-white ${color.hoverBg} transition-all ease-in-out duration-200 ${color.text} px-4 text-xl font-normal py-2`}>
                        Update Status
                    </button>
                    <button className={`${color.border} border-3 rounded-2xl hover:text-white ${color.hoverBg} transition-all ease-in-out duration-200 ${color.text} px-4 text-xl font-normal py-2`}>
                        Ready ?
                    </button>
                </div>
            </div>
        </div>

    )
}

export default VendorProductsCard;