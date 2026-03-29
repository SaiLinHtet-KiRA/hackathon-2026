export default interface SearchQuery<T> {
  start: number;
  limit: number;
  field?: keyof T;
  value?: string;
  search?: string;
  sort?: keyof T;
}
