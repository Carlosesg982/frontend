import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postVehicleCreate } from "../thunks/vehicle-create.thunk";
import { VehicleCreateResponse, VehicleCreateState } from "../types/vehicle-create.type";

const initialState: VehicleCreateState = {
  vehicle: null,
  loading: true,
  id_brand: 0,
  id_model: 0,
  plate: "",
  formOpen: false,
};

const vehicleCreateSlice = createSlice({
  name: "vehicleCreate",
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
    setFormOpen(state, action: PayloadAction<boolean>) {
      state.formOpen = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postVehicleCreate.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      postVehicleCreate.fulfilled,
      (state, action: PayloadAction<VehicleCreateResponse>) => {
        state.vehicle = action.payload.vehicle;
        state.loading = false;
      },
    );

    builder.addCase(postVehicleCreate.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setIdBrand, setIdModel, setPlate, setFormOpen } = vehicleCreateSlice.actions;
export default vehicleCreateSlice.reducer;