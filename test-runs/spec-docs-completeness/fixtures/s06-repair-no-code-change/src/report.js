export function renderReport(items) {
  return items.map((item) => item.title).join("\n");
}