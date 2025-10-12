import React from 'react'

const ProductCard = ({ product }) => {

    return (
        // i will change this div into Link tag later
        <div>
            <section>
                <div>
                    <img src={product.imageUrl} alt="Food image" />
                </div>
                <div>
                    <div><span>{product.name}</span><button></button></div>
                    <div>{product.price} 500gm</div>
                    <p>{product.description}</p>
                </div>
            </section>
        </div >
    )
}

export default ProductCard