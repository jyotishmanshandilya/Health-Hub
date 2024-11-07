'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { withAuth } from '@/lib/hoc/withAuth'
import { useGetCartItemsQuery, useRemoveCartItemMutation } from '@/lib/features/product/productApi'

const page = () => {
    const { data:cart, isLoading:isCartLoading, refetch } = useGetCartItemsQuery();
    const [totalPrice, setTotalPrice] = useState(0);
    const [shippingpPrice, setShippingpPrice] = useState(199);
    const [ removeCartItem ] = useRemoveCartItemMutation();

    useEffect(() => {
        if(!isCartLoading && cart){
            const total = cart.reduce((acc, item) => acc + item.total_productitem_cost, 0);
            setTotalPrice(total)
        }
    }, [isCartLoading, cart])

    const handleProductitemRemoval = async (cartitemId, qty, productitemId) => {
      console.log("Remove product: ", cartitemId);
      try {
        const res = await removeCartItem({ cartitemId, qty, productitemId}).unwrap();
        console.log("Removed the productitem: ", res);
        alert("Removed the product successfully");
        refetch();
      } catch (error) {
        console.log("Error in removing productitem: ", error);
        alert("Error in removing productitem")
      }
    }
 
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            {/* use a card skeleton */}
            {!isCartLoading ? (
                cart.map((item) => (
                <div key={item.cartitemid} className="grid grid-cols-3 lg:grid-cols-4 gap-6 py-8 border-t">
                    <div className="w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
                        <img
                            src={item.imageurl}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    
                    <div className="col-span-2 lg:col-span-3">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="font-medium text-lg">{item.title}</h2>
                                <p className="text-gray-600">
                                    {item.variationname} · {item.variationvalue}
                                </p>
                                <p className="text-gray-600">QTY: {item.qty}</p>
                                <p className="font-medium mt-1">Rs. {item.total_productitem_cost}</p>
                            </div>
                            
                            <div className="flex items-start gap-4">                            
                                <button 
                                  onClick={() => handleProductitemRemoval(item.cartitemid, item.qty, item.productitemid)}
                                  className="text-gray-400 hover:text-gray-500"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))):(
                <div className='text-center py-24'>Loading...</div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-6">Order summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                {!isCartLoading ? <span>Rs. {totalPrice}</span> : <span>Loading...</span>}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span>Shipping estimate</span>
                </div>
                <span>Rs. {shippingpPrice}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span>Tax estimate</span>
                </div>
                {!isCartLoading ? <span>Rs. {(0.18 * totalPrice).toFixed(2)}</span> : <span>Loading...</span>}
              </div>
              
              <div className="border-t pt-4 flex justify-between font-medium">
                <span>Order total</span>
                {!isCartLoading ? <span>Rs. {(1.18 * totalPrice + shippingpPrice).toFixed(2)}</span> : <span>Loading...</span>}
              </div>
            </div>
            
            <button 
                disabled={isCartLoading}
                className={`w-full mt-6 py-3 px-2 rounded-lg 
                    ${!isCartLoading ?
                    'text-white bg-blue-500 hover:bg-blue-700': 
                    'text-white bg-gray-500'}`}
                    
            >
                Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(page);