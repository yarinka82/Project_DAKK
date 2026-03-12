import "./css/main.css";

interface PageModule {
  init: () => void;
}

const routes: Record<string, () => Promise<PageModule>> = {
  map: () => import("./scripts/pages/map"),
  home: () => import("./scripts/pages/home"),
  news: () => import("./scripts/pages/news"),
  projects: () => import("./scripts/pages/projects"),
  video: () => import("./scripts/pages/video"),
  "project-single": () => import("./scripts/pages/project-single"),
};

const page = document.body.dataset.page;

if (page && routes[page]) {
  routes[page]()
    .then((module) => {
      module.init();
    })
    .catch((err) => {
      console.error("Failed to load the page script:", err);
    });
}
