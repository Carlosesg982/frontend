export interface Movement {
  id: number;
  id_Vehicles: number;
  movements: string;
  motorcyclist: string;
  mileage: number;
  created_at: string;
}

export interface MovementCreateResponse {
  movement: Movement | null;
}

export interface MovementCreateState {
  movement: Movement | null;
  loading: boolean;
  id_Vehicles: number;
  movements: 'in' | 'out';
  motorcyclist: string;
  mileage: number;
  selectedvehicle: string | null;
}