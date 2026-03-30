import { apiSlice } from "./apiSlice";

export const cctvApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUnit: builder.query({
      query: (id) => "/unit/" + id,
      providesTags: ["Units"],
    }),
    updateUnit: builder.mutation({
      query: (body) => ({ url: "/unit/" + body._id, method: "PATCH", body }),
      invalidatesTags: ["Units"],
    }),
    getUnits: builder.query({
      query: ({ field, value, search }) =>
        `/units?start=0&limit=20&field=${field}&value=${value}&search=${search}`,
      providesTags: ["Units"],
    }),
    createUnit: builder.mutation({
      query: (body) => ({
        url: "/unit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Units"],
    }),
    deleteUnit: builder.mutation({
      query: (id) => ({
        url: "/unit/" + id,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Units"],
    }),
  }),
});

export const {
  useCreateUnitMutation,
  useDeleteUnitMutation,
  useGetUnitQuery,
  useGetUnitsQuery,
  useUpdateUnitMutation,
} = cctvApiSlice;
