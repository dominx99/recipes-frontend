import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/app/store';
import { MatchingRecipe, Recipe } from '../../matching-recipes/domain/MatchingRecipe';
import FavoriteRecipe from '../domain/FavoriteRecipe';
import { addRecipeToFavorite, fetchFavoriteRecipes, removeRecipeFromFavorites } from './FavoriteRecipesAPI';
import { fetchAllMatchingFavoriteRecipes } from './MatchingFavoriteRecipesAPI';

export const favoriteRecipesAdapter = createEntityAdapter<FavoriteRecipe>();
export const favoriteMatchingRecipesAdapter = createEntityAdapter<MatchingRecipe>({
  selectId: (matchingRecipe) => matchingRecipe.recipe.id,
});

interface FavoriteRecipesState {
  favoriteRecipes: EntityState<FavoriteRecipe>;
  matchingFavoriteRecipes: EntityState<MatchingRecipe>;
  nextPageMatchingFavoriteRecipesUrl: string | null;
  processingRecipeIds: string[];
  loading: {
    favoriteMatchingRecipes: boolean,
  },
}

const initialState: FavoriteRecipesState = {
  favoriteRecipes: favoriteRecipesAdapter.getInitialState(),
  matchingFavoriteRecipes: favoriteMatchingRecipesAdapter.getInitialState(),
  nextPageMatchingFavoriteRecipesUrl: null,
  processingRecipeIds: [],
  loading: {
    favoriteMatchingRecipes: false,
  },
}

export const addRecipeToFavoriteAsync = createAsyncThunk(
  'favoriteRecipes/addRecipeToFavorite',
  async (recipe: Recipe) => {
    const response = await addRecipeToFavorite(recipe);

    return response;
  }
)

export const fetchAllFavoriteRecipesAsync = createAsyncThunk(
  'favoriteRecipes/fetchAllFavoriteRecipes',
  async () => {
    const response = await fetchFavoriteRecipes();

    return response.data;
  }
)

export const fetchAllMatchingFavoriteRecipesAsync = createAsyncThunk(
  'favoriteRecipes/fetchAllMatchingFavoriteRecipes',
  async (nextPageUrl?: string) => {
    const response = await fetchAllMatchingFavoriteRecipes(nextPageUrl);

    return response.data;
  }
)

export const removeRecipeFromFavoritesAsync = createAsyncThunk(
  'favoriteRecipes/removeRecipeFromFavorites',
  async (favoriteRecipe: FavoriteRecipe) => {
    const response = await removeRecipeFromFavorites(favoriteRecipe);

    return response;
  }
)

export const favoriteRecipesSlice = createSlice({
  name: 'favoriteRecipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRecipeToFavoriteAsync.pending, (state, action) => {
        state.processingRecipeIds.push(action.meta.arg.id);
      })
      .addCase(addRecipeToFavoriteAsync.fulfilled, (state, action) => {
        favoriteRecipesAdapter.addOne(state.favoriteRecipes, action.payload.data);

        state.processingRecipeIds = state.processingRecipeIds.filter((id) => id !== action.payload.data.recipe_id);
      })
      .addCase(fetchAllFavoriteRecipesAsync.fulfilled, (state, action) => {
        favoriteRecipesAdapter.setAll(state.favoriteRecipes, action.payload);
      })
      .addCase(removeRecipeFromFavoritesAsync.pending, (state, action) => {
        state.processingRecipeIds.push(action.meta.arg.recipe_id);
      })
      .addCase(removeRecipeFromFavoritesAsync.fulfilled, (state, action) => {
        favoriteRecipesAdapter.removeOne(state.favoriteRecipes, action.payload.data.id);

        state.processingRecipeIds = state.processingRecipeIds.filter((id) => id !== action.payload.data.recipe_id);
      })
      .addCase(fetchAllMatchingFavoriteRecipesAsync.pending, (state) => {
        state.loading.favoriteMatchingRecipes = true;
      })
      .addCase(fetchAllMatchingFavoriteRecipesAsync.fulfilled, (state, action) => {
        if (action.payload.is_first_page) {
          favoriteMatchingRecipesAdapter.setAll(state.matchingFavoriteRecipes, action.payload.data);
        } else {
          favoriteMatchingRecipesAdapter.addMany(state.matchingFavoriteRecipes, action.payload.data);
        }

        state.nextPageMatchingFavoriteRecipesUrl = action.payload.next_page_url ? action.payload.next_page_url : null;

        state.loading.favoriteMatchingRecipes = false;
      })
  }
});

export const favoriteRecipesSelectors = favoriteRecipesAdapter.getSelectors<RootState>(
  (state: RootState) => state.cookeryFavoriteRecipes.favoriteRecipes
);

export const matchingFavoriteRecipesSelectors = favoriteMatchingRecipesAdapter.getSelectors<RootState>(
  (state: RootState) => state.cookeryFavoriteRecipes.matchingFavoriteRecipes
);

export const selectProcessingRecipeIds = (state: RootState) => state.cookeryFavoriteRecipes.processingRecipeIds;
export const selectNextPageMatchingFavoriteRecipesUrl = (state: RootState) => state.cookeryFavoriteRecipes.nextPageMatchingFavoriteRecipesUrl;
export const selectFavoriteMatchingRecipesLoading = (state: RootState) => state.cookeryFavoriteRecipes.loading.favoriteMatchingRecipes;

export default favoriteRecipesSlice.reducer;
