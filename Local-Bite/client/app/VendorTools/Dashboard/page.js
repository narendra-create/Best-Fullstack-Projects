"use client"
import React from 'react'
import { useState } from 'react'

const DashBoard = () => {
  //hooks
  const [showDrawer, setShowDrawer] = useState(false)

  return (
    <div className='text-black mt-34 mx-auto w-full flex items-center justify-center'>
      <section className='bg-amber-50 top-0'>
        <div>
          {/* Button */}
          <button
            onClick={() => setShowDrawer(true)}
            className="text-white bg-blue-700 px-5 py-2.5 rounded-lg"
          >
            Show Navigation
          </button>

          <div
            className={`fixed top-0 left-0 z-40 h-screen p-4 bg-white w-64 flex flex-col justify-between transition-transform duration-300 ${showDrawer ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            {/* Close button */}
            <button
              onClick={() => setShowDrawer(false)}
              className="absolute text-xl pr-4 top-4 right-3 text-gray-600"
            >
              ✕
            </button>

            {/* Drawer top content */}
            <div>
              <h5 className="font-semibold uppercase text-2xl text-gray-500 mb-12 ml-2 mt-2">
                Menu
              </h5>
              <ul className="space-y-2 text-lg pl-2 text-center">
                <li className="border-b-2 border-slate-200 pb-4 pt-4 hover:bg-slate-100 hover:text-xl transition-all ease-in-out duration-400 rounded-2xl">
                  <a href="/">Home</a>
                </li>
                <li className="border-b-2 border-slate-200 pb-4 pt-4 hover:bg-slate-100 hover:text-xl transition-all ease-in-out duration-400 rounded-2xl">
                  <a href="#">Your Orders</a>
                </li>
                <li className="border-b-2 border-slate-200 pb-4 pt-4 hover:bg-slate-100 hover:text-xl transition-all ease-in-out duration-400 rounded-2xl">
                  <a href="/VendorTools/Addproducts">Add Products</a>
                </li>
              </ul>
            </div>

            {/* Drawer bottom logout */}
            <div className="border-t-2 border-slate-200 pt-4 text-center">
              <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all">
                Logout
              </button>
            </div>
          </div>

        </div>
      </section>
      <section>
        <h1 className='font-bold text-3xl my-3'>Dashboard</h1>
        {/* <ol>
          <li>- History</li>
          <li>- Current orders + status update button</li>
          <li>- Add products button</li>
          <li>- Edit My products or delete them</li>
        </ol> */}
      </section>
    </div>
  )
}

export default DashBoard