'use client'

import { StarIcon } from '@heroicons/react/20/solid'
import { useGetProductConfigWithIdQuery, useGetProductitemWithIdQuery, useGetProductReviewsWithIdQuery } from '@/lib/features/product/productApi'
import { useState, useEffect } from 'react'

const page = ({ params }) => {
    const { id, pid, ptid } = params;
    const { data:productitemData, isLoading:isProductitemsLoading } = useGetProductitemWithIdQuery({categoryId: id, productId: pid, productitemId: ptid});
    const { data:productConfigData, isLoading:isProductConfigLoading } = useGetProductConfigWithIdQuery({categoryId: id, productId: pid, productitemId: ptid});
    const { data:productReviewsData, isLoading:isProductReviewsLoading } = useGetProductReviewsWithIdQuery({categoryId: id, productId: pid, productitemId: ptid});

    // Initialize state for storing selected variations and qty
    const [selectedVariations, setSelectedVariations] = useState({});
    const [quantity, setQuantity] = useState(1)

    // Handle variation selection
    const handleVariationChange = (variationName, value) => {
        setSelectedVariations((prev) => ({
            ...prev,
            [variationName]: value,
        }));
    };

    // Handle quantity change
    const handleQuantityChange = (value) => {
        console.log("Onclick button: ", value)
        setQuantity(value);
    }    

    const handleAddToCart = async () => {
        // call the respective rtk query
        // send followig data: ptid, qty, variation
    }

    if(!isProductitemsLoading) console.log(productitemData[0])
    if(!isProductConfigLoading) console.log(productConfigData)
    if(!isProductReviewsLoading) console.log(productReviewsData)
 
    return (
        <div className="bg-white">
            <div className="pt-6">

                {/* Image */}
                <div className="mx-auto mt-6 max-w-xl sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75">
                        {!isProductitemsLoading ? (
                            <img
                                alt={productitemData[0].title}
                                src={productitemData[0].imageurl}
                                className="h-full w-full object-cover object-center lg:h-1/2 lg:w-1/2"
                            />
                        ) : (   
                            <div className="text-center py-10 bg-gray-200">Loading...</div>
                        )}
                    </div>
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        {!isProductitemsLoading ? (
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{productitemData[0].title}</h1>
                                <p className='text-sm text-gray-600'><span className='font-semibold'>SKU:</span> {productitemData[0].sku}</p>
                            </div>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        {!isProductitemsLoading ? <p className="text-3xl tracking-tight text-gray-900">Rs. {productitemData[0].price}</p> : <div>Loading...</div>}
                        {/* Variation Selection */}
                        {isProductConfigLoading && 
                            <div>
                            <p>Variation name...</p>
                            <div>
                                <p>variation Options...</p>
                            </div>
                            </div>
                        }
                        
                        {!isProductConfigLoading && Object.keys(productConfigData).map((variationName) => (
                            <div key={variationName} className="my-4">
                                <p className="text-lg font-semibold">{variationName}</p>
                                <select
                                    value={selectedVariations[variationName] || ''}
                                    onChange={(e) => handleVariationChange(variationName, e.target.value)}
                                    className="mt-2 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="" disabled>
                                        Select {variationName}
                                    </option>
                                    {productConfigData[variationName].map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}

                        {/* Display Selected Variations */}
                        {!isProductConfigLoading && Object.keys(productConfigData).length > 0  && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold">Selected Options:</h3>
                                {Object.entries(selectedVariations).map(([name, value]) => (
                                    <p key={name}>
                                        {name}: {value}
                                    </p>
                                ))}
                            </div>
                        )}

                        <div className='grid grid-cols-2 items-center gap-5 mt-10'>
                            {!isProductitemsLoading ? (
                                <select
                                    value={quantity || 1}
                                    onChange={(e) => handleQuantityChange(e.target.value)}
                                    aria-readonly
                                    className="mt-2 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="" disabled>
                                        Select Quantity
                                    </option>
                                    {Array.from({length: productitemData[0].quantity}).map((_, i) => (
                                        <option key={i+1} value={i+1}>
                                            {i+1}
                                        </option>
                                    ))}
                                 </select>
                                ):(
                                <div className='text-center'>Loading...</div>
                            )}
                            <button
                                type="button"
                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-500 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={handleAddToCart}
                            >
                                Add to bag
                            </button>
                        </div>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                {!isProductitemsLoading ? <p className="text-base text-gray-900">{productitemData[0].description}</p> : <div>Loading...</div>}
                            </div>
                        </div>
                        <div className='mt-16'>
                            <p className='text-xl font-semibold text-gray-900'>Reviews</p>
                            <div></div>
                            {!isProductReviewsLoading ? productReviewsData.length ? (
                                productReviewsData.map((review) => (
                                    <div key={review.reviewid} className="mt-6 max-w-lg">
                                        <div className='flex flex-row justify-between'>
                                            <div className='text-sm text-blue-500'>{review.emailid}</div>
                                            <div className="flex items-center">
                                                <div className="flex items-center">
                                                {[0, 1, 2, 3, 4].map((star) => (
                                                    <StarIcon
                                                    key={star}
                                                    aria-hidden="true"
                                                    className={review.rating > star ? 'text-gray-900 h-5 w-5 flex-shrink-0' : 'text-gray-200 h-5 w-5 flex-shrink-0'}
                                                    />
                                                ))}
                                                </div>
                                                <p className="sr-only">{review.rating} out of 5 stars</p>
                                            </div>
                                        </div>
                                        <p className='text-sm mt-2 text-gray-600'>"{review.description}"</p>
                                    </div>
                                ))
                            ) : (
                                <div>No reviews yet</div>
                            ) : (
                                <div>Loading...</div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default page;