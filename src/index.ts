import { Server, createServer } from "node:http";

import { orderRoute } from "./routes/order.route";
import type { Req } from "./types";
import { sendResponse } from "./utils";

const server: Server = createServer(async (req, res) => {
  const url = req.url ?? "/";

  if (url === "/") {
    sendResponse(res, { message: "welcome to our server" }, 200);
    return;
  }

  if (url.startsWith("/order")) {
    await orderRoute(req as Req, res);
    return;
  }

  sendResponse(res, { message: "Not Found :C" }, 404);
});

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
