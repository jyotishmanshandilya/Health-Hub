'use client'
import { useGetProductitemsWithProductIdQuery } from '@/lib/features/product/productApi';

export default function Products({ productId, categoryId }) {

  const { data, isLoading, isSuccess } = useGetProductitemsWithProductIdQuery({categoryId, productId});
  let productitems = null;

  if(isSuccess){
    // to get the first 2 items
    productitems = data.slice(0, 2);
  }

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-4 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid gap-x-2 gap-y-2 grid-cols-1 sm:grid-cols-2 xl:gap-x-8 xl:gap-y-8">
          {!isLoading ? (
            productitems.map((productitem) => (
            <div key={productitem.productitemid} className="group relative border p-5 rounded-xl bg-white">
              <a href={`/category/${categoryId}/products/${productId}/productitem/${productitem.productitemid}`}>
                <div className="w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
                  <img
                    src={productitem.imageurl}
                    alt={productitem.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="mt-4 flex justify-between items-center gap-3">
                  <p className="flex-grow mt-1 text-sm text-gray-500 truncate">{productitem.title}</p>
                  <p className="flex-none mt-3 text-sm text-gray-700">Rs {productitem.price}</p>
                </div>
              </a>
            </div>))
          ): (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}