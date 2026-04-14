import React from "react";
import { toast, Slide } from "react-toastify";

export const fetchaddresses = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/auth/showaddress`, { credentials: "include" })
        if (!res.ok) {
            const data = await res.json();
            toast.error(`${data.message}`, {
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
            return;
        }
        else {
            const { Addresses } = await res.json();
            console.log(Addresses, "from tool")
            return Addresses;
        }
    }
    catch (err) {
        console.log(err)
        throw new Error("Can't fetch addresses")
    }
}

export const handlesubmitaddress = async (addressobject) => {
    // console.log(addressobject)
    if (!addressobject) throw new Error("Please Fill the form and click submit");
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/auth/addaddress`, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            address: addressobject
        })
    })

    if (!res.ok) {
        const data = await res.json();
        toast.error(`${data.message}`, {
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
        return;
    }
    else {
        toast.success('successfully Added✔️', {
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