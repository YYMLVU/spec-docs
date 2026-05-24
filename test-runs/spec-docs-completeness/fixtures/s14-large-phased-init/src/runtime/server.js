import { createOrderDraft } from "../features/orders/index.js";

export function handleRequest(request) {
  if (request.path === "/orders/draft") {
    return createOrderDraft(request.customerId, request.items);
  }

  return { error: "not found" };
}
