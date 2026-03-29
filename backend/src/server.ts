import expressServer from "./server/expressServer";
import { connectDB } from "./util/mongoose";

async function main() {
  await connectDB();
  expressServer.startServer();
}

main();
