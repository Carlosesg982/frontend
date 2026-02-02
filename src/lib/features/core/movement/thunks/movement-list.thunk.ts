import { createAsyncThunk } from "@reduxjs/toolkit";
import { MovementListResponse } from "../types/movement-list.type";
import api from "@/src/lib/axios";
import { RootState } from "@/src/lib/store";

export const postMovementList = createAsyncThunk(
  "movement/list",
  async (_, { getState }): Promise<MovementListResponse> => {
    const state = getState() as RootState;
    const motorcyclist = state.movementList.motorcyclist;
    const response = await api.post<MovementListResponse>(`/movements/list/`, { p_motorcyclist: motorcyclist });
    
    return response.data;
  },
);