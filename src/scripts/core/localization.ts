import Alpine from "alpinejs";
import { projectsData } from "../../data/dictionary/projects";
import type { Field, LocaleStore } from "../type/lang";

export function localization() {
  return {
    projectsData,

    t(field: Field) {
      return (
        field[(Alpine.store("locale") as LocaleStore).current] ||
        field.uk ||
        field.en
      );
    },
  };
}
