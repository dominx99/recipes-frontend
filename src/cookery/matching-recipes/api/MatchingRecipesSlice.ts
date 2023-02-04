import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/app/store';
import { MatchingRecipe } from '../domain/MatchingRecipe';
import { fetchMatchingRecipesByIngredients } from './MatchingRecipesAPI';

export const matchingRecipesAdapter = createEntityAdapter<MatchingRecipe>({
  selectId: (matchingRecipe) => matchingRecipe.recipe.id,
  sortComparer: (a, b) => a.recipe.name.localeCompare(b.recipe.name),
});

interface FetchMatchingMatchingRecipesByIngredientsPayload {
  ingredients: string[];
  next_page_url?: string | null;
}

export const fetchMatchingMatchingRecipesByIngredientsAsync = createAsyncThunk(
  'matchingRecipes/matchByIngredients',
  async ({ ingredients, next_page_url }: FetchMatchingMatchingRecipesByIngredientsPayload) => {
    const response = await fetchMatchingRecipesByIngredients(ingredients, next_page_url ? next_page_url : null);

    return response.data;
  }
);

interface MatchingRecipesState {
  matchingRecipes: EntityState<MatchingRecipe>;
  loading: {
    matchingRecipes: boolean,
  },
  next_page_url: string | null;
}

const initialState: MatchingRecipesState = {
  matchingRecipes: matchingRecipesAdapter.getInitialState(),
  loading: {
    matchingRecipes: false,
  },
  next_page_url: null,
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

      if (action.payload.is_first_page) {
        matchingRecipesAdapter.setAll(state.matchingRecipes, action.payload.data);
      } else {
        matchingRecipesAdapter.addMany(state.matchingRecipes, action.payload.data);
      }

      state.next_page_url = action.payload.next_page_url ? action.payload.next_page_url : null;
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
export const nextMatchingRecipesUrlSelector = (state: RootState) => state.matchingRecipes.next_page_url;

export default matchingRecipesSlice.reducer;
