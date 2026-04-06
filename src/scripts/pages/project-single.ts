import { fetchData } from "../core/api";
import { PROJECT_QUERY } from "../service/query";
import type { Project } from "../type/project";
import { leaflet } from "./leaflet";
import { getPartsPath } from "../utils/getPartsPath";
import { psGallery } from "../utils/psGallery";

export function init() {
  const data = getPartsPath();
  if (!data?.slug) {
    document.body.innerHTML =
      "<h1 style='text-align:center'>404 — Нічого не знайдено</h1>";
    return;
  } else {
    leaflet(data.slug);
  }
}

export function loadSingleProject() {
  return {
    project: null as Partial<Project> | null,
    isLoading: false,

    //For Gallery
    galleryData: psGallery(),


    async init() {
      this.reset();
      if (this.isLoading) return;
      await this.load();

      if (this.project?.photo?.length) {
        this.galleryData.setPhotos(this.project.photo);
        console.log("photos:", this.project?.photo);
      }
    },





    async load() {
      if (this.isLoading) return;
      this.isLoading = true;

      //real
      // const slug = window.location.pathname.split("/").pop();

      const { slug } = getPartsPath();

      try {
        this.project = await fetchData<Project>({
          query: PROJECT_QUERY,
          options: { slug },
        });
        console.log("🚀 ~ loadProjects ~ project:", this.project);
      } catch (e) {
        console.error("Error loading project: ", e);
      } finally {
        this.isLoading = false;
      }

      // end test
    },

    reset() {
      this.project = null;
      this.isLoading = false;
      this.galleryData = psGallery();
    },
  };
}
