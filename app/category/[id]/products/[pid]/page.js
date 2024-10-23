'use client'

import { useGetProductitemsWithProductIdQuery } from "@/lib/features/product/productApi";

const page = ({ params }) => {
    const { id, pid } = params;
    const { data:products, isLoading} = useGetProductitemsWithProductIdQuery({categoryId: id, productId: pid});

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">{productTitle}</h2>
            <p className='text-sm text-gray-600 text-left mt-2'>{productDescription}</p> */}
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {!isLoading ? (
                    products.map((product) => (
                    <div key={product.productitemid} className="group relative border p-5 rounded-xl">
                        <a href="">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                src={product.imageurl}
                                alt={product.title}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <p className="flex-grow mt-1 text-sm text-gray-500">{product.title}</p>
                                <p className="flex-none mt-3 text-sm text-gray-700">Rs {product.price}</p>
                            </div>
                        </a>
                    </div>
                ))): (
                    <div className="text-center py-48">Loading...</div>
                )}
            </div>
            </div>
        </div>
    )
}

export default page
