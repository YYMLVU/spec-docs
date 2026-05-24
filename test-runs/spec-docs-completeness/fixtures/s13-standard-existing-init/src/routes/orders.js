import { createOrder } from "../domain/order.js";
import { capturePayment } from "../integrations/payment-gateway.js";

export function handleCreateOrder(body) {
  const order = createOrder(body.items);
  const payment = capturePayment(order.totalCents);

  return {
    status: 201,
    body: {
      orderId: order.id,
      paymentStatus: payment.status
    }
  };
}
