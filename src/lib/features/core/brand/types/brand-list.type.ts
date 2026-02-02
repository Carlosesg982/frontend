export interface BrandList {
  id: number;
  name: string;
}

export type BrandListResponse = BrandList[];

export interface BrandListState {
  brandList: BrandList[] | null;
  loading: boolean;
}