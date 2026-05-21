export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

export function discountForBillingTier(tier) {
  if (tier === "enterprise") return 0.25;
  if (tier === "growth") return 0.10;
  return 0;
}
