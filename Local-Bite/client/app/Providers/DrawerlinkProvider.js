"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DrawerLink({ href, children, onClick }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`block text-center py-4 rounded-2xl transition-all duration-300 ${isActive
                    ? "bg-blue-700 text-white font-semibold text-lg shadow-md"
                    : "text-gray-700"
                }`}
        >
            {children}
        </Link>
    );
}
