import { DEFAULT_LANG, SUPPORTED_LANG} from "../../data/lang";
import type { Lang } from "../type/lang";

export function getLocaleFromURL() {
  const path = window.location.pathname.split("/").filter(Boolean);
  const localeSegment = SUPPORTED_LANG.includes(path[0] as Lang);

  if (localeSegment) {
    return path[0];
  }

  return DEFAULT_LANG;
}
