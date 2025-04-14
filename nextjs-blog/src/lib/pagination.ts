interface PaginationParams {
  page: number;
  pageSize: number;
}

export const getPaginationRange = ({ page, pageSize }: PaginationParams) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  return { from, to };
};

export const calculateTotalPages = (totalItems: number, pageSize: number) => {
  return Math.ceil(totalItems / pageSize) || 1;
};
