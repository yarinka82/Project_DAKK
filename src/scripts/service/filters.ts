import { SORT_OPTIONS, type SortKey } from "../../data/sortOptions";
import { getLocaleFromURL } from "../utils/getLocaleFromURL";

export interface Filter {
//   page: number;
  status: string | null;
  category: string | null;
  city: string | null;
  search: string;
  order: SortKey;
  locale: string;
}

export function filtersProjects(): Filter & {
  paramsFromUrl: () => void;
  updateUrl: () => void;
} {
  return {
    // page: 1,
    status: null,
    category: null,
    city: null,
    search: "",
    order: "newest",
    locale: getLocaleFromURL(),

    paramsFromUrl() {
      const params = new URLSearchParams(window.location.search);
    //   this.page = Number(params.get("search")) || 1;
      this.category = params.get("category") || null;
      this.status = params.get("status") || null;
      this.search = params.get("search") || "";
      this.city = params.get("city") || null;

      const orderFromParams = params.get("order");
      if (orderFromParams && orderFromParams in SORT_OPTIONS) {
        this.order = orderFromParams as SortKey;
      } else {
        this.order = "newest";
      }
    },

    updateUrl() {
      const params = new URLSearchParams();

      const buildParams = (key: string, value: string | null | undefined) => {
        if (value === null || value === "" || value === undefined) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      };

    //   buildParams("page", String(this.page));
      buildParams('category',this.category);
      buildParams('status', this.status);
      buildParams('search', this.search);
      buildParams('city', this.city);
      buildParams('order', this.order);

      const newUrl =
        window.location.pathname + "?" + params.toString + window.location.hash;

      window.history.replaceState({}, "", newUrl);
    },
  };
}
