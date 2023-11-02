'use client'
import { useState, useEffect } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]); // State to hold cart data
  const [subtotal, setSubtotal] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');

  useEffect(() => {
    // Fetch cart data from the API
    async function fetchCartData() {
      try {
        const response = await fetch('/api/checkout'); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setCartItems(data);

          // Calculate the subtotal
          const total = data.reduce((acc, product) => acc + product.price * product.quantity, 0);
          setSubtotal(total);
        } else {
          console.error('Failed to fetch cart data.');
        }
      } catch (error) {
        console.error('An error occurred while fetching cart data:', error);
      }
    }

    fetchCartData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const handlePlaceOrder = async () => {
    try {
      // Send the delivery address to the backend
      const response = await fetch('/api/placeorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deliveryAddress }),
      });

      if (response.ok) {
        setOrderPlaced(true);
      } else {
        console.error('Failed to place the order.');
      }
    } catch (error) {
      console.error('An error occurred while placing the order:', error);
    }
  };

  return (
    <div>
      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <h1 className="text-lg font-medium text-gray-900">Shopping cart</h1>
          </div>
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((product) => (
                  <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product.href}>{product.name}</a>
                        </h3>
                        <p className="ml-4">{product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Qty {product.quantity}</p>
                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          {orderPlaced ? (
            <p className="text-green-600 text-lg font-medium">Order Placed Successfully!</p>
          ) : (
            <>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    className="border p-2 w-full"
                    placeholder="Delivery Address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                  />
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;