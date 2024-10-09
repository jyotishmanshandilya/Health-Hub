'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/lib/features/user/userApi';

const Register = () => {

  const router = useRouter();
  const [password, setPassword] = useState('');
  const [phone_no, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ email, phone_no, password }).unwrap();
      console.log("Registeration Successful: ", res);

      alert("Registration Successful");
      router.push('/auth/login');
    } catch (err) {
      console.log("Registration Failed: ", err);
      alert("Registration Failed...try again")
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-xl w-full max-w-md bg-gray-100 m-16">
        <h1 className="text-3xl font-bold mb-10 text-gray-600 text-center">Signup</h1>
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-full focus:outline-none focus:border-white text-gray-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500 mb1">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full focus:outline-none focus:border-white text-gray-500"
            />
          </div>
      
        {/* Phone number */}
          <div className="mb-10">
            <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
            <input
                type="tel"
                placeholder="Phone number"
                value={phone_no}
                onChange={(e) => setPhoneNo(e.target.value)}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                title="Please enter a valid phone number (###-###-####)"
                className="border border-gray-300 rounded w-full p-2 text-gray-500"
                required
            />
          </div>
          
          {/* Signup Button */}
          <div className='flex flex-col'>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Signup
            </button>
            <a href='/auth/login' className='text-center text-sm text-gray-500 mt-3 hover:underline hover:cursor-pointer'>Already have an account?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

