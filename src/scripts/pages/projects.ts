import { fetchData } from "../core/api";
import { type Filter } from "../service/filters";
import type { CategorySlug, Project } from "../type/project";
import { buildProjectQuery } from "../service/buildProjectsQuery";

type CategoryGroup = {
  name: string;
  slug: CategorySlug;
  projects: Project;
};

interface LoadProjects {
  projects: Partial<Project>[];
  isLoading: boolean;
  error: unknown | null;
  hasMore: boolean;
  page: number;
  perPage: number;
  currentFilters: Partial<Filter>;
  categoryGroup: CategoryGroup[];
  isInitp: boolean;
  load: () => void;
  reload: () => void;
  reset: () => void;
  init: () => void;
}

export function loadProjects(): LoadProjects {
  return {
    projects: [],
    isLoading: false,
    error: null,
    hasMore: true,
    page: 1,
    perPage: 6,
    categoryGroup: [],
    currentFilters: {},
    isInitp: false,

    async init() {
      if (this.isInitp) return;

      window.addEventListener("filters-changed", (e) => {
        this.currentFilters = (e as CustomEvent<Partial<Filter>>).detail;
        this.reload();
      });

      window.addEventListener("popstate", () => {
        this.reload();
      });

      this.isInitp = true;
    },

    async reload() {
      const items = document.querySelectorAll(".gallery-item");

      items.forEach((element) => {
        element.classList.add("reset");
      });

      await new Promise((resolve) => setTimeout(resolve, 200));

      this.reset();
      await this.load();
      const newItems = document.querySelectorAll(".gallery-item");

      newItems.forEach((element) => {
        element.classList.add("loading");
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      newItems.forEach((element) => {
        element.classList.remove("loading");
      });
    },

    async load() {
      if (this.isLoading || !this.hasMore) return;
      this.isLoading = true;

      const { query, options } = buildProjectQuery(
        this.currentFilters,
        this.page,
        this.perPage,
      );

      if (options.mode === "group") {
        const result = await fetchData<{ category: CategoryGroup[] }>({
          query,
          options,
        });
        const group = result.category;
        this.categoryGroup = group;
        this.isLoading = false;
      } else {
        const result = await fetchData<{
          projects: Project[];
          total: number;
        }>({ query, options });
        const newProjects = result.projects;
        const total = result.total;

        this.projects = [...this.projects, ...newProjects];
        this.isLoading = false;
        if (total < this.page * this.perPage) {
          this.hasMore = false;
        }
        this.page++;
      }
    },

    reset() {
      this.projects = [];
      this.isLoading = false;
      this.hasMore = true;
      this.page = 1;
    },
  };
}
