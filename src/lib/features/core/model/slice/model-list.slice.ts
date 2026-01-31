import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getModelList } from "../thunks/model-list.thunk";
import { ModelListResponse, ModelListState } from "../types/model-list.type";

const initialState: ModelListState = {
  modelList: null,
  loading: true,
};

const modelListSlice = createSlice({
  name: "modelList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getModelList.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getModelList.fulfilled,
      (state, action: PayloadAction<ModelListResponse>) => {
        state.modelList = action.payload.modelList;
        state.loading = false;
      },
    );

    builder.addCase(getModelList.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default modelListSlice.reducer;