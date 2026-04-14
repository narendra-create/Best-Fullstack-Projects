"use client";
import React, { useEffect } from "react";
import { useState } from "react";

const AddressSelector = ({ onBack, onContinue, selectaddress, handlenewaddress, alladdresses }) => {
    const [selected, setselected] = useState(null);
    const [Loading, setLoading] = useState(true);

    const handlecontinue = async () => {
        if (!selected) {
            alert("Please Select an address");
            return;
        }
        selectaddress(selected);
        onContinue();
    };

    useEffect(() => {
        if (alladdresses && alladdresses.length > 0) {
            setLoading(false);
            const defaultAddress = alladdresses.find(addr => addr.isDefault);
            if (defaultAddress) {
                setselected(defaultAddress);
            }
        }
    }, [alladdresses]);

    if (Loading) {
        return <div className='loader w-full my-50 mx-auto'></div>
    }

    const handlechange = (address) => {
        setselected(address)
    }


    return (
        <div className="w-full p-5">
            <h3 className="md:mb-8 mb-5 font-extrabold text-3xl md:text-4xl">
                Select Address
            </h3>

            {/* Address List */}
            <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
                {alladdresses.map((address) => (
                    <div
                        key={address._id}
                        onClick={() => handlechange(address)}
                        className="border rounded-xl p-4 cursor-pointer hover:shadow-md transition flex justify-between items-start"
                    >
                        <div>
                            <h4 className="font-semibold text-lg">{address.label} {address.isDefault && "(Default)"}</h4>
                            <p className="text-sm text-gray-600">
                                {address.street},{address.landmark}, {address.city}, {address.state} - {address.pincode}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Phone: {address.phone}
                            </p>
                        </div>

                        <input
                            checked={selected?._id === address._id}
                            onChange={() => handlechange(address)}
                            type="radio" name="address" className="mt-2" />
                    </div>
                ))}
            </div>

            {/* Add New Address */}
            <button onClick={handlenewaddress} className="mt-5 w-full border border-dashed border-gray-400 rounded-xl py-3 font-semibold hover:bg-gray-100 transition">
                + Add New Address
            </button>

            {/* Bottom Buttons */}
            <div className="mt-6 flex flex-col gap-3">
                <button
                    onClick={handlecontinue}
                    className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                >
                    Deliver Here
                </button>

                <button
                    onClick={onBack}
                    className="bg-gray-200 py-3 rounded-xl font-medium hover:bg-gray-300 transition"
                >
                    Back To Summary
                </button>
            </div>
        </div>
    );
};

export default AddressSelector;