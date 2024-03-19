import React from 'react'
import ProductCard from './ProductCard';

function ProductList({products}) {
  return (
    <section className='trending-section'>
        <div className='flex flex-wrap gap-x-8 gap-y-16'>
            {products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
            })}
        </div>
  </section>
  )
}

export default ProductList