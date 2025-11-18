import React from "react";
import Link from "next/link";

const OrderSuccess = async ({ params }) => {
    const url = await params;
    return (
        <div className="text-black bg-green-50 h-screen">
            <section className="pt-25 md:w-360 mx-auto flex flex-col items-center">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="md:w-87 w-67 h-auto"
                >
                    <source src="/success.webm" type="video/webm" />
                </video>
                <div className="text-center">
                    <div className="font-bold mt-2 mb-1 text-xl">Payment Successfull</div>
                    <div className="font-semibold text-md">Order Id: {url.orderid}</div>
                </div>
                <div className="flex md:gap-10 gap-8 mt-10">
                    <Link href={'/'} className='hover:bg-green-700 outline-1 outline-green-600 hover:text-xl transition-all ease-in-out duration-300 bg-green-300 h-14 w-40 md:w-50 rounded-4xl flex items-center justify-center font-semibold text-md md:text-lg'>Homepage</Link>
                    <Link href={'/CustomerTools/OrderStatus'} className='hover:bg-green-700 outline-1 outline-green-600 hover:text-xl transition-all ease-in-out duration-300 bg-green-300 h-14 w-40 text-md md:w-50 rounded-4xl flex items-center justify-center font-semibold md:text-lg'>Your Orders</Link>
                </div>
            </section>
        </div>
    );
};

export default OrderSuccess;
