import { VehicleList } from './vehicle-list.type';

export interface VehicleUpdate {
  id: number;
  id_brand: number;
  id_model: number;
  plate: string;
}

export interface VehicleUpdateResponse {
  vehicle: VehicleList | null;
}

export interface VehicleUpdateState {
  vehicle: VehicleList | null;
  loading: boolean;
  id: number;
  isEditing: boolean;
}