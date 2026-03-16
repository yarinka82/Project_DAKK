import type { Filter } from "./filters";
import { BASE_PROJECTS_QUERY, PROJECTS_FIELDS } from "./query";
import { getStartEnd } from "../utils/getStartEnd";

export function buildProjectQuery(filters: Filter, page: number, perPage: number) {
  const { search, category, status, city, order } = filters;
  const { start, end } = getStartEnd(page, perPage);
 const query = `
{
  "projects": ${BASE_PROJECTS_QUERY}
    | order(${order})
    [$start...$end]
    ${PROJECTS_FIELDS},

  "total": count(${BASE_PROJECTS_QUERY})
}
`;

  const options = {
    start,
    end,
    search: search,
    category,
    status,
    city,
    order,
  };

  return { query, options };
}
