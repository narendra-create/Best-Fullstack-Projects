"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

const Register = () => {
    const router = useRouter();
    const [role, setrole] = useState("customer")
    const { User, isLoading } = useAuth();

    const handlerole = (e) => {
        setrole(e.target.value)
    }
    const handlesubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formProps.name,
                email: formProps.email,
                password: formProps.password,
                role: formProps.role,
                vendorDetails: {
                    category: formProps.category,
                    imageUrl: formProps.imageUrl,
                    type: formProps.type
                }
            })
        }).then(async res => {
            const data = await res.json();
            if (res.ok) {
                console.log("success")
                toast.success('Account Created✔️ Please log in', {
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
                e.target.reset();
                setTimeout(() => {
                    router.push('/components/Login')
                }, 2000);
            }
            else {
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
            }
        }).catch(err => {
            console.log("Error", err)
        })

    }

    if (isLoading) {
        return <div role="status" className='flex items-center justify-center w-40 mx-auto h-screen'>
            <svg aria-hidden="true" className="inline w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }

    return (
        <div className='w-full h-screen mt-40'>
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

            <div className='absolute -z-10 top-0'> <div className='bg-black h-full w-full absolute'></div><img src={role === "vendor" ? '/vendorbg.jpg' : '/customerbg.jpg'} alt="Background image" className='-z-20 h-full opacity-80 blur-xs transition-all ease-in-out duration-200' /></div>
            {User === null ? <div className='text-white mx-auto w-265 flex items-center justify-center mb-16 text-6xl font-bold'>Register now To take massive orders</div> : <div className='text-white mx-auto w-full flex items-center justify-center mb-16 text-6xl font-bold'>You Are Already Registered</div>}
            {User === null ? <form className="max-w-sm mx-auto" onSubmit={handlesubmit}>
                <div className="mb-5 ">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" id="name" name='name' className="shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" id="email" name='email' className="shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name123@.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password" name='password' className="shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className='mb-5'>
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select User Type</label>
                    <select onChange={handlerole} required id="role" name='role' className="shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="customer">Customer</option>
                        <option value="vendor">Vendor</option>
                    </select>
                </div>
                {role === "vendor" &&
                    <>
                        <div className='mb-5'>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Restaurant Type</label>
                            <select required id="category" name='category' className="shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="default">Select Cuisine</option>
                                <option value="North Indian">North Indian</option>
                                <option value="South Indian">South Indian</option>
                                <option value="East Indian">East Indian</option>
                                <option value="West Indian">West Indian</option>
                                <option value="Northeast Indian">Northeast Indian</option>
                            </select>
                        </div>
                        <div id='type-of-restaurent' className='my-3'>
                            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Restaurant Type</label>
                            <select required id="type" name='type' className="shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="veg" className='text-coriander-green'>🍎 Veg</option>
                                <option value="North Indian" className='text-chili-red'>🥩 Non-Veg</option>
                                <option value="veg/non-veg">🤝 BOTH</option>
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Cover Picture(Url)</label>
                            <input type="text" id="imageUrl" name='imageUrl' className="shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                    </>}

                <button type="submit" className="transition-all ease-in-out duration-200 text-white font-bold bg-chili-red hover:bg-chili-red focus:ring-4 focus:outline-none focus:ring-red-300 font-sans rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:chili-red dark:hover:bg-red-700 dark:focus:ring-red-800">Submit</button>
            </form> : <div className='flex w-full items-center justify-center gap-3'>
                <Link href={'/'} className='bg-chili-red h-16 w-64 rounded-4xl flex items-center justify-center font-bold border-2 border-red-800 text-xl hover:bg-red-900 hover:text-lg transition-all ease-in-out duration-300'>Go To HomePage</Link>
                <Link href={'/VendorTools/Dashboard'} className='bg-chili-red h-16 w-64 rounded-4xl flex items-center justify-center border-2 border-red-800 font-bold text-xl hover:bg-red-900 hover:text-lg transition-all ease-in-out duration-300'>Dashboard</Link>
            </div>}

        </div>
    )
}

export default Register