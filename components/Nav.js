"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTokenQuery, useLogoutMutation, useVerifyMutation } from '@/lib/features/user/userApi';
import { loginState, logoutState } from '@/lib/features/user/userSlice';

const Nav = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const currentUser = useSelector((state) => state.user.user); // Use Redux state directly for user
  const { data } = useGetTokenQuery();
  const [logout] = useLogoutMutation();
  const [verify] = useVerifyMutation();

  // Session retrieval logic - verify token and set user in Redux
  useEffect(() => {
    const handleTokenVerification = async (token) => {
      try {
        const decoded = await verify({ token: token.value }).unwrap();
        dispatch(loginState({
          userid: decoded.userid,
          email: decoded.emailid,
          token: token.value,
        }));
      } catch (error) {
        console.log("Error in session verification: ", error);
      }
    };

    if (data?.token) {
      handleTokenVerification(data.token);
    }
  }, [data, verify, dispatch]);

  // Logout logic
  const handleUserLogout = async () => {
    try {
      await logout().unwrap(); // destroy the cookie
      dispatch(logoutState()); // clear user data from redux
      router.push('/auth/login'); 
    } catch (error) {
      alert("Failed to logout");
    }
  };

  return (
    <nav className="w-full bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <p className="text-xl font-bold">Health Hub</p>
        </Link>
        <div className="flex items-center gap-5">
          <Link href="/user" className="hover:bg-white hover:text-gray-900 bg-blue-500 text-white px-3 py-2 rounded-lg">
            {currentUser?.email ? (
              <p>{currentUser.email}</p>
            ) : (
              <p>Dashboard</p>
            )}
          </Link>
          <Link href={currentUser?.email ? '' : '/auth/login'} className="hover:bg-white hover:text-gray-900 border rounded-lg px-3 py-2">
            {currentUser?.email ? (
              <button onClick={handleUserLogout}>Sign Out</button>
            ) : (
              <p>Sign In</p>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
