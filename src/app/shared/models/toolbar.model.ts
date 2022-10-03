export type SortValue = 'createdAt' | 'name' | 'complexity';

export interface ToolbarData {
  searchValue: string,
  sortValue: SortValue,
  ascDirection: boolean
}
