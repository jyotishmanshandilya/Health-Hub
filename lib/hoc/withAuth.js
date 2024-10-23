'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useVerifyMutation } from "../features/user/userApi";

export function withAuth( Component ){
    return function withAuth( props ){
        const router = useRouter();

        const currentUser = useSelector((state) => state.user.user);
        const [ verify ] = useVerifyMutation();
        const [authStatus, setAuthStatus] = useState(null);

        useEffect(() => {
            const checkAuthenticationStatus = async() => {
                // get token from cookies
                const token = currentUser?.token;
                if(token){
                    try {
                        // verify token and get the userdata
                        const res = await verify({token}).unwrap();
                        console.log("Token verified in HOC: ", res)
                        setAuthStatus(true);
                    } catch (error) {
                        console.log("Error: Invalid JWT Token")
                        setAuthStatus(false);
                    }
                }
                else{
                    setAuthStatus(false);
                }
            }
            
            checkAuthenticationStatus();
        }, [currentUser, verify])

        // Redirect to login if not authenticated
        useEffect(() => {
            if (authStatus === false) {
            router.push('/auth/login'); 
            }
        }, [authStatus, router]);

        // if token not yet available
        if(authStatus === null){
            return <div className='text-center py-48'>Loading...</div>
        }

        if(authStatus){
            return <Component {...props}/>
        }

        return null;
    }
}