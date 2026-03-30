import { apiSlice } from "./apiSlice";

export const incidentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIncidentsByID: builder.query({
      query: (id) => {
        return { url: "/incidents/" + id };
      },
      providesTags: ["Incidents"],
    }),
  }),
});

export const { useGetIncidentsByIDQuery } = incidentsApiSlice;
