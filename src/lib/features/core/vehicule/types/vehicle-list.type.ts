export interface VehicleList {
  id: number;
  plate: string;
  brand: string;
  model: string;
  created_at: string;
  updated_at: string;
}

export interface VehicleListResponse {
  vehiclesList: VehicleList[] | null;
}

export interface VehicleListState {
  vehiclesList: VehicleList[] | null;
  loading: boolean;
}