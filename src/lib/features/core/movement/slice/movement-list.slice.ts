import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postMovementList } from "../thunks/movement-list.thunk";
import { MovementListResponse, MovementListState } from "../types/movement-list.type";

const initialState: MovementListState = {
  movements: null,
  loading: true,
  filterMotorcyclist: "",
  selectedMotorcyclist: "",
  filterIdVehicles: 0,
  selectedIdVehicles: 0,
  filterCreatedAt: null,
  selectedCreatedAt: null,
  hasActiveFilters: true,
};

const movementListSlice = createSlice({
  name: "movementList",
  initialState,
  reducers: {
    setHasActiveFilters(state) {
      state.hasActiveFilters = state.filterCreatedAt === state.selectedCreatedAt 
      && state.filterIdVehicles === state.selectedIdVehicles 
      && state.filterMotorcyclist === state.selectedMotorcyclist;
    },
    setSearchFilters(state) {
      state.filterCreatedAt = state.selectedCreatedAt;
      state.filterIdVehicles = state.selectedIdVehicles;
      state.filterMotorcyclist = state.selectedMotorcyclist;
      state.hasActiveFilters = true;
    },
    setReset(state) {
      state.filterMotorcyclist = "";
      state.selectedMotorcyclist = "";
      state.filterIdVehicles = 0;
      state.selectedIdVehicles = 0;
      state.filterCreatedAt = null;
      state.selectedCreatedAt = null;
    },
    setSelectedMotorcyclist(state, action: PayloadAction<string>) {
      state.selectedMotorcyclist = action.payload;
    },
    setSelectedIdVehicles(state, action: PayloadAction<number>) {
      state.selectedIdVehicles = action.payload;
    },
    setSelectedCreatedAt(state, action: PayloadAction<string | null>) {
      state.selectedCreatedAt = action.payload;
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

export const {
  setHasActiveFilters,
  setSelectedMotorcyclist,
  setSelectedIdVehicles,
  setSelectedCreatedAt,
  setSearchFilters,
  setReset
} = movementListSlice.actions;
export default movementListSlice.reducer;