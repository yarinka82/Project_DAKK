import Alpine from "alpinejs";
import type { LocaleStore } from "../type/lang";

export const CASHE_TTL = 24 * 60 * 60 * 1000;

let cashedData = new Map<string, any>();

export async function getCashed<T>(
  key: string,
  fetcher: () => Promise<T[]>,
): Promise<T[] | null> {
  const locale = (Alpine.store("locale") as LocaleStore).current;
  const casheKey = `${key}_${locale}`;
  
  if (cashedData.has(casheKey)) return cashedData.get(casheKey);

  const cashed = localStorage.getItem(casheKey);
  if (cashed) {
    try {
      const { data, timestamp } = JSON.parse(cashed);
      if (
        Array.isArray(data) &&
        typeof timestamp === "number" &&
        Date.now() - timestamp < CASHE_TTL
      ) {
        return data;
      } else {
        localStorage.removeItem(casheKey);
        return null;
      }
    } catch (error) {
      localStorage.removeItem(casheKey);
    }
  }

  try {
    const response = await fetcher();

    if (!Array.isArray(response)) {
      throw new Error(`Error loading ${key}`);
    }
    cashedData.set(casheKey, response);

    localStorage.setItem(
      casheKey,
      JSON.stringify({
        data: response,
        timestamp: Date.now(),
      }),
    );

    return response;
  } catch (error) {
    throw error;
  }
}
