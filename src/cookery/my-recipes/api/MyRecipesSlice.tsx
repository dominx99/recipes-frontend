import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/app/store';
import { Recipe } from '../../matching-recipes/domain/MatchingRecipe';
import { IRecipeForm } from '../../recipes/components/AddRecipeForm';
import { addRecipe, fetchAllMyRecipes, fetchRecipeById, publishRecipe, removeRecipe, updateRecipe } from './MyRecipesAPI';

export const myRecipesAdapter = createEntityAdapter<Recipe>();

interface MyRecipesState {
  recipes: EntityState<Recipe>;
  recipeToEdit?: Recipe;
  loading: {
    fetchRecipes: boolean,
  },
  page: number,
  has_next_page: boolean,
  errors: {
    addRecipe: undefined | {
      [key: string]: string,
    }
  }
}

const initialState: MyRecipesState = {
  recipes: myRecipesAdapter.getInitialState(),
  recipeToEdit: undefined,
  loading: {
    fetchRecipes: false,
  },
  page: 1,
  has_next_page: false,
  errors: {
    addRecipe: undefined,
  }
}

export const addRecipeAsync = createAsyncThunk(
  'myRecipes/addRecipe',
  async (recipe: IRecipeForm) => {
    const response = await addRecipe(recipe);

    return response.data;
  }
)

export const updateRecipeAsync = createAsyncThunk(
  'myRecipes/addRecipe',
  async (recipe: IRecipeForm) => {
    const response = await updateRecipe(recipe);

    return response;
  }
)

export const removeRecipeAsync = createAsyncThunk(
  'myRecipes/removeRecipe',
  async (recipeId: string) => {
    const response = await removeRecipe(recipeId);

    return response.data;
  }
)

export const publishRecipeAsync = createAsyncThunk(
  'myRecipes/publishRecipe',
  async (recipeId: string) => {
    await publishRecipe(recipeId);
  }
)

export const fetchAllMyRecipesAsync = createAsyncThunk(
  'myRecipes/fetchAllMyRecipesAsync',
  async (page: number) => {
    const response = await fetchAllMyRecipes(page);

    return response.data;
  }
)

export const fetchRecipeByIdAsync = createAsyncThunk(
  'myRecipes/fetchRecipeByIdAsync',
  async (recipeId: string) => {
    const response = await fetchRecipeById(recipeId);

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
      .addCase(fetchAllMyRecipesAsync.fulfilled, (state, action) => {
        state.loading.fetchRecipes = false;

        if (action.payload.meta.page === 1) {
          myRecipesAdapter.setAll(state.recipes, action.payload.data);
        } else {
          myRecipesAdapter.addMany(state.recipes, action.payload.data);
        }

        state.page = action.payload.meta.page;
        state.has_next_page = action.payload.meta.has_next_page;
      })
      .addCase(addRecipeAsync.rejected, (state, action) => {
        if (action.error.code === 'ERR_BAD_REQUEST' && typeof action.error.message === 'string') {
          state.errors.addRecipe = JSON.parse(action.error.message);
        }
      })
      .addCase(removeRecipeAsync.fulfilled, (state, action) => {
        myRecipesAdapter.removeOne(state.recipes, action.payload.id);
      })
      .addCase(fetchRecipeByIdAsync.fulfilled, (state, action) => {
        state.recipeToEdit = action.payload;
      })
  }
});

export const myRecipesSelectors = myRecipesAdapter.getSelectors<RootState>(
  (state: RootState) => state.cookeryMyRecipes.recipes
);

export const myRecipesLoadingSelector = (state: RootState) => state.cookeryMyRecipes.loading.fetchRecipes;
export const myRecipesCurrentPageSelector = (state: RootState) => state.cookeryMyRecipes.page;
export const myRecipesHasNextPageSelector = (state: RootState) => state.cookeryMyRecipes.has_next_page;
export const addRecipeErrorsSelector = (state: RootState) => state.cookeryMyRecipes.errors.addRecipe;
export const recipeToEditSelector = (state: RootState) => state.cookeryMyRecipes.recipeToEdit;

export default myRecipesSlice.reducer;
