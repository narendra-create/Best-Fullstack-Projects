import React from 'react'

const VendorProductsCard = ({ theme }) => {

    const themeStyles = {
        amber: {
            border: 'border-amber-500',
            bg: 'bg-amber-500',
            text: 'text-amber-500',
            hoverBg: 'hover:bg-amber-500',
            focusbg: 'focus:bg-amber-500'
        },
        blue: {
            border: 'border-blue-400',
            bg: 'bg-blue-400',
            text: 'text-blue-400',
            hoverBg: 'hover:bg-blue-400',
            focusbg: 'focus:bg-blue-400'
        },
        green: {
            border: 'border-coriander-green',
            bg: 'bg-coriander-green',
            text: 'text-coriander-green',
            hoverBg: 'hover:bg-coriander-green',
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
                        <div className='font-semibold text-2xl md:text-4xl'>order and</div>
                        <div className='md:mt-1 pl-1 text-md font-sans font-medium'>customer name</div>
                    </div>
                    <div className='mt-2 w-[98%] ml-1 text-xl font-serif'>quantity x name
                        quantity x name
                        quantity x name
                        quantity x name
                        quantity x name
                        quantity x name
                    </div>
                </div>
                <div className={`absolute top-8 right-7 text-sm md:text-lg font-medium font-mono border-2 ${color.border} px-3 py-1 rounded-xl`}>Preparing</div>
                <div className='w-full flex mt-5 md:mt-8'>
                    <button className={`mx-auto w-[98%] ${color.border} focus:text-white ${color.focusbg} border-3 rounded-2xl hover:text-white ${color.hoverBg} transition-all ease-in-out duration-200 ${color.text} px-4 text-2xl font-normal py-2`}>
                        Mark Preparing
                    </button>
                </div>
            </div>
        </div>

    )
}

export default VendorProductsCard;