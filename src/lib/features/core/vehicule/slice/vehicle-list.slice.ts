import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getVehicleList } from "../thunks/vehicle-list.thunk";
import { VehicleListResponse, VehicleListState } from "../types/vehicle-list.type";

const initialState: VehicleListState = {
  vehiclesList: null,
  loading: true,
};

const vehicleListSlice = createSlice({
  name: "vehicleList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVehicleList.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getVehicleList.fulfilled,
      (state, action: PayloadAction<VehicleListResponse>) => {
        state.vehiclesList = action.payload.vehiclesList;
        state.loading = false;
      },
    );

    builder.addCase(getVehicleList.rejected, (state) => {
      state.loading = false;
    });
  },
});
export default vehicleListSlice.reducer;