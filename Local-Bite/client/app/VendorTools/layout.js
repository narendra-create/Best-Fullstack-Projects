"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/page";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast, Slide } from 'react-toastify'
import PhoneButtons from "../components/PhoneButtons/page";
import { useRouter } from "next/navigation";

export default function VendorToolsLayout({ children }) {
    const { User, refreshUser, isLoading } = useAuth();
    const [vendor, setvendor] = useState()

    const router = useRouter();

    const vendorfind = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/vendor/uservendor/true`, { credentials: 'include' })
            if (!res.ok) {
                console.log(res)
                throw new Error("Unable to fetch")
            }
            const data = await res.json();
            setvendor(data.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        vendorfind();
    }, [])
    // useEffect(() => {
    //     console.log(vendor, "this is vendor")
    // }, [vendor])

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
                setTimeout(async () => {
                    onClose(false)
                    await refreshUser();
                    router.refresh();
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

    if (isLoading) {
        return <div>Loading ...</div>
    }

    useEffect(() => {
        if (!User && !isLoading) {
            router.push("/")
        }
    }, [User, isLoading])

    return (
        <div className="md:flex w-full overflow-x-hidden md:w-full">
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
            {/* Sidebar */}
            <div className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white hidden md:block z-40">
                <Sidebar User={User} handlelogout={handleLogout} vendor={vendor} />
            </div>
            <div className="md:hidden block">
                <PhoneButtons logout={handleLogout} />
            </div>

            {/* Page Content */}
            <div className="md:ml-64 md:w-full md:p-6 pt-16">
                {children}
            </div>
        </div>
    );
}
