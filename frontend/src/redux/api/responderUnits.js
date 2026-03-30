import { apiSlice } from "./apiSlice";

export const cctvApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResponderUnit: builder.query({
      query: (id) => "/responderUnit/" + id,
      providesTags: ["Units"],
    }),
    updateResponderUnit: builder.mutation({
      query: ({ id, body }) => ({
        url: "/responderUnit/" + id,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Units"],
    }),
    getResponderUnits: builder.query({
      query: ({ field, value, search }) =>
        `/responderUnits?start=0&limit=20&field=${field}&value=${value}&search=${search}`,
      providesTags: ["Units"],
    }),
    createResponderUnit: builder.mutation({
      query: (body) => ({
        url: "responderUnit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Units"],
    }),
    deleteResponderUnit: builder.mutation({
      query: (id) => ({
        url: "/responderUnit/" + id,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Units"],
    }),
  }),
});

export const {
  useCreateResponderUnitMutation,
  useDeleteResponderUnitMutation,
  useGetResponderUnitQuery,
  useGetResponderUnitsQuery,
  useUpdateResponderUnitMutation,
} = cctvApiSlice;
