"use client"
import React from 'react'
import DrawerLink from '@/app/Providers/DrawerlinkProvider'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, Slide, ToastContainer } from 'react-toastify'

const Drawer = ({ isOpen, onClose }) => {
    const router = useRouter();
    const pathname = usePathname();
    const isHomePage = pathname === '/'
    const [isLoading, setisLoading] = useState(true);
    const [user, setuser] = useState(null)

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/verify`, { credentials: 'include' })
                if (res.ok) {
                    const data = await res.json();
                    setuser(data.user);
                }
                else {
                    console.log("Authentication failed server responded with", res.status)
                    setuser(null)
                }
            } catch (err) {
                console.log("Network error", err)
                setuser(null)
            }
            finally {
                setisLoading(false);
            }
        }
        verifyUser();
    }, [pathname])


    const handleLogout = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/auth/logout`, { credentials: "include" })
            if (res.ok) {
                toast.success('Logout success ✔️', {
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
                    onClose(false)
                    router.push('/')
                }, 2000);
            }
            else {
                toast.error('Unable to Logout ❌', {
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
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        // Close drawer when route changes
        onClose();
    }, [pathname]);

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
        <div>
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
            <div>
                <div
                    className={`fixed top-0 left-0 z-40 h-screen p-4 bg-hero-bg ${isHomePage && isOpen ? "shadow-[0px_4px_16px_rgba(255,255,255,0.2),_0px_8px_24px_rgba(255,255,255,0.15),_0px_16px_56px_rgba(255,255,255,0.1)]" : "shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"} w-64 flex flex-col justify-between transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    {/* Close button */}
                    <button
                        onClick={() => onClose(false)}
                        className="absolute text-xl pr-4 top-4 right-3 text-gray-600"
                    >
                        ✕
                    </button>

                    {/* Drawer top content */}
                    <div>
                        <h5 className="font-semibold uppercase text-2xl text-gray-500 mb-12 ml-2 mt-2">
                            Menu
                        </h5>
                        {user === null && <ul className="space-y-2 text-lg pl-2 text-center text-black">
                            <li className="border-b-2 border-slate-400 pb-4 pt-4 hover:bg-slate-100 hover:text-xl transition-all ease-in-out duration-400 rounded-t-2xl">
                                <DrawerLink href="/">Home</DrawerLink>
                            </li>
                            <li className="border-b-2 border-slate-400 pb-4 pt-4 rounded-t-2xl">
                                <div>User Not Logged in.</div>
                            </li>
                        </ul>}
                        {user && user.role === "vendor" && (
                            <ul className="space-y-2 text-lg pl-2 text-center text-black">
                                <li className="border-b-2 border-slate-400 pb-4 pt-4 hover:bg-slate-100 hover:text-xl transition-all ease-in-out duration-400 rounded-t-2xl">
                                    <DrawerLink href="/">Home</DrawerLink>
                                </li>
                                <li className="border-b-2 border-slate-400 pb-4 pt-4 hover:bg-slate-100 hover:text-xl transition-all ease-in-out duration-400 rounded-t-2xl">
                                    <DrawerLink href="/VendorTools/CurrentOrders">Your Orders</DrawerLink>
                                </li>
                                <li className="border-b-2 border-slate-400 pb-4 pt-4 hover:bg-slate-100 hover:text-xl transition-all ease-in-out duration-400 rounded-t-2xl">
                                    <DrawerLink href="/VendorTools/Addproducts">Add Products</DrawerLink>
                                </li>
                                <li className="border-b-2 border-slate-400 pb-4 pt-4 hover:bg-slate-100 hover:text-xl transition-all ease-in-out duration-400 rounded-t-2xl">
                                    <DrawerLink href="/VendorTools/Dashboard">Dashboard</DrawerLink>
                                </li>
                            </ul>
                        )}
                        {user && user.role === "customer" && (
                            <ul className="space-y-2 text-lg pl-2 text-center text-black">
                                <li className="border-b-2 border-slate-400 pb-4 pt-4 hover:bg-slate-100 hover:text-xl transition-all ease-in-out duration-400 rounded-t-2xl">
                                    <DrawerLink href="/">Home</DrawerLink>
                                </li>
                                <li className="border-b-2 border-slate-400 pb-4 pt-4 hover:bg-slate-100 hover:text-xl transition-all ease-in-out duration-400 rounded-t-2xl">
                                    <DrawerLink href="/CustomerTools/OrderStatus">Current Orders</DrawerLink>
                                </li>
                                <li className="border-b-2 border-slate-400 pb-4 pt-4 hover:bg-slate-100 hover:text-xl transition-all ease-in-out duration-400 rounded-t-2xl">
                                    <DrawerLink href="/CustomerTools/History">Order History</DrawerLink>
                                </li>
                            </ul>
                        )}
                    </div>

                    {/* Drawer bottom logout */}
                    {user ? <div className="border-t-2 border-slate-200 pt-4 text-center">
                        <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all" onClick={handleLogout}>
                            Logout
                        </button>
                    </div> : <div className="border-t-2 border-slate-200 pt-4 text-center">
                        <DrawerLink href={'/components/Register'}>
                            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all">
                                Register
                            </button>
                        </DrawerLink>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Drawer