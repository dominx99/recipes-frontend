import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/app/store';
import { Recipe } from '../../matching-recipes/domain/MatchingRecipe';
import FavoriteRecipe from '../domain/FavoriteRecipe';
import { addRecipeToFavorite, fetchFavoriteRecipes } from './FavoriteRecipesAPI';

export const favoriteRecipesAdapter = createEntityAdapter<FavoriteRecipe>();

interface FavoriteRecipesState {
  favoriteRecipes: EntityState<FavoriteRecipe>;
}

const initialState: FavoriteRecipesState = {
  favoriteRecipes: favoriteRecipesAdapter.getInitialState(),
}

export const addRecipeToFavoriteAsync = createAsyncThunk(
  'favoriteRecipes/addRecipeToFavorite',
  async (recipe: Recipe) => {
    const response = await addRecipeToFavorite(recipe);

    return response;
  }
)

export const fetchFavoriteRecipesAsync = createAsyncThunk(
  'favoriteRecipes/fetchFavoriteRecipes',
  async () => {
    const response = await fetchFavoriteRecipes();

    return response;
  }
)


export const favoriteRecipesSlice = createSlice({
  name: 'favoriteRecipes',
  initialState,
  reducers: {
    addFavoriteRecipe: (state, action) => {
      favoriteRecipesAdapter.addOne(state.favoriteRecipes, action.payload);
    },
    removeFavoriteRecipe: (state, action) => {
      favoriteRecipesAdapter.removeOne(state.favoriteRecipes, action.payload);
    },
    updateFavoriteRecipe: (state, action) => {
      favoriteRecipesAdapter.updateOne(state.favoriteRecipes, action.payload);
    },
    setFavoriteRecipes: (state, action) => {
      favoriteRecipesAdapter.setAll(state.favoriteRecipes, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRecipeToFavoriteAsync.fulfilled, (state, action) => {
        favoriteRecipesAdapter.addOne(state.favoriteRecipes, action.payload.data);
      })
      .addCase(fetchFavoriteRecipesAsync.fulfilled, (state, action) => {
        favoriteRecipesAdapter.setAll(state.favoriteRecipes, action.payload.data);
      })
  }
});

export const {
  addFavoriteRecipe,
  updateFavoriteRecipe,
  removeFavoriteRecipe,
  setFavoriteRecipes
} = favoriteRecipesSlice.actions;

export const favoriteRecipesSelectors = favoriteRecipesAdapter.getSelectors<RootState>(
  (state: RootState) => state.cookeryFavoriteRecipes.favoriteRecipes
);

export default favoriteRecipesSlice.reducer;
