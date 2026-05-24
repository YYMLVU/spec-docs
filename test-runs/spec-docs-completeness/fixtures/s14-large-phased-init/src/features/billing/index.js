export function calculateInvoiceTotal(lines) {
  return lines.reduce((sum, line) => sum + line.quantity * line.unitPriceCents, 0);
}
