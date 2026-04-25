import Alpine from "alpinejs";
import type { VideoStore } from "../type/video";
import { fetchData } from "../core/api";
import { VIDEOS_QUERY } from "../service/query";

export const videoStore: VideoStore = {
  items: [],
  isItemOpened: false,
  openedItemId: null,

  get openedVideo() {
    return this.items.find((item) => item._id === this.openedItemId) || null;
  },

  getVideos() {
    return this.items;
  },

  openModal(id) {
    this.openedItemId = id;
    this.isItemOpened = true;
    document.body.style.overflow = "hidden";
  },

  closeModal() {
    this.isItemOpened = false;
    this.openedItemId = null;
    document.body.style.overflow = "";
  },
};

export function init() {
  Alpine.store("videos", videoStore);

  const store = Alpine.store("videos") as VideoStore;

  fetchData({
    query: VIDEOS_QUERY,
    options: {
      start: 0,
      end: 10,
    },
  })
    .then((data: any) => {
      store.items = [...data.videos];
      console.log(videoStore.items);
    })
    .catch((err) => {
      console.error("Failed to load video:", err);
    });
}
