import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://hackathon-2026-onj1.onrender.com",
  credentials: "include",
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["CCTV", "Incident", "Report", "Incidents", "Units"],
  endpoints: () => ({}),
});
