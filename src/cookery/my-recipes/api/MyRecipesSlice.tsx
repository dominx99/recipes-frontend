import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/app/store';
import { Recipe } from '../../matching-recipes/domain/MatchingRecipe';
import { addRecipe, fetchAllMyRecipes } from './MyRecipesAPI';

export const myRecipesAdapter = createEntityAdapter<Recipe>();

interface MyRecipesState {
  recipes: EntityState<Recipe>;
  loading: {
    fetchRecipes: boolean,
  },
  page: number,
  has_next_page: boolean,
}

const initialState: MyRecipesState = {
  recipes: myRecipesAdapter.getInitialState(),
  loading: {
    fetchRecipes: false,
  },
  page: 1,
  has_next_page: false,
}

export const addRecipeAsync = createAsyncThunk(
  'myRecipes/addRecipe',
  async (recipe: Recipe) => {
    const response = await addRecipe(recipe);

    return response;
  }
)

export const fetchAllMyRecipesAsync = createAsyncThunk(
  'myRecipes/fetchAllMyRecipesAsync',
  async () => {
    const response = await fetchAllMyRecipes();

    return response.data;
  }
)

export const myRecipesSlice = createSlice({
  name: 'myRecipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMyRecipesAsync.pending, (state) => {
        state.loading.fetchRecipes = true;
      })
      .addCase(fetchAllMyRecipesAsync.fulfilled, (state) => {
        state.loading.fetchRecipes = false;
      })
  }
});

export const myRecipesSelectors = myRecipesAdapter.getSelectors<RootState>(
  (state: RootState) => state.cookeryMyRecipes.recipes
);

export default myRecipesSlice.reducer;
