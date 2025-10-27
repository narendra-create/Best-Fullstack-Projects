"use client"
import React from 'react'
import DrawerLink from '@/app/Providers/DrawerlinkProvider'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { toast, Slide, ToastContainer } from 'react-toastify'

const Drawer = ({ isOpen, onClose }) => {
    const pathname = usePathname();
    const isHomePage = pathname === '/'

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
                        <ul className="space-y-2 text-lg pl-2 text-center text-black">
                            <li className="border-b-2 border-slate-400 pb-4 pt-4 hover:bg-slate-100 hover:text-xl transition-all ease-in-out duration-400 rounded-t-2xl">
                                <DrawerLink href="/">Home</DrawerLink>
                            </li>
                            <li className="border-b-2 border-slate-400 pb-4 pt-4 hover:bg-slate-100 hover:text-xl transition-all ease-in-out duration-400 rounded-t-2xl">
                                <DrawerLink href="#">Your Orders</DrawerLink>
                            </li>
                            <li className="border-b-2 border-slate-400 pb-4 pt-4 hover:bg-slate-100 hover:text-xl transition-all ease-in-out duration-400 rounded-t-2xl">
                                <DrawerLink href="/VendorTools/Addproducts">Add Products</DrawerLink>
                            </li>
                            <li className="border-b-2 border-slate-400 pb-4 pt-4 hover:bg-slate-100 hover:text-xl transition-all ease-in-out duration-400 rounded-t-2xl">
                                <DrawerLink href="/VendorTools/Dashboard">Dashboard</DrawerLink>
                            </li>
                        </ul>
                    </div>

                    {/* Drawer bottom logout */}
                    <div className="border-t-2 border-slate-200 pt-4 text-center">
                        <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Drawer