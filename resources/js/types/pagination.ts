export interface PaginatedLink {
  url: string | null;
  label: string;
  active: boolean;
  page: number | null;
}

export interface PaginatedMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  links: PaginatedLink[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface Paginated<T> {
  data: T[];

  links: {
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
  };

  meta: PaginatedMeta;
}


