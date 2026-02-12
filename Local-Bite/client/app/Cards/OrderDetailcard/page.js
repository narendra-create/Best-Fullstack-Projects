import React from 'react'

const Detailordercard = ({ order }) => {
    return (
        <div>{order?.vendor.name}</div>
    )
}

export default Detailordercard