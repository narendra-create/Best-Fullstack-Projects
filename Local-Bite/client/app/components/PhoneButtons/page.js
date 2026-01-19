import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/app/contexts/AuthContext"


export default function PhoneButtons({ logout }) {
    const [open, setOpen] = useState(false)

    const { User, isLoading, refreshUser } = useAuth();

    if (isLoading) {
        return <div>User Loading....</div>
    }
    return (
        <nav className="bg-gray-900 text-white border-neutral-200 fixed top-0 left-0 w-[99rem] border-b z-50">
            <div className="flex w-[27%] items-center justify-between px-4 py-3">
                {/* Logo */}
                <img
                    src="/Logo-LocalBite.png"
                    alt="LocalBite"
                    className="w-10 rounded-xl"
                />

                {/* Hamburger */}
                <button
                    onClick={() => setOpen(!open)}
                    className="p-2 rounded-md text-white hover:bg-gray-800"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="absolute top-full inset-x-0 w-[27%] bg-gray-900 shadow-lg px-4 pb-4 transition-all ease-in-out duration-200 space-y-4">

                    {!isLoading && User ? <div className="flex gap-2">
                        <Link href="#" onClick={logout} className="w-full text-center py-2 border rounded-lg">
                            Logout
                        </Link>
                    </div> : <div className="flex gap-2">
                        <Link href="/components/Login" className="w-full text-center py-2 border rounded-lg">
                            Login
                        </Link>
                        <Link href="/components/Register" className="w-full text-center py-2 bg-black text-white rounded-lg">
                            Sign Up
                        </Link>
                    </div>}

                    {/* Links */}
                    <div className="space-y-2 text-sm font-medium">
                        <NavItem title="Dashboard" href={"/VendorTools/Dashboard"} />
                        <NavItem title="Manage Items" href={"/VendorTools/ManageProducts"} />
                        <NavItem title="Add items" href={'/VendorTools/Addproducts'} />
                        <NavItem title="Update Status" href={"/VendorTools/CurrentOrders"} />
                        <NavItem title="Settings" href={"#"} />
                        <NavItem title="Support" href={"#"} />
                    </div>
                </div>
            )}
        </nav>
    )
}

function NavItem({ title, danger, href }) {
    return (
        <Link href={href}>
            <div href={href}
                className={`px-4 py-3 rounded-lg cursor-pointer 
      ${danger ? "text-red-500 hover:bg-red-50" : "hover:bg-neutral-100"}`}
            >
                {title}
            </div>
        </Link>
    )
}