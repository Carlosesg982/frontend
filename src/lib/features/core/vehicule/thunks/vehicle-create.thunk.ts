import { createAsyncThunk } from "@reduxjs/toolkit";
import { VehicleCreateResponse, VehicleCreate } from "../types/vehicule-create.type";
import api from "@/src/lib/axios";

export const postVehicleCreate = createAsyncThunk(
  "vehicle/create",
  async ({id_brand, id_model, plate}: VehicleCreate): Promise<VehicleCreateResponse> => {
    const response = await api.post<VehicleCreateResponse>(`/vehicles/add`, { id_brand, id_model, plate });
    return response.data;
  },
);