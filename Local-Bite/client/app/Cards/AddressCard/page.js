import React from 'react'

const AddressCard = ({ updateaddress, removeaddress, adress, username, makedefault }) => {

    //  label: String,    // "Home"
    //     street: String,
    //     city: String,
    //     state: String,
    //     pincode: String,
    //     landmark: String,
    //     phone: String,
    //     isDefault: Boolean
    return (
        <section className='bg-white hover:shadow-[0px_0px_6px_0px_rgba(0,0,0,0.2)] transition-all ease-in-out duration-150 hover:scale-101 shadow-[0px_0px_10px_-6px_rgba(0,0,0,0.35)] flex flex-col border border-gray-300 rounded-t-xl pt-5'>
            <div className='flex flex-col px-5 pb-4'>
                <div className='text-xl md:text-2xl font-semibold mb-2'>{adress?.label} {adress?.isDefault === true && "(Default)"}</div>
                <div>
                    <div className={`text-md ${username?.length === 0 && "hidden"}`}>{username && username}</div>
                    <div className='text-md'>{adress?.pincode}, {adress?.city}, {adress?.landmark}</div>
                    <div className='text-md'>{adress?.state}, India</div>
                    <div className='text-md'>{adress?.phone}</div>
                </div>
            </div>
            <div className='h-12 md:h-16 w-full flex items-center bg-gray-200'>
                <button onClick={() => updateaddress("updateaddress", adress._id)} className='w-[32%] cursor-pointer h-[65%] md:h-[68%] text-md md:text-lg font-sans hover:text-blue-900 hover:font-semibold hover:scale-102 transition-all ease-in-out duration-150 text-blue-700'>Edit</button>
                <button onClick={() => {
                    if (adress?.isDefault) {
                        alert("You Can't remove default address")
                    } else {
                        removeaddress(adress?._id)
                    }
                }} className='w-[32%] cursor-pointer h-[65%] md:h-[68%] text-md md:text-lg font-sans hover:text-rose-900 hover:font-semibold hover:scale-102 transition-all ease-in-out duration-150 border-x border-gray-400 text-rose-700'>Delete</button>
                <button onClick={() => {
                    if (adress?.isDefault) {
                        alert("Already Default")
                    } else {
                        makedefault(adress?._id)
                    }
                }} className='w-[36%] cursor-pointer h-[65%] md:h-[68%] text-md md:text-lg font-sans hover:text-shadow-md hover:font-semibold hover:scale-102 transition-all ease-in-out duration-150'>{adress?.isDefault ? "Default Address" : "Set Default"}</button>
            </div>
        </section>
    )
}

export default AddressCard;