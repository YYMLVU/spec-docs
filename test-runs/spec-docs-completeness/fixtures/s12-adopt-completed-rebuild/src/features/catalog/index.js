import { formatSku } from "../../shared/format.js";

export function describeProduct(product) {
  return {
    sku: formatSku(product.sku),
    displayName: product.name,
    available: product.stock > 0
  };
}
