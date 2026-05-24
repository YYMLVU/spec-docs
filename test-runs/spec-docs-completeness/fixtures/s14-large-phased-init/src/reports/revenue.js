export function summarizeRevenue(invoices) {
  return invoices.reduce((sum, invoice) => sum + invoice.totalCents, 0);
}
