import { FRONTEND_URL } from ".";

export const { GOOGLE_CLIENT_ID, GOOGLE_SECRET, CALLBACKURL } = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET!,
  CALLBACKURL: FRONTEND_URL + "/auth/google/callback",
};
