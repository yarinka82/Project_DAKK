import Alpine from "alpinejs";
import { localization } from "../core/localization.ts";
import { getPartsPath } from "../utils/getPartsPath.ts";
import { redirect } from "../utils/redirect.ts";
import { loadProjects } from "./projects.ts";
import { leaflet } from "./leaflet.ts";
import { initCategoriesStore } from "../../stores/initCategoriesStore.ts";
import { initProjectsStore } from "../../stores/initProjectsStore.ts";
import type { Categories, CategoriesStore } from "../type/filters.ts";
import { initFiltersStore } from "../../stores/initFiltersStore.ts";

export function init() {
  initCategoriesStore();
  initFiltersStore();
  initProjectsStore();
  Alpine.data("pageCategoryProject", () => pageCategoryProject());
  Alpine.data("loadProjects", () => loadProjects());
  Alpine.data("leaflet", leaflet);
}

export function pageCategoryProject() {
  let initPromise: Promise<void>;
  return {
    is404: false,
    category: undefined as Categories | undefined,

    async init() {
      if (initPromise) return initPromise;

      initPromise = (async () => {
        const { category } = getPartsPath();
        const locale = localization();
        const list = await (
          Alpine.store("categories") as CategoriesStore
        ).init();
        const found = list.find((c) => c.slug === category);

        if (!found) {
          this.is404 = true;
          const url = `${locale.l("/projects")}`;
          redirect({ url, time: 5 });
        } else {
          this.category = found;
          this.setSeo();
        }
      })();
      return initPromise;
    },

    setSeo() {
      const locale = localization();
      document.title = `${locale.t(locale.projectsData.titleHead)} ${locale.t(
        locale.projectsData.page
      )} — ${this.category?.name}`;

      const meta = document.querySelector('meta[name="description"]');
      const description = this.category
        ? `${locale.t(locale.projectsData.descriptionHeadCategories)} — ${
            this.category.name
          }`
        : locale.t(locale.projectsData.descriptionHead);
      if (meta) {
        meta.setAttribute("content", description);
      }
    },
  };
}
