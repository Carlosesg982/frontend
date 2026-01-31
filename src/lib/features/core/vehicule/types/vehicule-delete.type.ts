export interface VehicleDelete {
  id: number;
  deleted: boolean;
  deletedAt: string;
}

export interface VehicleDeleteResponse {
  isDelete: VehicleDelete | null;
}

export interface VehicleDeleteState {
  isDelete: VehicleDelete | null;
  loading: boolean;
  id_vehicule: number;
}