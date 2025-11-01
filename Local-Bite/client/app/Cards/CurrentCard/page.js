import React from 'react'

const CurrentProducts = () => {
    return (
        <div className="relative mx-auto w-113 rounded-3xl border-1 border-blue-400 bg-blue-400 p-[0.8rem]">
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
                    <button className='border-blue-400 border-3 rounded-2xl hover:text-white hover:bg-blue-400 transition-all ease-in-out duration-200 text-blue-400 px-4 text-xl font-normal py-2'>
                        Update Status
                    </button>
                    <button className='border-blue-400 border-3 rounded-2xl hover:text-white hover:bg-blue-400 transition-all ease-in-out duration-200 text-blue-400 px-4 text-xl font-normal py-2'>
                        Ready ?
                    </button>
                </div>
            </div>
        </div>

    )
}

export default CurrentProducts