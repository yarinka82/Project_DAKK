import Alpine from "alpinejs";
import { getCategories } from "../scripts/service/getCategories";
import type { CategoriesStore } from "../scripts/type/filters";

let initPromise: Promise<any> | null = null;

export function initCategoriesStore() {
  Alpine.store<"categories">("categories", {
    list: [],
    isReady: false,

    async init() {
      if (this.isReady) return this.list;

      if (initPromise) return initPromise;

      initPromise = (async () => {
        const data = await getCategories();
        this.list = data;
        this.isReady = true;
        initPromise = null;
        return data;
      })();
      return initPromise;
    },
  } satisfies CategoriesStore);
}
