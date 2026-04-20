import Alpine from "alpinejs";
import type { NewsStore } from "../scripts/type/news";
import {
  getPost,
  resetCurrentPost as resetPost,
} from "../scripts/pages/news-single";
import {
  init as initNews,
  setPublication,
  newsStore,
  cutTextFn,
} from "../scripts/pages/news";

export function initNewsStore() {
  Alpine.store("news", newsStore as NewsStore);

  Alpine.data("news", () => ({
    init: initNews,
    cutText: cutTextFn,
    setPublication,
    getPost,
    resetPost,
  }));
}
