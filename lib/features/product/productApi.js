import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
    endpoints: (builder) => ({
        // retrieve categories
        getCategories: builder.query({
            query: () => '/api/category'
        }),

        // retrieve all products with particular category id
        getProductsWithCategoryId: builder.query({
            query: (id) => ({ url: `/api/category/${id}` }),
        }),

        // retrieve all product items from a particular product group
        getProductitemsWithProductId: builder.query({
            query: ({ categoryId, productId }) => ({ url: `/api/category/${categoryId}/products/${productId}` })
        }),

        // retrieve productitems with id
        getProductitemWithId: builder.query({
            query: ({ categoryId, productId, productitemId }) => ({ url: `/api/category/${categoryId}/products/${productId}/productitem/${productitemId}`})
        }),

        // retrieve productConfig with productitemid
        getProductConfigWithId: builder.query({
            query: ({ categoryId, productId, productitemId }) => ({ url: `/api/category/${categoryId}/products/${productId}/productitem/${productitemId}/productconfig`})
        }),

        // retrieve product reviews with productitemId
        getProductReviewsWithId: builder.query({
            query: ({ categoryId, productId, productitemId }) => ({ url: `/api/category/${categoryId}/products/${productId}/productitem/${productitemId}/reviews`})
        })
    })
});

export const { useGetCategoriesQuery, useGetProductsWithCategoryIdQuery, useGetProductitemsWithProductIdQuery, useGetProductitemWithIdQuery, useGetProductConfigWithIdQuery, useGetProductReviewsWithIdQuery } = productApi