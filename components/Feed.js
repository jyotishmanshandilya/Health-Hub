'use client'

import { useDispatch } from 'react-redux';
import { useGetAllProductsQuery, useGetCategoriesQuery } from '@/lib/features/product/productApi';
import { allProducts } from '@/lib/features/product/productSlice';
import Products from './Products'
import Category from './Category';

const Feed = () => {
  const { data:categories, isLoading } = useGetCategoriesQuery();
  // const dispatch = useDispatch();
  // const { data:productDetails, isLoading, isSuccess } = useGetAllProductsQuery();

  // if(isSuccess){
  //   console.log("Product Details: ", productDetails)
  //   try {
  //     dispatch(allProducts(productDetails));
  //     console.log("Dispatched all products")
  //   } catch (error) {
  //     console.log("Failed to dispatch products: ", error)
  //   }
  // }

  return (
    <div className='px-16'>
      <div className='py-10'>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Products</h2>
        <p className='text-sm'>At Health Hub, we provide high-quality supplements designed for fit and driven individuals. Our products support muscle growth, boost performance, and enhance recovery, helping you stay at your best and reach your goals in every aspect of life. Stay fit, focused, and unstoppable with Health Hub.</p>
      </div>

      <div>
        {!isLoading ? ( 
          categories.map((category) => (
            <div key={category.categoryid}>
              <a href={`/category/${category.categoryid}`}>
                <p className="text-center p-5 text-xl text-semibold underline">{category.categoryname}</p>
              </a>
              <Category categoryId={category.categoryid} />
            </div>
          ))) : (
          <div className="text-center p-16">Loading...</div>
        )}
      </div>
    </div>
  )
}

export default Feed
