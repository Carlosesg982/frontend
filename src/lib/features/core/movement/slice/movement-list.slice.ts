import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postMovementList } from "../thunks/movement-list.thunk";
import { MovementListResponse, MovementListState } from "../types/movement-list.type";

const initialState: MovementListState = {
  movements: null,
  loading: true,
  motorcyclist: "",
  id_vehicles: 0,
  created_at: null,
};

const movementListSlice = createSlice({
  name: "movementList",
  initialState,
  reducers: {
    setMotorcyclist(state, action: PayloadAction<string>) {
      state.motorcyclist = action.payload;
    },
    setIdVehicles(state, action: PayloadAction<number>) {
      state.id_vehicles = action.payload;
    },
    setCreatedAt(state, action: PayloadAction<string | null>) {
      state.created_at = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postMovementList.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      postMovementList.fulfilled,
      (state, action: PayloadAction<MovementListResponse>) => {
        state.movements = action.payload.movements;
        state.loading = false;
      },
    );

    builder.addCase(postMovementList.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setMotorcyclist, setIdVehicles, setCreatedAt } = movementListSlice.actions;
export default movementListSlice.reducer;