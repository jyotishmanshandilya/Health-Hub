'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const User = () => {
  //const [userInfo, setUserInfo] = useState({});
  //const [orderHistory, setOrderHistory] = useState({});
  //const [allReviews, setallReviews] = useState({});
  const [allData, setAllData] = useState({});

  useEffect(() => {
    async function fetchUserData(){
      try {
        const response = await fetch('/api/user');
        if(response.ok){
          const data = await response.json();
          setAllData(data);
        }
        else{
          console.error('Failed to fetch user data.');
        }
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
      }
    }
    fetchUserData();
  }, [])
  

  const userInfo = allData.customer_info;
  const orderHistory = allData.order_history;
  const allReviews = allData.user_reviews;

  //console.log("all data: ",allData);
  //console.log("customer data: ",userInfo);
  console.log("order history data: ",orderHistory);
  //console.log("user review data: ", allReviews);
  
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundImage: `url('/mainBg.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-gray-100" style={{ backgroundColor: 'rgba(200, 200, 200, 0.9)', borderRadius: '10px' }}>
      <h1 className="text-2xl font-semibold mb-4 text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#888' }}>User Dashboard</h1>

      <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray" style={{ color: '#888' }}>User Information</h2>
          {userInfo &&
             <ul className="text-white">
              <li>Username: {userInfo.username}</li>
              <li>Email: {userInfo.email}</li>
              <li>Delivery Address: {userInfo.delivery_addr}</li>
            </ul>
          }
        </div>

        <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray" style={{ color: '#888' }}>Order History</h2>
          {orderHistory && orderHistory.map((product)=>(
            <div key={index} className="text-white mb-4">
              <Link href={`/product/${product.productId}`}>{product.name}</Link>
              <img
                src={product.image1}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
              <p>Rs. {product.price}</p>
              <br/>
            </div>
          ))}

        </div>
  
        <div>
        <h2 className="text-xl font-semibold mb-4 text-gray" style={{ color: '#888' }}>User Reviews</h2>
          {allReviews && allReviews.map((review, index) => (
            <div key={index} className="text-white mb-4">
              <Link href={`/product/${review.productId}`}>{review.description}</Link>
              <p>Rating: {review.rating}/5</p>
              <br/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );  
};

export default User;
