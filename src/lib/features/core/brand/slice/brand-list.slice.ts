import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getBrandList } from "../thunks/brand-list.thunk";
import { BrandListResponse, BrandListState } from "../types/brand-list.type";

const initialState: BrandListState = {
  brandList: null,
  loading: true,
};

const brandListSlice = createSlice({
  name: "brandList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrandList.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getBrandList.fulfilled,
      (state, action: PayloadAction<BrandListResponse>) => {
        state.brandList = action.payload;
        state.loading = false;
      },
    );

    builder.addCase(getBrandList.rejected, (state) => {
      state.loading = false;
    });
  },
});
export default brandListSlice.reducer;