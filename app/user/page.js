'use client'
import React, { useEffect, useState } from 'react';

const User = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [allReviews, setallReviews] = useState([]);

  useEffect(() => {
    async function fetchUserData(){
      try {
        const data = await fetch('/api/user');
        console.log(data);
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
      }
    }

    fetchUserData();
  }, [])
  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded shadow-lg w-full max-w-md bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Order and Payment History</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          {//order history details
          }
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
         {//payment history details
          }
        </div>
      </div>
    </div>
  );
};

export default User;
