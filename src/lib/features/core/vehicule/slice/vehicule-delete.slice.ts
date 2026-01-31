import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteVehicleDelete } from "../thunks/vehicule-delete.thunk";
import { VehicleDeleteResponse, VehicleDeleteState } from "../types/vehicule-delete.type";

const initialState: VehicleDeleteState = {
  isDelete: null,
  loading: true,
  id_vehicule: 0,
};

const vehicleDeleteSlice = createSlice({
  name: "vehicleDelete",
  initialState,
  reducers: {
    setIdVehicule(state, action: PayloadAction<number>) {
      state.id_vehicule = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(deleteVehicleDelete.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteVehicleDelete.fulfilled,
      (state, action: PayloadAction<VehicleDeleteResponse>) => {
        state.isDelete = action.payload.isDelete;
        state.loading = false;
      },
    );

    builder.addCase(deleteVehicleDelete.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setIdVehicule } = vehicleDeleteSlice.actions;
export default vehicleDeleteSlice.reducer;