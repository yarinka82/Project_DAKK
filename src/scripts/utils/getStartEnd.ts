
export function getStartEnd(page: number, perPage: number) {
  if (!Number.isInteger(page) || page < 1) {
    page = 1;
  }

  const start = (page - 1) * perPage;
  const end = start + perPage;
  return { start, end };
}
