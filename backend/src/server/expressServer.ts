import express, { Express } from "express";
import ExpressServerType from "./ExpressServer.type";
import { FRONTEND_URL, PORT } from "../config";
import { HandleErrorWithLogger } from "../util/error/handler";
import Routes from "../routes";
import cookieSession from "cookie-session";
import CORS from "cors";

const cookie = cookieSession({
  name: "",
  maxAge: 7 * 24 * 60 * 60,
  httpOnly: true,
  secret: "",
  sameSite: "lax",
  keys: ["brbrbr"],
});

class ExpressServer implements ExpressServerType {
  app: Express;
  constructor() {
    this.app = express();
  }
  startServer() {
    this.app.use(
      CORS({
        origin: ["https://hackathon-2026-brown.vercel.app"],
        credentials: true,
      }),
    );
    this.app.use(express.json());

    this.app.use(cookie);

    this.app.use(Routes);
    this.app.use(HandleErrorWithLogger);

    this.app.listen(PORT, () =>
      console.log("Express server is started in port", 4000),
    );
  }
}

export default new ExpressServer();
