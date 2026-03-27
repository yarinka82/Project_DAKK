import { localization } from "../core/localization.ts";
import { filtersProjects } from "../service/filters.ts";
import { getPartsPath } from "../utils/getPartsPath.ts";
import { redirect } from "../utils/redirect.ts";
import { init as initLeaflet } from "./leaflet.ts";

export async function init() {
  const { category } = getPartsPath();
  const locale = localization();
  const filters = filtersProjects();
  await filters.init();

  const categories = filters.categories;

  const isCategories = categories.some((c) => c.slug === category);

  if (!isCategories) {
    const url = `${locale.l("/projects")}`;
    const txt = locale.t(locale.projectsData.notCategory);
    redirect({ url, time: 5, txt });
  } else {
    initLeaflet();
  }
}
