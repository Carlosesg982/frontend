import { createAsyncThunk } from "@reduxjs/toolkit";
import { MovementListResponse } from "../types/movement-list.type";
import api from "@/src/lib/axios";
import { RootState } from "@/src/lib/store";

export const postMovementList = createAsyncThunk(
  "movement/list",
  async (_, { getState }): Promise<MovementListResponse> => {
    const state = getState() as RootState;
    const motorcyclist = state.movementList.motorcyclist;
    const id_vehicles = state.movementList.id_vehicles;
    const created_at = state.movementList.created_at ? new Date(state.movementList.created_at) : null;
    const response = await api.post<MovementListResponse>(`/movements/list/`, { motorcyclist, id_vehicles, created_at });
    return response.data;
  },
);