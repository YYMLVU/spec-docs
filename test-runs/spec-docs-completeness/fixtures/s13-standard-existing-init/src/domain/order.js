export function createOrder(items) {
  const totalCents = items.reduce((sum, item) => sum + item.priceCents, 0);

  return {
    id: `order-${items.length}-${totalCents}`,
    items,
    totalCents
  };
}
