import { createAsyncThunk } from "@reduxjs/toolkit";
import { BrandListResponse } from "../types/brand-list.type";
import api from "@/src/lib/axios";

export const getBrandList = createAsyncThunk(
  "brands/list",
  async (): Promise<BrandListResponse> => {
      const response = await api.get<BrandListResponse>(`/brand/list`);
      return response.data;
  },
);
