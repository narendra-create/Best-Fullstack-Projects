"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {

    const [reload, setReload] = useState(false);
    const [User, setUser] = useState(null)
    const [isLoading, setisLoading] = useState(true)

    const refreshUser = () => setReload(prev => !prev);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/verify`, { credentials: 'include' })
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user)
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