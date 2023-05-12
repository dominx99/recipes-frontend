import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from "@reduxjs/toolkit";
import { Recipe } from "../../../../cookery/matching-recipes/domain/MatchingRecipe";
import { RootState } from "../../../../shared/app/store";
import { acceptRecipeRequest, fetchAllRequestedRecipes, rejectRecipeRequest } from "./RequestedRecipesAPI";

export const requestedRecipesAdapter = createEntityAdapter<Recipe>({
  selectId: (recipe) => recipe.id,
});

interface PublishRecipeRequestsState {
  requestedRecipes: EntityState<Recipe>;
  loading: {
    requestedRecipes: boolean,
  },
  page: number,
  has_next_page: boolean,
}

const initialState: PublishRecipeRequestsState = {
  requestedRecipes: requestedRecipesAdapter.getInitialState(),
  loading: {
    requestedRecipes: false,
  },
  page: 1,
  has_next_page: false,
}

export const fetchAllRequestedRecipesAsync = createAsyncThunk(
  'publishRecipeRequests/fetchAllRequestedRecipes',
  async (page: number) => {
    const response = await fetchAllRequestedRecipes(page);

    return response.data;
  }
);

export const acceptRecipeRequestAsync = createAsyncThunk(
  'publishRecipeRequests/acceptRecipeRequest',
  async (recipeId: string) => {
    acceptRecipeRequest(recipeId);
  }
);

export const rejectRecipeRequestAsync = createAsyncThunk(
  'publishRecipeRequests/rejectRecipeRequest',
  async (recipeId: string) => {
    rejectRecipeRequest(recipeId);
  }
);

export const publishRecipeRequestsSlice = createSlice({
  name: 'publishRecipeRequests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRequestedRecipesAsync.pending, (state) => {
        state.loading.requestedRecipes = true;
      })
      .addCase(fetchAllRequestedRecipesAsync.fulfilled, (state, action) => {
        state.loading.requestedRecipes = false;

        if (action.payload.meta.page === 1) {
          requestedRecipesAdapter.setAll(state.requestedRecipes, action.payload.data);
        } else {
          requestedRecipesAdapter.addMany(state.requestedRecipes, action.payload.data);
        }

        state.page = action.payload.meta.page;
        state.has_next_page = action.payload.meta.has_next_page;
      })
      .addCase(acceptRecipeRequestAsync.fulfilled, (state, action) => {
        requestedRecipesAdapter.removeOne(state.requestedRecipes, action.meta.arg);
      })
      .addCase(rejectRecipeRequestAsync.fulfilled, (state, action) => {
        requestedRecipesAdapter.removeOne(state.requestedRecipes, action.meta.arg);
      })
  }
});

export const requestedRecipesSelectors = requestedRecipesAdapter.getSelectors<RootState>(
  (state: RootState) => state.backofficePublishRecipeRequests.requestedRecipes
);

export const selectRequestedRecipesLoading = (state: RootState) => state.backofficePublishRecipeRequests.loading.requestedRecipes;
export const requestedRecipesPageSelector = (state: RootState) => state.backofficePublishRecipeRequests.page;
export const requestedRecipesHasNextPageSelector = (state: RootState) => state.backofficePublishRecipeRequests.has_next_page;

export default publishRecipeRequestsSlice.reducer;
