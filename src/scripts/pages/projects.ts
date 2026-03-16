import { fetchData } from "../core/api";
import type { Filter } from "../service/filters";
import {
  NEW_QUERY,
  NEWS_QUERY,
  PROJECT_QUERY,
  VIDEOS_QUERY,
} from "../service/query";
import type { Project } from "../type/project";
import { buildProjectQuery } from "../service/buildProjectsQuery";
import { getStartEnd } from "../utils/getStartEnd";
import type { New } from "../type/news";

export function loadProjects(filters: Filter) {
  return {
    projects: [] as Partial<Project>[],
    isLoading: false,
    error: null,
    hasMore: true,
    page: 1,
    perPage: 6,

    async init() {
      this.reset();
      if (this.isLoading) return;
      await this.load();
    },

    async load() {
      if (this.isLoading || !this.hasMore) return;
      this.isLoading = true;
      const { query, options } = buildProjectQuery(
        filters,
        this.page,
        this.perPage,
      );
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
      // test
      const slug = "central-park";

      const project = await fetchData<Project>({
        query: PROJECT_QUERY,
        options: { slug },
      });
      console.log("🚀 ~ loadProjects ~ project:", project);

      const { start, end } = getStartEnd(1, this.perPage);

      const news = await fetchData<{
        news: New[];
        total: number;
      }>({
        query: NEWS_QUERY,
        options: {
          start,
          end,
        },
      });
      console.log("🚀 ~ loadProjects ~ news:", news);

      const slug1 = "building-counter";
      const newSingle = await fetchData<New>({
        query: NEW_QUERY,
        options: { slug: slug1 },
      });

      const videos = await fetchData({
        query: VIDEOS_QUERY,
        options: {
          start,
          end,
        },
      });
      console.log("🚀 ~ loadProjects ~ videos:", videos);

      // end test
    },

    reset() {
      this.projects = [];
      this.isLoading = false;
      this.hasMore = true;
      this.page = 1;
      this.isInit = false;
    },
  };
}
