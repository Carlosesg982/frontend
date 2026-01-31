export interface BrandList {
  id: number;
  name: string;
}

export interface BrandListResponse {
  brandList: BrandList[] | null;
}

export interface BrandListState {
  brandList: BrandList[] | null;
  loading: boolean;
}