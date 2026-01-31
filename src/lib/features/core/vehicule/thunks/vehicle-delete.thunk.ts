import { createAsyncThunk } from "@reduxjs/toolkit";
import { VehicleDeleteResponse } from "../types/vehicle-delete.type";
import api from "@/src/lib/axios";
import { RootState } from "@/src/lib/store";

export const deleteVehicleDelete = createAsyncThunk(
  "vehicle/delete",
  async (_, { getState }): Promise<VehicleDeleteResponse> => {
    const state = getState() as RootState;
    const id_vehicule = state.vehicleDelete.id_vehicule;
    const response = await api.delete<VehicleDeleteResponse>(`/vehicles/${id_vehicule}`);
    return response.data;
  },
);