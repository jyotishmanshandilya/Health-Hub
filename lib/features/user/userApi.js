import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'users',
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
                url: 'api/auth/verify',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: { token },
            })
        })
    })
});



export const { useLoginMutation, useRegisterMutation, useVerifyMutation } = userApi