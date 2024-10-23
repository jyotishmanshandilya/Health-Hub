'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation, useVerifyMutation } from '@/lib/features/user/userApi';
import { useDispatch} from 'react-redux';
import { loginState } from '@/lib/features/user/userSlice';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [ login, { isLoading } ] = useLoginMutation();
  const [ verify ] = useVerifyMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ 
        email, 
        password
      }).unwrap()

      try {
        // decode the jwt auth to retireve the information
        const decode = await verify({
          token: res.token
        }).unwrap()
        // console.log("Decode after login: ", decode);
  
        dispatch(loginState({
          userid: decode.userid,
          email: decode.emailid,
          token: res.token,
        }))

        alert('Login Succesful !!')
        router.push('/')
      } catch (error) {
        console.log("Error in token verification: ", error);
      }
    } catch (err) {
      console.log("Error in logging in: ", err);
      alert("Invalid Credentials")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
     <div className="p-8 rounded-xl w-full max-w-md bg-gray-100">
        <h1 className="text-3xl font-bold mb-10 text-gray-600 text-center">Login</h1>
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-500">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border p-2 rounded w-full focus:outline-none focus:border-white text-gray-500"
            />
          </div>

          {/* Password */}
          <div className="mb-10">
            <label className="block text-sm font-medium mb-1 text-gray-500" >Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className="border p-2 rounded w-full focus:outline-none focus:border-white text-gray-500"
            />
          </div>

          {/* Buttons div */}
          <div className='flex flex-col'>
            <div className='flex flex-row gap-5'>
              <button
                type="submit"
                disabled= {isLoading}
                className= {`${isLoading ? "bg-gray-500" : "bg-blue-500"} text-white p-2 rounded w-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
              >
                Log In
              </button>

              <button
                type='button'
                className="bg-gray-300 text-gray-700 p-2 rounded w-full hover:bg-gray-800 hover:text-white focus:outline-none focus:bg-gray-400"
              >
                <a href='/auth/changepass'>
                  Forgot Password?
                </a>
              </button>
            </div>
            <a href='/auth/register' className='text-center text-sm text-gray-500 mt-4 hover:underline hover:cursor-pointer'>Don't have an account yet?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
