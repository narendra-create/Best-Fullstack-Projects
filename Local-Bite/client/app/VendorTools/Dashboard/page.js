import React from 'react'

const DashBoard = () => {
  return (
    <div className='text-black mt-34 mx-auto w-full flex items-center justify-center'>
      <div>
          <h1 className='font-bold text-3xl my-3'>Dashboard</h1>
        <ol>
          <li>- History</li>
          <li>- Current orders + status update button</li>
          <li>- Add products button</li>
          <li>- Edit My products or delete them</li>
        </ol>
      </div>
    </div>
  )
}

export default DashBoard