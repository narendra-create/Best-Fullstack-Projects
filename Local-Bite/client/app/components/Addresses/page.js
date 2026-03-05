"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import AddressCard from '@/app/Cards/AddressCard/page.js';
import AddressPopup from '@/components/ui/AddressPopup/page.js';
import { ArrowLeft, Plus } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext.js';
import { ToastContainer, toast, Slide } from 'react-toastify';

const MyAddresses = () => {
    //states
    const [adding, setadding] = useState(false);
    const [Addresses, setAddresses] = useState();
    const [pageloading, setpageloading] = useState(true);
    //Outside data
    const { User, isLoading } = useAuth();
    //functions

    const fetchaddresses = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/auth/showaddress`, { credentials: "include" })
            if (!res.ok) {
                toast.error(`${data.message}`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide,
                });
                return;
            }
            else {
                const { Addresses } = await res.json();
                setAddresses(Addresses);
                setpageloading(false);
            }
        }
        catch (err) {
            console.log(err)
            throw new Error("Can't fetch addresses")
        }
    }

    const handleupdateaddress = async (updateddata, addressid) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/auth/updateaddress`, {
                credentials: "include",
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    addressid: addressid,
                    updateddata: updateddata
                })
            })
            if (!res.ok) {
                toast.error(`${data.message}`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide,
                });
                return;
            }
            else {
                //refresh the page
                toast.success('Update successfull✔️', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide,
                });

                setTimeout(() => {
                    setpageloading(true);
                    fetchaddresses();
                }, 1500);
            }
        }
        catch (err) {
            console.log(err)
            throw new Error("Some error while updating address")
        }
    }

    const handleremoveaddress = async (addressid) => {
        try {

        }
        catch (err) {
            console.log(err)
            throw new Error("Some Error occured in remove address")
        }
    }

    const handlesubmitaddress = async (addressobject) => {
        console.log(addressobject)
        if (!object) throw new Error("Please Fill the form and click submit");
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/auth/addaddress`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                address: addressobject
            })
        })

        if (!res.ok) {
            const data = await res.json();
            toast.error(`${data.message}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
            return;
        }
        else {
            toast.success('successfully Added✔️', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
        }
    }
    //useeffects

    useEffect(() => {
        fetchaddresses();
    }, [])
    //Page code
    if (isLoading && pageloading) {
        return <div role="status" className='flex items-center justify-center w-40 mx-auto h-screen'>
            <svg aria-hidden="true" className="inline w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }

    if (!isLoading && User) return <div>Please Log in first...</div>

    const demo = [1, 2, 3, 4, 5]
    return (
        <div className='w-full min-h-screen bg-gray-100'>
            <ToastContainer position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide} />

            <div className='cursor-text shadow-[0px_0px_55px_-50px_#000000] w-full py-1 h-18 md:h-24 mt-22 flex items-center gap-14 md:gap-0 border-y border-gray-400 bg-white'>
                <button className='pl-5 md:pl-12'>
                    <ArrowLeft />
                </button>
                <span className='text-center md:text-right md:pr-[26%] font-mono self-center w-[52%] md:w-[82%] text-xl md:text-4xl font-semibold'>Manage-Addresses</span>
                <button onClick={() => setadding(true)} className='hover:font-bold hover:scale-98 hover:text-shadow-md transition-all ease-in-out duration-150 hover:inset-shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.2)] md:flex hidden gap-2 px-6 items-center justify-center py-3 rounded-lg text-lg bg-trust text-white'>
                    <span className='text-center align-middle'><Plus /></span><span className='font-semibold'>Add New Address</span>
                </button>
            </div>
            <button onClick={() => setadding(true)} className='bg-white md:hidden shadow-[0px_0px_10px_-6px_rgba(0,0,0,0.35)] flex justify-center gap-8 w-[96%] mx-auto text-xl items-center h-14 rounded-lg border border-gray-400 my-2'>
                <span className='text-center align-middle'><Plus /></span><span className='font-semibold'>Add New Address</span>
            </button>
            <div className='px-5 flex flex-col md:grid grid-cols-3 md:gap-4 md:px-16'>
                {demo && demo.map((single) => {
                    return <div key={single} className='my-5'>
                        <AddressCard updateaddress={handlesubmitaddress} removeaddress={handleremoveaddress} makedefault={handledefault} />
                    </div>
                })}
            </div>
            <AddressPopup isOpen={adding} onClose={() => setadding(false)} onSubmit={handlesubmitaddress} />
        </div>
    )
}

export default MyAddresses;