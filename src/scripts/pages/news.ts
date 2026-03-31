import Alpine from "alpinejs";
import { fetchData } from "../core/api";
import { NEWS_QUERY } from "../service/query";

export function init() {
  fetchData({
    query: NEWS_QUERY,
    options: {
      start: 0,
      end: 10,
    },
  })
    .then((data: any) => {
      (Alpine.store("news") as any).setNews(data.news);
    })
    .catch((err) => {
      console.error("Failed to load news items:", err);
    });
}

export function descriptionCutting(
  text: string,
  symbolQuantity: number = 100,
): string {
  return typeof text === "string" ? text.slice(0, symbolQuantity) + "..." : "";
}
