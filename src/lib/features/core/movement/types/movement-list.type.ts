export interface MovementList {
  id: number;
  vehicle: {
    id: number;
    plate: string;
    brand: string;
    model: string;
  };
  movements: ('in' | 'out');
  motorcyclist: string;
  mileage: number;
  created_at: string;
}

export interface MovementListResponse {
  movements: MovementList[] | null;
}

export interface MovementListState {
  movements: MovementList[] | null;
  loading: boolean;
}