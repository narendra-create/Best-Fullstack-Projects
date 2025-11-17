import React from 'react'

const Group = ({ order }) => {
  const height = order.items.length <= 3 ? 'h-full pb-2' : 'h-34';
  return (
    <section className='bg-white rounded-xl mb-2'>
      <div className='w-full relative border-b-2 pb-2.5 mb-1 border-gray-300 pt-4'>
        <div className='px-3 flex gap-4 items-center'>
          <span>
            <img src={order.vendor.imageUrl ? order.vendor.imageUrl : '/food-placeholder.jpeg'} alt="•" className='w-11 h-11 rounded-full object-cover object-center' />
          </span>
          <span className='font-semibold text-lg'>{order.vendor.name}</span>
        </div>
        <div className='text-center absolute leading-7 line-clamp-1 h-10 w-28 overflow-hidden top-4 right-4 px-4 py-2 bg-chili-red text-white rounded-lg'>{order.status}</div>
      </div>
      <div className={`${height} mt-3 overflow-hidden w-full border-b-2 border-gray-300`}>
        {order.items.map((item, index) => {
          return <div className='px-4 text-lg font-sans flex items-center mb-1' key={index}>
            🫑 {item.quantity}x {item.product.name}
          </div>
        })}
      </div>
      <div className='w-full flex items-center justify-start gap-15 py-0.5 bg-red-50'>
        <span className='pl-10 text-lg font-sans'>Total Amount</span>
        <span className='text-4xl self-start'>-</span>
        <span className='pr-10 font-semibold'>₹{order.totalprice}</span>
      </div>
      <div className='w-full flex items-center justify-center py-3'>
        <button className='w-[94%] px-3 py-2 focus:bg-red-600 border-2 transition-all ease-in-out duration-200 border-red-500 bg-chili-red text-white font-bold text-xl rounded-xl'>Pay Now</button>
      </div>
    </section>
  )
}

export default Group