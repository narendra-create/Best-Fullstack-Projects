import React from 'react'
import ProductCard from '@/app/Cards/ProductCard/page'

const Products = () => {
    const Product = [{
        "name": "Quantum Laptop Pro",
        "description": "The fastest laptop in the universe. Perfect for coding your way to a million bucks.",
        "price": 1299.99,
        "imageUrl": "https://placehold.co/600x400/000000/FFFFFF/png?text=Laptop+Pro",
        "vendor": "444444"
    }]
    return (
        <div>
            {Product.map((product) => {
                return <ProductCard product={product} key={product.name} />
            })}
        </div>
    )
}

export default Products