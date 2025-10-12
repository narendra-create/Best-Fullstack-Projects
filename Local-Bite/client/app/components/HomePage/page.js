"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import VendorCard from '../../Cards/VendorCard/page'

const HomePage = () => {
  //space for hooks 


  //space for functions
  const getallvendors = async () => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/vendor/all`)
    if (!res.ok) {
      throw new Error("Problem in fetching")
    }
    const data = await res.json();
    return data.ven;
  }

  const {
    data: Vendors,    // actual vendor data
    isLoading,         // true while fetching
    isError,           // true if fetch failed
    error,             // error details
  } = useQuery({
    queryKey: ["vendors"],
    queryFn: getallvendors,
    staleTime: 1000 * 60 * 2, // (2 min) refresh time
    cacheTime: 1000 * 60 * 15 // keep cache in memory for 15 min
  });



  if (isLoading) { return <p>Loading Vendors</p> }
  if (isError) { return <p>Error: {error.message}</p> }
  //main app
  return (
    <div>
      <div className='h-188 mb-12 flex items-center justify-center text-2xl font bold bg-gray-400 w-full'>Reserved for filters and search</div>
      <div className='grid grid-cols-4 w-400 mx-auto gap-8'>
        {Vendors && Vendors.map((vendor) => {
          return <VendorCard key={vendor._id} vendor={vendor} />
        })}
      </div>
    </div>
  )
}

export default HomePage