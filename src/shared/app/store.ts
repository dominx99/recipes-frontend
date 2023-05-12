import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import IngredientsSlice from "../../cookery/ingredients/api/IngredientsSlice";
import MatchingRecipesSlice from "../../cookery/matching-recipes/api/MatchingRecipesSlice";
import CookeryLayoutSlice from "../../cookery/shared/slice/LayoutSlice";
import BackofficeLayoutSlice from "../../backoffice/shared/api/LayoutSlice";
import AccountSlice from "../../security/account/api/AccountSlice";
import AuthenticationSlice from "../../security/authentication/api/AuthenticationSlice";
import FavoriteRecipesSlice from "../../cookery/favorite-recipes/api/FavoriteRecipesSlice";
import MyRecipesSlice from "../../cookery/my-recipes/api/MyRecipesSlice";
import MeasuresSlice from "../../cookery/measures/api/MeasuresSlice";
import BackofficePublishRecipeRequestsSlice from "../../backoffice/publish-requests/recipes/api/PublishRecipeRequestsSlice";

export const store = configureStore({
  reducer: {
    authentication: AuthenticationSlice,
    account: AccountSlice,

    ingredients: IngredientsSlice,
    matchingRecipes: MatchingRecipesSlice,
    cookeryLayout: CookeryLayoutSlice,
    cookeryFavoriteRecipes: FavoriteRecipesSlice,
    cookeryMyRecipes: MyRecipesSlice,
    cookeryMeasures: MeasuresSlice,

    backofficeLayout: BackofficeLayoutSlice,
    backofficePublishRecipeRequests: BackofficePublishRecipeRequestsSlice,
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
