export function buildPaymentRequest(invoice) {
  return {
    invoiceId: invoice.id,
    amountCents: invoice.totalCents,
    capture: true
  };
}
