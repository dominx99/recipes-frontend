import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/api/IngredientsSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
