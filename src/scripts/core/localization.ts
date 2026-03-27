import Alpine from "alpinejs";
import { projectsData } from "../../data/dictionary/projects";
import type { Field, LocaleStore } from "../type/lang";
import { statusLang } from "../../data/dictionary/statusLang";
import { DEFAULT_LANG, SUPPORTED_LANG } from "../../data/lang";
import { SORT_OPTIONS } from "../../data/sortOptions";

export function localization() {
  return {
    projectsData,
    statusLang,
    SORT_OPTIONS,

    t(field: Field) {
      return (
        field[(Alpine.store("locale") as LocaleStore).current] ||
        field.uk ||
        field.en
      );
    },

    l(link: string) {
      const locale = (Alpine.store("locale") as LocaleStore).current;
      if (!SUPPORTED_LANG.includes(locale)) {
        return link;
      }
      if (locale === DEFAULT_LANG) {
        return link;
      }
      return `/${locale}${link}`;
    },
  };
}
