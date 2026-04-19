import Alpine from "alpinejs";
import { getProjects } from "../scripts/service/getProjects";
import type { ProjectsStore } from "../scripts/type/project";

let initPromise: Promise<any[]> | null = null;

export function initProjectsStore() {
  Alpine.store<"projects">("projects", {
    projects: [],
    isReady: false,
    isLoading: false,
    error: null,

    async init(force = false) {
      if (!force && (this.isReady || this.isLoading)) return this.projects;

      if (!force && initPromise) return initPromise;

      initPromise = (async () => {
        this.isLoading = true;
        try {
          const data = await getProjects();

          this.projects = data;
          this.isReady = true;
          return data;
        } catch (error) {
          this.error = (error as Error).message;
          return [];
        } finally {
          this.isLoading = false;
          initPromise = null;
        }
      })();

      return initPromise;
    },
  } satisfies ProjectsStore);
}
