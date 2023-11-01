/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/


const products = [
  {
    id: 1,
    name: 'Pump God Preworkout',
    imageSrc: 'https://liftvault.com/wp-content/uploads/2020/11/myprotein-the-pre-workout.jpg',
    imageAlt: "Preworkout supplement in a cylindrical box",
    price: 'Rs 699',
    flavour: 'Fruit Punch',
  },
  {
    id: 2,
    name: 'Fast Fuel Whey Protein',
    imageSrc: 'https://www.prolifedistribution.co.uk/images/myprotein-impact-diet-whey-2-5kg-p35793-19084_image.jpg',
    imageAlt: "Whey protein supplement in a cylindrical box",
    price: 'Rs 2699',
    flavour: 'Chocolate',
  },
  {
    id: 3,
    name: 'Hydro Pump Electrolytes',
    imageSrc: 'https://th.bing.com/th/id/OIP.M1mPGnnsF2jbGWaCepBh0AHaHb?pid=ImgDet&rs=1',
    imageAlt: "Hydration electrolytes supplement in a cylindrical box",
    price: 'Rs 399',
    flavour: 'Berry Blast',
  },
  // More products...
]
//replace this array of objects with database info


export default function Products() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Products</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={`/product/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.flavour}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
