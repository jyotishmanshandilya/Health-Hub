'use client'
import { useEffect } from 'react';
import { fetchProducts } from '@/lib/features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux'

const page = ({ params }) => {
    const dispatch = useDispatch();

    const productid = params.slug;
    const state = useSelector((state) => state.product.products)
    console.log("State: ", state);
    const data = state.filter((product) => product.productid == productid)

    let products;
    let productDescription;
    let productTitle;
    if (data.length > 0 && data[0].productitems) {
        products = data[0].productitems
        productDescription = data[0].productDescription
        productTitle = data[0].productTitle
    }

    if(!products){
      return <div className='text-center py-48'>Loading...</div>
    }
    
    console.log(products)

    return (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">{productTitle}</h2>
            <p className='text-sm text-gray-600 text-left mt-2'>{productDescription}</p>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <div key={product.productitemid} className="group relative border p-5 rounded-xl">
                    <a href={`/product/${productid}/${product.productitemid}`}>
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img
                            src={product.imageurl}
                            alt={product.productitemtitle}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <p className="flex-grow mt-1 text-sm text-gray-500">{product.productitemtitle}</p>
                            <p className="flex-none mt-3 text-sm text-gray-700">Rs {product.price}</p>
                        </div>
                    </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
}

export default page
