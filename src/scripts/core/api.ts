import { createClient, isHttpError } from "@sanity/client";
import Alpine from "alpinejs";
import type { LocaleStore } from "../type/lang";

const client = createClient({
  projectId: "3o5bf3fb",
  dataset: "production",
  apiVersion: "2023-03-01",
  useCdn: true,
});

export async function fetchData<T>({
  query,
  options = {},
}: {
  query: string;
  options?: Record<string, unknown>;
}): Promise<T> {
  const locale = (Alpine.store("locale") as LocaleStore).current;

  try {
    const response = await client.fetch(query, {
      ...options,
      locale,
    });
    return response as T;
  } catch (err) {
    if (isHttpError(err)) {
      throw new Error(err.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}
