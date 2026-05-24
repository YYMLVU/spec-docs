export function capturePayment(amountCents) {
  return {
    provider: "fixture-pay",
    amountCents,
    status: "captured"
  };
}
