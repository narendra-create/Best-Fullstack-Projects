import React from 'react'

const AddressCard = () => {
    return (
        <section className='flex flex-col'>
            <div>Label</div>
            <div>
                <div>Name</div>
                <div>street and landmark</div>
                <div>City, state,pincode,country</div>
                <div>Phone no.</div>
            </div>
            <div>
                <button>Edit</button>
                <button>Delete</button>
                <button>Set Default</button>
            </div>
        </section>
    )
}

export default AddressCard;