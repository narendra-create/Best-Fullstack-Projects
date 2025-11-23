"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import OrdersChart from '@/app/SalesChart/page'

const DashBoard = () => {
  //hooks here
  const [report, setreport] = useState([])
  const [Loading, setLoading] = useState(true)
  const [isshopopen, setisshopopen] = useState(true)
  const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  //functions here
  const loadreport = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/vendor/sales-data`, { credentials: 'include' })
      if (!res) {
        throw new Error("Problem in fetching api")
      }
      const data = await res.json();
      console.log("this is data from api", data, "and this is res", res)
      setreport(data.data)
      setLoading(false);
    }
    catch (err) {
      console.log("Frontend error in dashboard", err)
      alert("Frontend error in dashboard")
      setLoading(false)
    }
  }

  useEffect(() => {
    loadreport()
  }, [])


  useEffect(() => {
    console.log(report)
  }, [report])


  //main page here
  return (
    <div className='text-black mx-auto h-screen w-full flex items-center justify-center'>
      <section className='flex flex-col w-full h-screen pt-5'>
        <div className='w-full pl-8'>
          <div className='text-4xl font-bold mb-3'>Dashboard</div>

          <div className="inline-flex rounded-base -space-x-px shadow-[0_8px_30px_rgb(0,0,0,0.12)]" role="group">
            <button type="button" className="border border-gray-500 text-gray-600 hover:bg-neutral-500 hover:text-gray-200 focus:ring-3 focus:ring-neutral-tertiary-soft font-medium leading-5 rounded-l-xl text-sm px-3 py-2 focus:outline-none">
              Analytics
            </button>
            <button type="button" className="border border-gray-500 text-gray-600 hover:bg-neutral-500 hover:text-gray-200 focus:ring-3 focus:ring-neutral-tertiary-soft font-medium leading-5 text-sm px-3 py-2 focus:outline-none">
              Subscription
            </button>
            <button type="button" className="border border-gray-500 text-gray-600 hover:bg-neutral-500 hover:text-gray-200 focus:ring-3 focus:ring-neutral-tertiary-soft font-medium leading-5 rounded-r-xl text-sm px-3 py-2 focus:outline-none">
              Customer Massages
            </button>
          </div>

        </div>
        <div className='w-full flex mb-5 items-center justify-between px-5 mt-10'>
          <div className='bg-gray-100 w-106 border-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative flex flex-col gap-13 py-5 px-6 rounded-2xl border-gray-300'>
            <div className='text-2xl'>Total Revenue</div>
            <div className='text-4xl font-bold'>₹42,122.23</div>
            <div className='absolute text-3xl font-bold right-7 top-4'>₹</div>
          </div>
          <div className='bg-gray-100 w-106 border-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative flex flex-col gap-13 py-5 px-6 rounded-2xl border-gray-300'>
            <div className='text-2xl'>Sales</div>
            <div className='text-4xl font-bold'>+12,558</div>
            <div className='absolute text-3xl font-bold right-7 top-5'>
              <img src="/tag-fill.svg" alt="💰" />
            </div>
          </div>
          <div className='bg-gray-100 w-106 border-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative flex flex-col gap-13 py-5 px-6 rounded-2xl border-gray-300'>
            <div className='text-2xl'>Active Orders</div>
            <div className='text-4xl font-bold'>+524</div>
            <div className='absolute text-3xl font-bold right-7 top-4'>
              <img src="/note-fill.svg" alt="📝" />
            </div>
          </div>
          <div className='bg-gray-100 w-106 border-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative flex flex-col gap-13 py-5 px-6 rounded-2xl border-gray-300'>
            <div className='text-2xl'>Actions</div>
            <div className='text-4xl font-bold pl-9'>
              <label className="inline-flex items-center cursor-pointer">
                <span className="text-2xl font-medium">Close Shop</span>
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isshopopen}
                  onChange={() => setisshopopen(prev => !prev)}
                />
                <div className="relative mx-3 w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-full">
                </div>
                <span className="text-2xl font-medium">Open Shop</span>
              </label>

            </div>
            <div className='absolute text-3xl font-bold right-7 top-4'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 0 0 7.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 0 0 4.902-5.652l-1.3-1.299a1.875 1.875 0 0 0-1.325-.549H5.223Z" />
                <path fillRule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 0 0 9.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 0 0 2.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3Zm3-6a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-3Zm8.25-.75a.75.75 0 0 0-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-5.25a.75.75 0 0 0-.75-.75h-3Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <div className='w-full flex px-6 h-full pb-13 justify-between'>
          <div className='bg-gray-50 border-3 border-gray-300 w-280 pt-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl'>
            <h3 className='text-4xl font-bold pl-12 mb-10'>OverView</h3>
            <div className='w-full h-[90%]'>
              {report && !Loading ? <OrdersChart data={report} /> : <div>Loading chart....</div>}
            </div>
          </div>

          <div className='rounded-2xl overflow-auto bg-gray-100 w-152 h-full border-2 pt-8 pb-3 px-8 border-gray-400 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'>
            <div className='text-3xl font-semibold mb-8'>Recent Sales</div>
            {test && test.map((user) => {
              return <div key={user} className='flex mb-4 pb-5 border-b-3 border-gray-300 items-center w-full justify-between'>
                <div className='flex items-center gap-2'>
                  <img src="/user-circle-fill.svg" alt="👤" className='size-12' />
                  <div className='flex flex-col'>
                    <h3 className='text-xl'>Olivia</h3>
                    <p className='text-sm text-gray-500'>olivia@gmail.com</p>
                  </div>
                </div>
                <div className='font-semibold text-xl'>₹1835.21</div>
              </div>
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashBoard