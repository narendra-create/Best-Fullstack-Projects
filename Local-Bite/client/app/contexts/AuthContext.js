"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {

    const [reload, setReload] = useState(false);
    const [User, setUser] = useState(null)
    const [isLoading, setisLoading] = useState(true)

    const refreshUser = () => setReload(prev => !prev);

    const synccart = async () => {
        const localData = JSON.parse(localStorage.getItem("items")) || [];
        let localitems = Array.isArray(localData) ? localData : [localData];
        if (localitems.length === 0) {
            setisLoading(false)
        }
        else if (localitems.length > 0) {
            console.log(localitems)
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/cart/sync`, {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    items: localitems
                })
            })
            if (!res.ok) {
                throw new Error("Unable To fetch sync")
            }
            const data = await res.json();
            localStorage.removeItem("items")
            console.log(data, "This is data")
        }
    }


    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/verify`, { credentials: 'include' })
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user)
                    synccart();
                }
                else {
                    console.log("Authentication failed server responded with", res.status)
                    setUser(null)
                }
            }
            catch (err) {
                console.log("Error in authcontext")
                setUser(null);
            }
            finally {
                setisLoading(false)
            }
        }
        verifyUser();
    }, [reload])


    return (
        <Authcontext.Provider value={{ User, isLoading, refreshUser }}>
            {children}
        </Authcontext.Provider>
    )
}

export const useAuth = () => useContext(Authcontext);