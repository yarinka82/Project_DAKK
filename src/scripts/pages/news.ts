import Alpine from "alpinejs";
import { fetchData } from "../core/api";
import { NEWS_QUERY } from "../service/query";
import type { NewsStore } from "../type/news";
import { newsTmpData } from "../../data/news/news-tmp";
import { initNewsStore } from "../../stores/initNewsStore";
import { getUrl, validationNew } from "./news-single";

const MAX_SYMBOLS_TO_SHOW = 150;

const newsSectionEl = document.querySelector(".section-news");

export const newsStore: NewsStore = {
  items: [],
  isAllDownloaded: false,
  page: { current: 0, pageLength: 10 },
  isItemOpened: false,
  openedItemId: null,
  isLoading: false,

  getNews() {
    return this.items;
  },
  setNews(newsArr) {
    this.items = [...newsArr];
  },
  getCurrentPublication() {
    return this.openedItemId;
  },
  setCurrentPublication(id: string | null) {
    this.openedItemId = id;
  },
  getPublicationStatus() {
    return this.isItemOpened;
  },
  setPublicationStatus(isOpened: boolean) {
    this.isItemOpened = isOpened;
  },
  getIsAllDownloaded() {
    return this.isAllDownloaded;
  },
  setIsAllDownloaded(bool: boolean) {
    this.isAllDownloaded = bool;
  },
  getCurrentPage() {
    return this.page.current;
  },
  setCurrentPage(num: number) {
    this.page.current = num;
  },
  getPageLength() {
    return this.page.pageLength;
  },
};

export function init() {
  initNewsStore();
  loadMore();
}

export function loadMore() {
  const newsStore = Alpine.store("news") as NewsStore;

  if (newsStore.isAllDownloaded) return;
  if (newsStore.isLoading) return;

  newsStore.isLoading = true;

  const currentPage = newsStore.getCurrentPage();
  const itemsToLoad = newsStore.getPageLength();

  fetchData({
    query: NEWS_QUERY,
    options: {
      start: currentPage * itemsToLoad,
      end: (currentPage + 1) * itemsToLoad - 1,
    },
  })
    .then((data: any) => {
      // !! Temporary data
      //newsStore.setNews(newsTmpData);

      newsStore.setNews(data.news);
      newsStore.setIsAllDownloaded(newsStore.items.length === data.total);
      newsStore.setCurrentPage(currentPage + 1);

      validationNew();
    })
    .catch((err) => {
      console.error("Failed to load news items:", err);
    })
    .finally(() => {
      newsStore.isLoading = false;
    });
}

export function cutTextFn(text: string, length: number = MAX_SYMBOLS_TO_SHOW) {
  return text.length <= length ? text : text.slice(0, length) + " ...";
}

export function setPublication(id: string) {
  const newsStore = Alpine.store("news") as NewsStore;

  newsStore.setCurrentPublication(id);
  newsStore.setPublicationStatus(true);
  scrollToTopOfPublication();
  getUrl(id);
}

export function scrollToTopOfPublication(): void {
  setTimeout(() => {
    newsSectionEl?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 1);
}
