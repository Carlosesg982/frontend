import { createAsyncThunk } from "@reduxjs/toolkit";
import { MovementListResponse } from "../types/movement-list.type";
import api from "@/src/lib/axios";

export const getMovementList = createAsyncThunk(
  "movement/list",
  async (): Promise<MovementListResponse> => {
    const response = await api.get<MovementListResponse>(`/movements/list`);
    
    return response.data;
  },
);