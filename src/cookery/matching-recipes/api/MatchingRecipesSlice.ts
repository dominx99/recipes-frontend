import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { MatchingRecipe } from '../domain/MatchingRecipe';
import { fetchMatchingRecipesByIngredients } from './MatchingRecipesAPI';

export const matchingRecipesAdapter = createEntityAdapter<MatchingRecipe>({
  selectId: (matchingRecipe) => matchingRecipe.recipe.id,
  sortComparer: (a, b) => a.recipe.name.localeCompare(b.recipe.name),
});

export const fetchMatchingMatchingRecipesByIngredientsAsync = createAsyncThunk(
  'matchingRecipes/matchByIngredients',
  async (ingredients: string[]) => {
    const response = await fetchMatchingRecipesByIngredients(ingredients);

    return response.data;
  }
);

export const matchingRecipesSlice = createSlice({
  name: 'matchingRecipes',
  initialState: matchingRecipesAdapter.getInitialState(),
  reducers: {
    addMatchingRecipe: matchingRecipesAdapter.addOne,
    updateMatchingRecipe: matchingRecipesAdapter.updateOne,
    deleteMatchingRecipe: matchingRecipesAdapter.removeOne,
    setMatchingRecipes: matchingRecipesAdapter.setAll,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMatchingMatchingRecipesByIngredientsAsync.fulfilled, (state, action) => {
      matchingRecipesAdapter.setAll(state, action.payload);
    });
  }
});

export const matchingRecipeSelectors = matchingRecipesAdapter.getSelectors<RootState>(
  (state) => state.matchingRecipes,
);

export const {
  addMatchingRecipe,
  updateMatchingRecipe,
  deleteMatchingRecipe,
  setMatchingRecipes
} = matchingRecipesSlice.actions;
