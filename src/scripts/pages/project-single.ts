import { leaflet } from "./leaflet";
import { getPartsPath } from "../utils/getPartsPath";

export async function init() {
  const data = await getPartsPath();
  if (!data?.slug) {
    document.body.innerHTML =
      "<h1 style='text-align:center'>404 — Нічого не знайдено</h1>";
    return;
  } else {
    leaflet(data.slug);
  }

  console.log("test leaflet");
}
