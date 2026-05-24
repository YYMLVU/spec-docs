export function createOrderDraft(customerId, items) {
  return {
    customerId,
    items,
    status: "draft"
  };
}
