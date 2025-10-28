"use client"
import React from 'react'
import Navbar from '../Navbar/page'
import Drawer from '@/app/Cards/Drawer/page'
import { useState, useCallback } from 'react'

const Drawrwrapper = () => {
    const [isDrawerOpen, setisDrawerOpen] = useState(false)
    const handleClose = useCallback(() => setisDrawerOpen(false), [])

    return (
        <>
            <Navbar toggleDrawer={() => setisDrawerOpen(!isDrawerOpen)} />
            <Drawer isOpen={isDrawerOpen} onClose={handleClose} />
        </>
    )
}

export default Drawrwrapper