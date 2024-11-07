'use client'

import { StarIcon } from '@heroicons/react/20/solid'
import { useAddProductitemToCartMutation, useGetProductConfigWithIdQuery, useGetProductitemWithIdQuery, useGetProductReviewsWithIdQuery } from '@/lib/features/product/productApi'
import { useState } from 'react'

const page = ({ params }) => {
    const { id, pid, ptid } = params;
    const { data:productitemData, isLoading:isProductitemsLoading } = useGetProductitemWithIdQuery({categoryId: id, productId: pid, productitemId: ptid});
    const { data:productConfigData, isLoading:isProductConfigLoading } = useGetProductConfigWithIdQuery({categoryId: id, productId: pid, productitemId: ptid});
    const { data:productReviewsData, isLoading:isProductReviewsLoading } = useGetProductReviewsWithIdQuery({categoryId: id, productId: pid, productitemId: ptid});
    const [ addProductitemToCart ] = useAddProductitemToCartMutation();

    // Initialize state for storing selected variations and qty
    const [selectedVariations, setSelectedVariations] = useState({});
    const [quantity, setQuantity] = useState(1)

    // Handle variation selection
    const handleVariationChange = (variation, variationId, id, value) => {
        setSelectedVariations((prev) => ({
            ...prev,
            [variation]: {
                variationId,
                data: {
                    id,
                    value
                }
            },
        }));
    };

    // Handle quantity change
    const handleQuantityChange = (value) => {
        setQuantity(value);
    }    

    const handleAddToCart = async () => {
        console.log("Added item to bag")
        console.log("Selected Items: ", selectedVariations);
        console.log("Quantity: ", quantity)
        try {
            const res = await addProductitemToCart({productitemId: ptid, qty: quantity, productConfig: selectedVariations }).unwrap();
            console.log("Added To cart: ", res);
            alert("Added To Cart!!");
            setSelectedVariations({});
            setQuantity(1);
        } catch (error) {
            console.log("Error in adding to cart: ", error);
            alert("Failed to add to cart: ");
        }
    }

    // if(!isProductitemsLoading) console.log(JSON.stringify(productitemData[0]))
    // if(!isProductConfigLoading) console.log(JSON.stringify(productConfigData))
    // if(!isProductReviewsLoading) console.log(JSON.stringify(productReviewsData))
 
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
                        
                        {!isProductConfigLoading && Object.keys(productConfigData).map((variation) => (
                            <div key={productConfigData[variation].variationId} className="my-4">
                                <p className="text-lg font-semibold">{variation}</p>
                                <select
                                    value={selectedVariations[variation]?.data?.id || ''}
                                    onChange={(e) => {
                                        const selectedOption = productConfigData[variation].data.find(
                                            (option) => option.variationoptionId === parseInt(e.target.value)
                                        );
                                        handleVariationChange(variation, productConfigData[variation].variationId, selectedOption.variationoptionId, selectedOption.value)
                                    }}
                                    className="mt-2 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="" disabled>
                                        Select {variation}
                                    </option>
                                    {productConfigData[variation].data.map((option) => (
                                        <option key={option.variationoptionId} value={option.variationoptionId}>
                                            {option.value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}

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
                                disabled={Object.keys(selectedVariations).length === 0}
                                type="button"
                                className={`flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white 
                                    ${Object.keys(selectedVariations).length === 0 
                                        ? 'bg-gray-300 cursor-not-allowed' 
                                        : 'bg-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                    }`}
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