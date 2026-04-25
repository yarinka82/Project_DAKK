import Alpine from "alpinejs";
import type {
  Categories,
  CategoriesStore,
  FiltersStore,
} from "../type/filters";
import type { Project, ProjectsStore } from "../type/project";
import { getCashed } from "./getCashed";
import { fetchData } from "../core/api";
import { CATEGORY_QUERY, PROJECT_All_QUERY } from "./query";
import type { LocaleStore } from "../type/lang";

export async function loadAllDataProjects() {
  const categoriesStore = Alpine.store("categories") as CategoriesStore;
  const filtersStore = Alpine.store("filters") as FiltersStore;
  const projectsStore = Alpine.store("projects") as ProjectsStore;
  const localeStore = Alpine.store("locale") as LocaleStore;
  const locale = localeStore.current;

  projectsStore.setloading(true);

  const [categories, projects] = await Promise.all([
    getCashed("categories", () =>
      fetchData<Categories[]>({
        query: CATEGORY_QUERY,
        options: { locale },
      }),
    ),
    getCashed("projects", () =>
      fetchData<Project[]>({ query: PROJECT_All_QUERY }),
    ),
  ]);

  try {
    if (categories) {
      categoriesStore.set(categories);
    }
    filtersStore.init();
    if (projects) {
      projectsStore.set(projects);
    }
  } catch (err) {
    console.error(err);
    projectsStore.setError((err as Error).message);
  } finally {
    projectsStore.setloading(false);
  }
}
