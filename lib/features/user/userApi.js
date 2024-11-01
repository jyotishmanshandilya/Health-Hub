import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
    endpoints: (builder) => ({
        // login the user
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: '/api/auth/login',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: { email, password },
            })
        }),

        // logout the user
        logout: builder.mutation({
            query: () =>  ({
                url: '/api/auth/logout',
                method: 'POST',
            })
        }),
        
        // register the user
        register: builder.mutation({
            query: ({ email, phone_no, password }) => ({
                url: '/api/auth/register',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: { email, phone_no, password },
            })
        }),

        // verify the token
        verify: builder.mutation({
            query: ({ token }) => ({
                url: '/api/auth/verify',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: { token },
            })
        }),

        // retrieve the JWT token 
        getToken: builder.query({
            query: () => '/api/auth/token',
        }),

        // retrieve user information
        getUserData: builder.query({
            query: () => '/api/user',
            keepUnusedDataFor: 1,
        }),

        // retrieve user reviews data
        getUserReviews: builder.query({
            query: () => '/api/user/reviews',
            keepUnusedDataFor: 1,
        }),
    })
});



export const { useLoginMutation, useRegisterMutation, useVerifyMutation, useGetTokenQuery, useLogoutMutation, useGetUserDataQuery, useGetUserReviewsQuery } = userApi