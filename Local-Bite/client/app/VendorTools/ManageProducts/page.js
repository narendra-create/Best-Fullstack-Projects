import React from 'react'
import ManageItems from '@/app/Cards/ManageCard/page'

const Manage = () => {
    const test = {
        name: 'dosa',
        price: 40,
        description: "a dosa",
        imageUrl: "",
        quantity: "1 pc"
    }
    return (
        <div className='flex flex-col'>
            <div><h1>Manage Your Items</h1></div>
            <ManageItems product={test} />
        </div>
    )
}

export default Manage