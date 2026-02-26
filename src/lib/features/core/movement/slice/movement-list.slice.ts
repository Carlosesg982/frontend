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

const shouldActiveFilters = (sMotorcyclist: string, fMotorcyclist: string, sIdVehicles: number, fIdVehicles: number, 
  sCreatedAt: string | null, fCreatedAt: string | null): boolean => {
  return (
    sMotorcyclist === fMotorcyclist &&
    sIdVehicles === fIdVehicles &&
    sCreatedAt === fCreatedAt
  );
};

const movementListSlice = createSlice({
  name: "movementList",
  initialState,
  reducers: {
    setReset(state) {
      state.selectedMotorcyclist = initialState.selectedMotorcyclist;
      state.selectedIdVehicles = initialState.selectedIdVehicles;
      state.selectedCreatedAt = initialState.selectedCreatedAt;
      state.filterMotorcyclist = initialState.filterMotorcyclist;
      state.filterIdVehicles = initialState.filterIdVehicles;
      state.filterCreatedAt = initialState.filterCreatedAt;
      state.hasActiveFilters = shouldActiveFilters(state.selectedMotorcyclist, state.filterMotorcyclist,
        state.selectedIdVehicles, state.filterIdVehicles, state.selectedCreatedAt, state.filterCreatedAt);
    },
    setSelectedMotorcyclist(state, action: PayloadAction<string>) {
      state.selectedMotorcyclist = action.payload;
      state.hasActiveFilters = shouldActiveFilters(state.selectedMotorcyclist, state.filterMotorcyclist,
        state.selectedIdVehicles, state.filterIdVehicles, state.selectedCreatedAt, state.filterCreatedAt);
    },
    setSelectedIdVehicles(state, action: PayloadAction<number>) {
      state.selectedIdVehicles = action.payload;
      state.hasActiveFilters = shouldActiveFilters(state.selectedMotorcyclist, state.filterMotorcyclist,
        state.selectedIdVehicles, state.filterIdVehicles, state.selectedCreatedAt, state.filterCreatedAt);
    },
    setSelectedCreatedAt(state, action: PayloadAction<string | null>) {
      state.selectedCreatedAt = action.payload;
      state.hasActiveFilters = shouldActiveFilters(state.selectedMotorcyclist, state.filterMotorcyclist,
        state.selectedIdVehicles, state.filterIdVehicles, state.selectedCreatedAt, state.filterCreatedAt);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postMovementList.pending, (state) => {
      state.loading = true;
      state.hasActiveFilters = true;
      state.filterMotorcyclist = state.selectedMotorcyclist;
      state.filterIdVehicles = state.selectedIdVehicles;
      state.filterCreatedAt = state.selectedCreatedAt;
    });

    builder.addCase(
      postMovementList.fulfilled,
      (state, action: PayloadAction<MovementListResponse>) => {
        state.movements = action.payload.movements;
        state.loading = false;
        state.hasActiveFilters = true;
      },
    );

    builder.addCase(postMovementList.rejected, (state) => {
      state.loading = false;
      state.hasActiveFilters = true;
    });
  },
});

export const {
  setSelectedMotorcyclist,
  setSelectedIdVehicles,
  setSelectedCreatedAt,
  setReset
} = movementListSlice.actions;
export default movementListSlice.reducer;