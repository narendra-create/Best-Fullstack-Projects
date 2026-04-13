"use client";
import React, { useEffect } from "react";
import { useState } from "react";
export default function AddressPopup({ currentaddress, isOpen, onClose, onSubmit, mode }) {
    const [formdata, setformdata] = useState({
        label: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
        phone: ""
    });

    useEffect(() => {
        if (mode === "updateaddress" && currentaddress) {
            setformdata(currentaddress[0]);
        }
    }, [mode, currentaddress]);

    // useEffect(() => {
    //     console.log(formdata, "curentaddress", currentaddress)
    // }, [formdata, currentaddress])


    if (!isOpen) return null;

    const handlechange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        if (mode === "newaddress") {
            onSubmit(formdata)
        }
        else if (mode === "updateaddress") {
            onSubmit(formdata, currentaddress[0]._id)
        }
        setTimeout(() => {
            onClose();
        }, 1000);
    }


    return (
        <div className="overlay">
            <div className="modal">

                <h2 className="text-xl md:text-2xl mb-5 font-semibold">Add New Address:</h2>

                <form className="addressForm" onSubmit={(e) => handlesubmit(e)}>

                    <input onChange={handlechange} name="label" value={formdata.label} placeholder="Label (Home, Office)" />
                    <input onChange={handlechange} name="street" value={formdata.street} placeholder="Street Address" />
                    <input onChange={handlechange} name="city" value={formdata.city} placeholder="City" />
                    <input onChange={handlechange} name="state" value={formdata.state} placeholder="State" />
                    <input onChange={handlechange} name="pincode" value={formdata.pincode} placeholder="Postal Code" />
                    <input onChange={handlechange} name="landmark" value={formdata.landmark} placeholder="Landmark" />
                    <input onChange={handlechange} name="phone" value={formdata.phone} placeholder="Phone Number" />

                    <div className="buttons">
                        <button type="submit" className="bg-trust py-2 px-6 text-white font-semibold rounded-md">{mode === "newaddress" ? "Save" : "Update"}</button>
                        <button type="button" className="bg-chili-red py-2 px-6 text-white font-semibold rounded-md" onClick={onClose}>
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}