import type { SUPPORTED_LANG } from "../../data/lang";

export type Lang = (typeof SUPPORTED_LANG)[number];

export type Field = {
  [key in Lang]: string;
};

export interface LocaleStore {
  current: Lang;

  t(field: Field): string;

  set(lang: Lang): void;
}
