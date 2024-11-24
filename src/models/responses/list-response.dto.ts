export class ListResponseDto<T> {
  data: T[];
  total?: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;

  constructor(data: T[], total?: number, page?: number, pageSize?: number) {
    this.data = data;
    if (total !== undefined) {
      this.total = total;
    }
    if (page !== undefined) {
      this.page = Number(page);
    }
    if (pageSize !== undefined) {
      this.pageSize = Number(pageSize);
    }
    if (total !== undefined && pageSize !== undefined) {
      this.totalPages = Math.ceil(total / pageSize);
    }
  }
}
