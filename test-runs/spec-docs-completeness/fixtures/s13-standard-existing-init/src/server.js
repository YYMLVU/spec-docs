import { handleCreateOrder } from "./routes/orders.js";

export function routeRequest(request) {
  if (request.method === "POST" && request.path === "/orders") {
    return handleCreateOrder(request.body);
  }

  return { status: 404, body: { error: "not found" } };
}
