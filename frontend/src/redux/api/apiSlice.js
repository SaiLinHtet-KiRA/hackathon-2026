import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "hhttp://localhost:4000",
  credentials: "include",
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["CCTV", "Incident", "Report", "Incidents", "Units"],
  endpoints: () => ({}),
});
