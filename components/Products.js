'use client'
import { useSelector } from 'react-redux';

export default function Products({ productid }) {
  const state = useSelector((state) => state.product.products)
  const data = state.filter((product) => product.productid == productid)

  // displaying only the top 2 product items in each product
  const products = data[0].productitems.slice(0,2)

  if(!products){
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-4 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-2 lg:grid-cols-2 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.productitemid} className="group relative border p-5 rounded-xl bg-white">
            <a href={`/product/${productid}/${product.productitemid}`}>
              <div className="w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
                <img
                  src={product.imageurl}
                  alt={product.productitemtitle}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="mt-4 flex justify-between items-center gap-3">
                <p className="flex-grow mt-1 text-sm text-gray-500 truncate">{product.productitemtitle}</p>
                <p className="flex-none mt-3 text-sm text-gray-700">Rs {product.price}</p>
              </div>
            </a>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}