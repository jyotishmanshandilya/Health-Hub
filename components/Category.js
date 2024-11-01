'use client'

import { useGetProductsWithCategoryIdQuery } from '@/lib/features/product/productApi';
import Products from './Products';

export default function Category({ categoryId }) {
    const {data:products, isLoading} = useGetProductsWithCategoryIdQuery(categoryId);

    if(!isLoading){
        console.log("Data: ", products)
    }

    return (
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-4 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-2 lg:grid-cols-3 xl:gap-x-8 xl:gap-y-8">
            {!isLoading ? (
                products.map((product) => (
                    <div key={product.productid} className='py-5 bg-blue-50 rounded-lg'>
                        <div className='flex justify-between gap-5'>
                            <h2 className='text-xl text-gray-900 text-left ml-10 text-semibold'>{product.title}</h2>
                            <button className="mr-10 flex flex-row gap-2 items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                <a href={`/category/${categoryId}/products/${product.productid}`}>View all</a>
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
                        <Products productId={product.productid} categoryId={categoryId}/>
                    </div>
                ))): (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
}