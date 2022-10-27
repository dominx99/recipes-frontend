import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./ingredients/api/IngredientsSlice";
import { matchingRecipesSlice } from "./matching-recipes/api/MatchingRecipesSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    matchingRecipes: matchingRecipesSlice.reducer,
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
