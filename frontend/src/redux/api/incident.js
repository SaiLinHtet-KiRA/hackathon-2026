import { apiSlice } from "./apiSlice";

export const cctvApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIncident: builder.query({
      query: (id) => "/incident/" + id,
      providesTags: ["Incident"],
    }),
    updateIncident: builder.mutation({
      query: (body) => ({
        url: "/incident/" + body._id,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Incident"],
    }),
    getIncidents: builder.query({
      query: ({ field, value, search }) => `/incident?start=0&limit=20`,
      providesTags: ["Incident"],
    }),
    createIncident: builder.mutation({
      query: (body) => ({
        url: "/incident",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Incident"],
    }),
    deleteIncident: builder.mutation({
      query: (id) => ({
        url: "/incident/" + id,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Incident"],
    }),
  }),
});

export const {
  useCreateIncidentMutation,
  useDeleteIncidentMutation,
  useGetIncidentQuery,
  useGetIncidentsQuery,
  useUpdateIncidentMutation,
} = cctvApiSlice;
