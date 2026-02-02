import { createAsyncThunk } from "@reduxjs/toolkit";
import { BrandListResponse } from "../types/brand-list.type";
import api from "@/src/lib/axios";

export const getBrandList = createAsyncThunk(
  "brands/list",
  async (): Promise<BrandListResponse> => {
    console.log("antes de hacer el llamado a la API...");
    try {
      const response = await api.get<BrandListResponse>(`/brand/list`);
      console.log("Brand List Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error en Brand List:", error);
      throw error;
    }
  },
);
