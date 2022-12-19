import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./../ingredients/api/IngredientsSlice";
import { matchingRecipesSlice } from "./../matching-recipes/api/MatchingRecipesSlice";
import { layoutSlice } from "./../shared/slice/LayoutSlice";
import authenticationSlice from "./../authentication/api/AuthenticationSlice";
import accountSlice from "./../account/api/AccountSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    matchingRecipes: matchingRecipesSlice.reducer,
    layout: layoutSlice.reducer,
    authentication: authenticationSlice,
    account: accountSlice,
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
