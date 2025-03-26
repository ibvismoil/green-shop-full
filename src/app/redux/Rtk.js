import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const postApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_GREENSHOP_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${localStorage.getItem('baseToken')}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: (api) => `${api}?access_token=67dbc36eaf06d13e0cde0c21`,
    }),
    getProductsByCategory: builder.query({
      query: (api) => api,
    }),
  }),
});

export const { useGetDataQuery , useGetProductsByCategoryQuery} = postApi;