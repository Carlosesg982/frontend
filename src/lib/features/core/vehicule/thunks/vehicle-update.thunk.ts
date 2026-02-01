import { createAsyncThunk } from "@reduxjs/toolkit";
import { VehicleUpdateResponse } from "../types/vehicule-update.type";
import api from "@/src/lib/axios";
import { RootState } from "@/src/lib/store";

export const putVehicleUpdate = createAsyncThunk(
  "vehicle/update",
  async (_, { getState }): Promise<VehicleUpdateResponse> => {
    const state = getState() as RootState;
    const id = state.vehicleUpdate.id;
    const id_brand = state.vehicleCreate.id_brand;
    const id_model = state.vehicleCreate.id_model;
    const plate = state.vehicleCreate.plate;
    const response = await api.put<VehicleUpdateResponse>(`/vehicles/${id}`, { id_brand, id_model, plate });
    return response.data;
  },
);