import { saveOrder } from "../infra/order-repository.js";

export function submitOrder(order) {
  saveOrder(order);
  return { status: "submitted" };
}