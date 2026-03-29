import * as express from "express";
import { UserDocument, UserType } from "./model/User.model";

declare global {
  namespace Express {
    interface User {
      _id: string;
    }
    interface Request {
      user?: { _id: string };
    }
  }
}
