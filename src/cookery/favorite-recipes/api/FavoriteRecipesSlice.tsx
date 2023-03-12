import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/app/store';
import { Recipe } from '../../matching-recipes/domain/MatchingRecipe';
import FavoriteRecipe from '../domain/FavoriteRecipe';
import { addRecipeToFavorite, fetchFavoriteRecipes, removeRecipeFromFavorites } from './FavoriteRecipesAPI';

export const favoriteRecipesAdapter = createEntityAdapter<FavoriteRecipe>();

interface FavoriteRecipesState {
  favoriteRecipes: EntityState<FavoriteRecipe>;
  processingRecipeIds: string[];
}

const initialState: FavoriteRecipesState = {
  favoriteRecipes: favoriteRecipesAdapter.getInitialState(),
  processingRecipeIds: [],
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

    return response;
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
        favoriteRecipesAdapter.setAll(state.favoriteRecipes, action.payload.data);
      })
      .addCase(removeRecipeFromFavoritesAsync.pending, (state, action) => {
        state.processingRecipeIds.push(action.meta.arg.recipe_id);
      })
      .addCase(removeRecipeFromFavoritesAsync.fulfilled, (state, action) => {
        favoriteRecipesAdapter.removeOne(state.favoriteRecipes, action.payload.data.id);

        state.processingRecipeIds = state.processingRecipeIds.filter((id) => id !== action.payload.data.recipe_id);
      })
  }
});

export const favoriteRecipesSelectors = favoriteRecipesAdapter.getSelectors<RootState>(
  (state: RootState) => state.cookeryFavoriteRecipes.favoriteRecipes
);

export const selectProcessingRecipeIds = (state: RootState) => state.cookeryFavoriteRecipes.processingRecipeIds;

export default favoriteRecipesSlice.reducer;
