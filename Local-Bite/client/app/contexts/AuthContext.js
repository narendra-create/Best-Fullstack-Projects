"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {

    const [User, setUser] = useState(null)
    const [isLoading, setisLoading] = useState(true)

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
    }, [])


    return (
        <Authcontext.Provider value={{ User, isLoading }}>
            {children}
        </Authcontext.Provider>
    )
}

export const useAuth = () => useContext(Authcontext);