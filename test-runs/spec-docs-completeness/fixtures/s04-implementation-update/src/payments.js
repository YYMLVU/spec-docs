export function authorizePayment({ amount, currency }) {
  return { approved: amount > 0, currency };
}

export function refundPayment({ paymentId }) {
  return { refunded: true, paymentId };
}