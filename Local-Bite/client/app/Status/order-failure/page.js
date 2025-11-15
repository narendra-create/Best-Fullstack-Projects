import React from "react";
import Link from "next/link";

const OrderFail = async () => {
    return (
        <div className="text-black bg-red-50 h-screen">
            <section className="pt-25 w-360 mx-auto flex flex-col items-center">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-87 h-auto"
                >
                    <source src="/failed.webm" type="video/webm" />
                </video>
                <div className="text-center">
                    <div className="font-bold mt-2 mb-1 text-xl">Payment Failed</div>
                </div>
                <div className="flex gap-10 mt-10">
                    <Link href={'/'} className='hover:bg-red-900 hover:text-lg transition-all ease-in-out duration-300 bg-chili-red h-16 w-64 rounded-4xl flex items-center justify-center font-bold text-xl'>Return to Homepage</Link>
                    <Link href={'/components/Cart'} className='hover:bg-red-900 hover:text-lg transition-all ease-in-out duration-300 bg-chili-red h-16 w-64 rounded-4xl flex items-center justify-center font-bold text-xl'>Try Again</Link>
                </div>
            </section>
        </div>
    );
};

export default OrderFail;
