import { apiSlice } from "./apiSlice";

export const cctvApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCCTV: builder.query({
      query: (id) => "/cctv/" + id,
      providesTags: ["CCTV"],
    }),
    updateCCTVs: builder.mutation({
      query: (body) => ({ url: "/cctv/" + body._id, method: "PATCH", body }),
      invalidatesTags: ["CCTV"],
    }),
    getCCTVs: builder.query({
      query: ({ field, value, search }) =>
        `/cctvs?start=0&limit=20&field=${field}&value=${value}&search=${search}`,
      providesTags: ["CCTV"],
    }),
    createCCTV: builder.mutation({
      query: (body) => ({
        url: "/cctv",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CCTV"],
    }),
    deleteCCTV: builder.mutation({
      query: (id) => ({
        url: "/cctv/" + id,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["CCTV"],
    }),
  }),
});

export const {
  useCreateCCTVMutation,
  useGetCCTVQuery,
  useGetCCTVsQuery,
  useUpdateCCTVsMutation,
  useDeleteCCTVMutation,
} = cctvApiSlice;
