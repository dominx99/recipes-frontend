import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/app/store';
import { MatchingRecipe } from '../domain/MatchingRecipe';
import { fetchMatchingRecipesByIngredients } from './MatchingRecipesAPI';

export const matchingRecipesAdapter = createEntityAdapter<MatchingRecipe>({
  selectId: (matchingRecipe) => matchingRecipe.recipe.id,
});

interface FetchMatchingMatchingRecipesByIngredientsPayload {
  ingredients: string[];
  page: number;
}

export const fetchMatchingMatchingRecipesByIngredientsAsync = createAsyncThunk(
  'matchingRecipes/matchByIngredients',
  async ({ ingredients, page }: FetchMatchingMatchingRecipesByIngredientsPayload) => {
    const response = await fetchMatchingRecipesByIngredients(ingredients, page);

    return response.data;
  }
);

interface MatchingRecipesState {
  matchingRecipes: EntityState<MatchingRecipe>;
  loading: {
    matchingRecipes: boolean,
  },
  page: number;
  has_next_page: boolean;
}

const initialState: MatchingRecipesState = {
  matchingRecipes: matchingRecipesAdapter.getInitialState(),
  loading: {
    matchingRecipes: false,
  },
  page: 1,
  has_next_page: false,
}

export const matchingRecipesSlice = createSlice({
  name: 'matchingRecipes',
  initialState,
  reducers: {
    addMatchingRecipe: (state, action) => {
      matchingRecipesAdapter.addOne(state.matchingRecipes, action.payload);
    },
    removeMatchingRecipe: (state, action) => {
      matchingRecipesAdapter.removeOne(state.matchingRecipes, action.payload);
    },
    updateMatchingRecipe: (state, action) => {
      matchingRecipesAdapter.updateOne(state.matchingRecipes, action.payload);
    },
    setMatchingRecipes: (state, action) => {
      matchingRecipesAdapter.setAll(state.matchingRecipes, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMatchingMatchingRecipesByIngredientsAsync.pending, (state) => {
      state.loading.matchingRecipes = true;
    });
    builder.addCase(fetchMatchingMatchingRecipesByIngredientsAsync.fulfilled, (state, action) => {
      state.loading.matchingRecipes = false;

      if (action.payload.meta.page === 1) {
        matchingRecipesAdapter.setAll(state.matchingRecipes, action.payload.data);
      } else {
        matchingRecipesAdapter.addMany(state.matchingRecipes, action.payload.data);
      }

      state.page = action.payload.meta.page;
      state.has_next_page = action.payload.meta.has_next_page;
    });
  }
});

export const matchingRecipeSelectors = matchingRecipesAdapter.getSelectors<RootState>(
  (state) => state.matchingRecipes.matchingRecipes,
);

export const {
  addMatchingRecipe,
  updateMatchingRecipe,
  removeMatchingRecipe,
  setMatchingRecipes
} = matchingRecipesSlice.actions;

export const selectFetchMatchingRecipesLoading = (state: RootState) => state.matchingRecipes.loading.matchingRecipes;
export const matchingRecipesCurrentPageSelector = (state: RootState) => state.matchingRecipes.page;
export const matchingRecipesHasNextPageSelector = (state: RootState) => state.matchingRecipes.has_next_page;

export default matchingRecipesSlice.reducer;
