export function createInvoice(userId, amount) {
  return { userId, amount, status: "draft" };
}