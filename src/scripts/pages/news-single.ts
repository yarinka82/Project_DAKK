import Alpine from "alpinejs";
import type { NewsStore, New } from "../type/news";
import { scrollToTopOfPublication } from "./news";
import { getPartsPath } from "../utils/getPartsPath";
import { localization } from "../core/localization";

export function getPost() {
  const newsStore = Alpine.store("news") as NewsStore;
  const currentId = newsStore.getCurrentPublication();
  const currentPost = newsStore
    .getNews()
    .find((item: New) => item._id === currentId);

  return currentPost || null;
}

export function resetCurrentPost() {
  const newsStore = Alpine.store("news") as NewsStore;

  newsStore.setCurrentPublication(null);
  newsStore.setPublicationStatus(false);
  scrollToTopOfPublication();
}

export function getActuellPosts(quantity: number = 3) {
  const newsStore = Alpine.store("news") as NewsStore;
  return newsStore.getNews().reverse().slice(0, quantity);
}

export function validationNew() {
  const newsStore = Alpine.store("news") as NewsStore;
  const posts = newsStore.getNews();
  const { slug } = getPartsPath();
  if (!slug) return;
  const locale = localization();
  const url = `${locale.l("/news")}`;

  const post = posts.find((n) => String(n._id) === slug) ?? null;

  if (!post) {
    window.history.replaceState({}, "", url);
    // newsStore.setCurrent(null);
    resetCurrentPost();
  } else {
    // newsStore.setCurrent(post)
    newsStore.setCurrentPublication(post._id);
    newsStore.setPublicationStatus(true);
  }
}

export function getUrl(newSlug: string) {
  const { slug } = getPartsPath();
  if (!slug) {
    const newUrl = window.location.pathname + "/" + newSlug;
    window.history.pushState({}, "", newUrl);
  } else {
    const newUrl = window.location.pathname.replace(slug, newSlug);
    window.history.pushState({}, "", newUrl);
  }
}
