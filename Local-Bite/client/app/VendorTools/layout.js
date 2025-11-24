"use client";
import Sidebar from "../components/Sidebar/page";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast, Slide } from 'react-toastify'

export default function VendorToolsLayout({ children }) {
    const { User, refreshUser, isLoading } = useAuth();

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
                    refreshUser();
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

    if (!User && !isLoading) {
        return <div>Please Log in First</div>
    }

    return (
        <div className="flex">
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
            <div className="w-68 bg-gray-900 text-white fixed left-0">
                <Sidebar User={User} handlelogout={handleLogout} />
            </div>

            {/* Page Content */}
            <div className="ml-64 w-full p-6">
                {children}
            </div>
        </div>
    );
}
