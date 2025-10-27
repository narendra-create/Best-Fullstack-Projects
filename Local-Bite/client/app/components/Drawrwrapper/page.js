"use client"
import React from 'react'
import Navbar from '../Navbar/page'
import Drawer from '@/app/Cards/Drawer/page'
import { useState } from 'react'

const Drawrwrapper = () => {
    const [isDrawerOpen, setisDrawerOpen] = useState(false)

    return (
        <>
            <Navbar toggleDrawer={() => setisDrawerOpen(!isDrawerOpen)} />
            <Drawer isOpen={isDrawerOpen} onClose={() => setisDrawerOpen(false)} />
        </>
    )
}

export default Drawrwrapper