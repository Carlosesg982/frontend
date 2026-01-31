import { createAsyncThunk } from "@reduxjs/toolkit";
import { ModelListResponse } from "../types/model-list.type";
import api from "@/src/lib/axios";

export const getModelList = createAsyncThunk(
  "model/list",
  async (): Promise<ModelListResponse> => {
    const response = await api.get<ModelListResponse>(`/model/list`);
    return response.data;
  },
);
