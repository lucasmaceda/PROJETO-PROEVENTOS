export class IPagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class IPaginatedResult<T> {
  result: T;
  pagination: IPagination;
}
