import { VehicleList } from './vehicule-list.type';

export interface VehicleCreate {
  id_brand: number;
  id_model: number;
  plate: string;
}

export interface VehicleCreateResponse {
  vehicle: VehicleList | null;
}

export interface VehicleCreateState {
  vehicle: VehicleList | null;
  loading: boolean;
  id_brand: number;
  id_model: number;
  plate: string;
}