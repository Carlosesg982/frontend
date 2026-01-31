export interface ModelList {
  id: number;
  name: string;
}

export interface ModelListResponse {
  modelList: ModelList[] | null;
}

export interface ModelListState {
  modelList: ModelList[] | null;
  loading: boolean;
}