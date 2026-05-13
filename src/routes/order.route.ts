import { orderService } from "../services/order.service";
import type { Order, Req, Res } from "../types";
import { extractRequestInfo, sendResponse } from "../utils";

export const orderRoute = async (req: Req, res: Res) => {
  const { method, params, body } =
    await extractRequestInfo<Omit<Order, "id">>(req);
  const orderId = params[1]; //  /order/:id

  try {
    // GET /order - list all orders
    if (method === "GET" && !orderId) {
      const orders = await orderService.get();
      sendResponse(
        res,
        { message: "Orders retrieved successfully", data: orders },
        200,
      );
      return;
    }

    // GET /order/:id - get order by id
    if (method === "GET" && orderId) {
      const order = await orderService.getById(orderId);
      sendResponse(
        res,
        { data: order, message: order ? undefined : "Not found" },
        order ? 200 : 404,
      );
      return;
    }

    // POST /order - create order
    if (method === "POST" && body) {
      const newOrder = await orderService.create(body);
      sendResponse(
        res,
        { message: "Order created successfully", data: newOrder },
        201,
      );
      return;
    }

    // PUT /order/:id - update order
    if (method === "PUT" && orderId && body) {
      const updated = await orderService.update(orderId, body);
      sendResponse(
        res,
        { data: updated, message: updated ? undefined : "Not found" },
        updated ? 200 : 404,
      );
      return;
    }

    // DELETE /order/:id - delete order
    if (method === "DELETE" && orderId) {
      const deleted = await orderService.delete(orderId);
      sendResponse(
        res,
        { message: deleted ? "Order deleted successfully" : "Not found" },
        deleted ? 200 : 404,
      );
      return;
    }

    sendResponse(res, { message: "not allowed" }, 405);
  } catch (error) {
    sendResponse(
      res,
      { message: error instanceof Error ? error.message : "Server error" },
      500,
    );
  }
};
