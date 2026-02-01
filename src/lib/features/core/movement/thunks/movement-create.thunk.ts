import { createAsyncThunk } from "@reduxjs/toolkit";
import { MovementCreateResponse } from "../types/movement-create.type";
import api from "@/src/lib/axios";
import { RootState } from "@/src/lib/store";

export const postMovementCreate = createAsyncThunk(
  "movement/create",
  async (_, { getState }): Promise<MovementCreateResponse> => {
    const state = getState() as RootState;

    const movements = state.movementCreate.movements;
    const motorcyclist = state.movementCreate.motorcyclist;
    const mileage = state.movementCreate.mileage;
    const id_Vehicles = state.movementCreate.id_Vehicles;
    const response = await api.post<MovementCreateResponse>(`/movements`, { id_Vehicles, movements, motorcyclist, mileage });
    return response.data;
  },
);