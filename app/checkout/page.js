'use client'
  import React, { useState, useEffect } from 'react';
  import Del from '@/components/Del';

  const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
      async function fetchCartData() {
        try {
          const response = await fetch('/api/checkout');
  
          if (response.ok) {
            const data = await response.json();
            setCartItems(data);
  
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
    }, []);
  
    const handlePlaceOrder = async () => {
      try {
        const response = await fetch('/api/placeorder');        
  
        if (response.ok) {
          setOrderPlaced(true);
          console.log("Order placed successfully.");
          // Call handleFetchDeliveryDetails after order is placed
          handleFetchDeliveryDetails();
        } else {
          console.error('Failed to place the order.');
        }
      } catch (error) {
        console.error('An error occurred while placing the order:', error);
      }
    };
  
    const handleFetchDeliveryDetails = async () => {
      try {
        const response = await fetch('/api/delivery', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const orderDetails = await response.json();
          setOrderDetails(orderDetails); // Store order details in state
          setIsModalOpen(true);  // Store order details in state
          console.log('Order details fetched successfully.');
        } else {
          console.error('Failed to fetch order details.');
        }
      } catch (error) {
        console.error('An error occurred while fetching order details:', error);
      }
    };
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: "url('/mainBg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-gray-100" style={{ backgroundColor: 'rgba(200, 200, 200, 0.9)', borderRadius: '10px' }}>
          {orderPlaced ? (
            <>
              <p className="text-green-600 text-lg font-medium">Order Placed Successfully!</p>
              <div className="mt-8">
                <h2 className="text-lg font-medium mb-4">Order Details</h2>
                {orderDetails && (
                  <div className="bg-gray-100 p-4 rounded-md">
                    <p className="text-gray-800">Check Delivery and Payment details</p>
                  </div>
                )}
              </div>
              {isModalOpen && (
                <Del isOpen={isModalOpen} closeModal={closeModal} orderDetails={orderDetails} />
              )}
            </>
          ) : (
            <>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>Rs. {subtotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <button
                  onClick={handlePlaceOrder}
                  className="flex justify-center w-full px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Place order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };
  
  export default CartPage;