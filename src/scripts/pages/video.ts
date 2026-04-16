import Alpine from "alpinejs";
import type { VideoStore } from "../type/video";
import { fetchData } from "../core/api";
import { VIDEOS_QUERY } from "../service/query";

export const videoStore: VideoStore = {
  items: [],
  isItemOpened: false,
  openedItemId: null,
  getVideos() {
    return this.items;
  },
};

export function init() {
  const videoStore = Alpine.store("videos") as VideoStore;

  fetchData({
    query: VIDEOS_QUERY,
    options: {
      start: 0,
      end: 10,
    },
  })
    .then((data: any) => {
      videoStore.items = [...data.videos];
      console.log(videoStore.items);
    })
    .catch((err) => {
      console.error("Failed to load video:", err);
    });
}
