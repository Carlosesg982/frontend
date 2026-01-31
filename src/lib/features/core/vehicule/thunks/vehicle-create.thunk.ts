import { createAsyncThunk } from "@reduxjs/toolkit";
import { VehicleCreateResponse } from "../types/vehicle-create.type";
import api from "@/src/lib/axios";
import { RootState } from "@/src/lib/store";

export const postVehicleCreate = createAsyncThunk(
  "vehicle/create",
  async (_, { getState }): Promise<VehicleCreateResponse> => {
    const state = getState() as RootState;
    const id_brand = state.vehicleCreate.id_brand;
    const id_model = state.vehicleCreate.id_model;
    const plate = state.vehicleCreate.plate;
    const response = await api.post<VehicleCreateResponse>(`/vehicles/`, { id_brand, id_model, plate });
    return response.data;
  },
);