export function indexCatalogDocument(item) {
  return {
    id: item.sku,
    text: `${item.title} ${item.description}`,
    active: item.status === "active"
  };
}
