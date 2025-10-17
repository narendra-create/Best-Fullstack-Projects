"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const Navbar = () => {
    const pathname = usePathname();
    const isRegisterpage = pathname === `/components/Register`;
    const isLoginpage = pathname === `/components/Login`;
    const bgcolor = isRegisterpage || isLoginpage || pathname === '/' ? "white" : "black"

    return (
        <nav className='w-full h-24 absolute z-40 top-0 '>
            <div className='w-full px-10 mx-auto h-24 flex justify-between items-center'>
                <div><Link href={'/components/Register'} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={bgcolor} className="size-10">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg></Link>
                </div>
                {(isLoginpage || isRegisterpage) && (
                    <div>
                        {isLoginpage ? (
                            <Link href={'/components/Register'} id='newuser'>
                                <button className='text-white'>New user?</button>
                            </Link>
                        ) : (
                            <Link href={'/components/Login'} id='Existinguser'>
                                <button className='text-white'>Already Registered?</button>
                            </Link>
                        )}
                    </div>
                )}
                <div><Link href={'/components/Cart'}><svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill={bgcolor} viewBox="0 0 256 256"><path d="M238,82.73A8,8,0,0,0,232,80H187.63L134,18.73a8,8,0,0,0-12,0L68.37,80H24a8,8,0,0,0-7.93,9.06L31.14,202.12A16.06,16.06,0,0,0,47,216H209a16.06,16.06,0,0,0,15.86-13.88L239.93,89.06A8,8,0,0,0,238,82.73ZM81.6,184a7.32,7.32,0,0,1-.81,0,8,8,0,0,1-8-7.2l-5.6-56a8,8,0,0,1,15.92-1.6l5.6,56A8,8,0,0,1,81.6,184Zm54.4-8a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0ZM89.63,80,128,36.15,166.37,80Zm99.13,40.8-5.6,56a8,8,0,0,1-7.95,7.2,7.32,7.32,0,0,1-.81,0,8,8,0,0,1-7.16-8.76l5.6-56a8,8,0,0,1,15.92,1.6Z"></path></svg></Link></div>
            </div>
        </nav>
    )
}

export default Navbar