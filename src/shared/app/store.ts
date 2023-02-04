import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import IngredientsSlice from "../../cookery/ingredients/api/IngredientsSlice";
import MatchingRecipesSlice from "../../cookery/matching-recipes/api/MatchingRecipesSlice";
import CookeryLayoutSlice from "../../cookery/shared/slice/LayoutSlice";
import BackofficeLayoutSlice from "../../backoffice/shared/api/LayoutSlice";
import AccountSlice from "../../security/account/api/AccountSlice";
import AuthenticationSlice from "../../security/authentication/api/AuthenticationSlice";

export const store = configureStore({
  reducer: {
    authentication: AuthenticationSlice,
    account: AccountSlice,

    ingredients: IngredientsSlice,
    matchingRecipes: MatchingRecipesSlice,
    cookeryLayout: CookeryLayoutSlice,

    backofficeLayout: BackofficeLayoutSlice,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
