import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postMovementList } from "../thunks/movement-list.thunk";
import { MovementListResponse, MovementListState } from "../types/movement-list.type";

const initialState: MovementListState = {
  movements: null,
  loading: true,
  motorcyclist: "",
};

const movementListSlice = createSlice({
  name: "movementList",
  initialState,
  reducers: {
    setMotorcyclist(state, action: PayloadAction<string>) {
      state.motorcyclist = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postMovementList.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      postMovementList.fulfilled,
      (state, action: PayloadAction<MovementListResponse>) => {
        state.movements = action.payload.movements;
        state.loading = false;
      },
    );

    builder.addCase(postMovementList.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setMotorcyclist } = movementListSlice.actions;
export default movementListSlice.reducer;