import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postMovementCreate } from "../thunks/movement-create.thunk";
import { MovementCreateResponse, MovementCreateState } from "../types/movement-create.type";

const initialState: MovementCreateState = {
  movement: null,
  loading: true,
  id_Vehicles: 0,
  movements: 'in',
  motorcyclist: "",
  mileage: 0,
  selectedvehicle: null,
};

const movementCreateSlice = createSlice({
  name: "movementCreate",
  initialState,
  reducers: {
    setMovements(state, action: PayloadAction<'in' | 'out'>) {
      state.movements = action.payload;
    },
    setMotorcyclist(state, action: PayloadAction<string>) {
      state.motorcyclist = action.payload;
    },
    setMileage(state, action: PayloadAction<number>) {
      state.mileage = action.payload;
    },
    setIdVehicles(state, action: PayloadAction<number>) {
      state.id_Vehicles = action.payload;
    },
    setSelectedVehicle(state, action: PayloadAction<string | null>) {
      state.selectedvehicle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postMovementCreate.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      postMovementCreate.fulfilled,
      (state, action: PayloadAction<MovementCreateResponse>) => {
        state.movement = action.payload.movement;
        state.loading = false;
      },
    );

    builder.addCase(postMovementCreate.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setMovements, setMotorcyclist, setMileage, setIdVehicles, setSelectedVehicle } = movementCreateSlice.actions;
export default movementCreateSlice.reducer;