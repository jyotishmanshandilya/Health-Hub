'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Changepass = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/auth/changepass', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            alert('Your password has been updated successfully');
            router.push('/auth/login')
        } else {
            alert('Failed to change password');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while changing password');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center">
     <div className="p-8 rounded shadow-lg w-full max-w-md bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4 text-gray-600">Update Password</h1>
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-4 text-gray-700">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border p-2 rounded w-full focus:outline-none focus:border-white"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-4 text-gray-700" >Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=' New Password'
              className="border p-2 rounded w-full focus:outline-none focus:border-white"
            />
          </div>

          {/* Buttons div */}
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600" 
            >
                Update Password
            </button>
            
        </form>
      </div>
    </div>
  );
};

export default Changepass;