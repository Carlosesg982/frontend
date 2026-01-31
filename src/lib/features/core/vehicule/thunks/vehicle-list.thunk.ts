import { createAsyncThunk } from "@reduxjs/toolkit";
import { VehicleListResponse } from "../types/vehicle-list.type";
import api from "@/src/lib/axios";

export const getVehicleList = createAsyncThunk(
  "vehicles/list",
  async (): Promise<VehicleListResponse> => {
    const response = await api.get<VehicleListResponse>(`/vehicles/list`);
    return response.data;
  },
);
