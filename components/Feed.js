'use client'
import React from 'react'
import Products from './Products'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/lib/features/product/productSlice';

const Feed = () => {
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  if(!productDetails){
    // add skeleton of a card here later...
    return <div>Loading...</div>
  }

  return (
    <div className='px-16'>
      <div className='py-10'>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Products</h2>
        <p className='text-sm'>At Health Hub, we provide high-quality supplements designed for fit and driven individuals. Our products support muscle growth, boost performance, and enhance recovery, helping you stay at your best and reach your goals in every aspect of life. Stay fit, focused, and unstoppable with Health Hub.</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>
        {productDetails.map((pd)=>(
          <div key={pd.productid} className='py-5 bg-blue-50 rounded-lg'>
            <div className='flex justify-between'>
              <h2 className='text-xl text-gray-900 text-left ml-10 text-semibold'>{pd.productTitle}</h2>
              <button className="mr-10 flex flex-row gap-2 items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                <a href={`/product/${pd.productid}`}>View all {pd.title}</a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </button>
            </div>
            <Products productid={pd.productid} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed
