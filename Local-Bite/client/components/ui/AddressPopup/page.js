"use client";
import React from "react";
import { useState } from "react";
export default function AddressPopup({ isOpen, onClose, onSubmit }) {
    const [formdata, setformdata] = useState({
        label: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
        phone: ""
    })

    if (!isOpen) return null;

    const handlechange = (e) => {
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        onSubmit(formdata)
        setTimeout(() => {
            onClose();
        }, 1000);
    }

    return (
        <div className="overlay">
            <div className="modal">

                <h2 className="text-xl md:text-2xl mb-5 font-semibold">Add New Address:</h2>

                <form className="addressForm" onSubmit={(e) => handlesubmit(e)}>

                    <input onChange={handlechange} name="label" placeholder="Label (Home, Office)" />
                    <input onChange={handlechange} name="street" placeholder="Street Address" />
                    <input onChange={handlechange} name="city" placeholder="City" />
                    <input onChange={handlechange} name="state" placeholder="State" />
                    <input onChange={handlechange} name="pincode" placeholder="Postal Code" />
                    <input onChange={handlechange} name="landmark" placeholder="Landmark" />
                    <input onChange={handlechange} name="phone" placeholder="Phone Number" />

                    <div className="buttons">
                        <button type="submit" className="bg-trust py-2 px-6 text-white font-semibold rounded-md">Save</button>
                        <button type="button" className="bg-chili-red py-2 px-6 text-white font-semibold rounded-md" onClick={onClose}>
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}