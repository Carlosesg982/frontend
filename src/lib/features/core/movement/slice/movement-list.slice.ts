import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMovementList } from "../thunks/movement-list.thunk";
import { MovementListResponse, MovementListState } from "../types/movement-list.type";

const initialState: MovementListState = {
  movements: null,
  loading: true,
};

const movementListSlice = createSlice({
  name: "movementList",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getMovementList.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getMovementList.fulfilled,
      (state, action: PayloadAction<MovementListResponse>) => {
        state.movements = action.payload.movements;
        state.loading = false;
      },
    );

    builder.addCase(getMovementList.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default movementListSlice.reducer;