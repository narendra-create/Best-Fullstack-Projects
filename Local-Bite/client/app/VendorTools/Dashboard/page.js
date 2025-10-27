"use client"
import React from 'react'
import { useState } from 'react'

const DashBoard = () => {
  //hooks
  const [showDrawer, setShowDrawer] = useState(false)

  return (
    <div className='text-black mt-34 mx-auto w-full flex items-center justify-center'>
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