import { apiSlice } from "./apiSlice";

export const cctvApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReport: builder.query({
      query: (id) => "/report/" + id,
      providesTags: ["Report"],
    }),
    updateReport: builder.mutation({
      query: (body) => ({
        url: "/report/" + body._id,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Report"],
    }),
    getReports: builder.query({
      query: ({ field, value, search }) => `/report?start=0&limit=20&`,
      providesTags: ["Report"],
    }),
    createReport: builder.mutation({
      query: (body) => ({
        url: "/report",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Report"],
    }),
    deleteReport: builder.mutation({
      query: (id) => ({
        url: "/report/" + id,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Report"],
    }),
  }),
});

export const {
  useCreateReportMutation,
  useDeleteReportMutation,
  useGetReportQuery,
  useGetReportsQuery,
  useUpdateReportMutation,
} = cctvApiSlice;
