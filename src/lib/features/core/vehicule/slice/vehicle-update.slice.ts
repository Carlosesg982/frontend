import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { putVehicleUpdate } from "../thunks/vehicle-update.thunk";
import { VehicleUpdateResponse, VehicleUpdateState } from "../types/vehicule-update.type";

const initialState: VehicleUpdateState = {
  vehicle: null,
  loading: true,
  id: 0,
  id_brand: 0,
  id_model: 0,
  plate: "",
  isEditing: false,
};

const vehicleUpdateSlice = createSlice({
  name: "vehicleUpdate",
  initialState,
  reducers: {
    setIdBrand(state, action: PayloadAction<number>) {
      state.id_brand = action.payload;
    },
    setIdModel(state, action: PayloadAction<number>) {
      state.id_model = action.payload;
    },
    setPlate(state, action: PayloadAction<string>) {
      state.plate = action.payload;
    },
    setId(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    setIsEditing(state, action: PayloadAction<boolean>) {
      state.isEditing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(putVehicleUpdate.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      putVehicleUpdate.fulfilled,
      (state, action: PayloadAction<VehicleUpdateResponse>) => {
        state.vehicle = action.payload.vehicle;
        state.loading = false;
      },
    );

    builder.addCase(putVehicleUpdate.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setIdBrand, setIdModel, setPlate, setId, setIsEditing } = vehicleUpdateSlice.actions;
export default vehicleUpdateSlice.reducer;