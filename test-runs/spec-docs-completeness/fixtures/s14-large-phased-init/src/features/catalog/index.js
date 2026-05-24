export function summarizeCatalogItem(item) {
  return {
    sku: item.sku,
    title: item.title,
    active: item.status === "active"
  };
}
