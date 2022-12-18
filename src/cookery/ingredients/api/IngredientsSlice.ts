import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CategoryResponse, fetchAllCategoriesWithIngredients } from '../../categories/api/CategoriesAPI';
import { Category } from '../../categories/domain/Category';
import { Ingredient } from '../domain/Ingredient';
import { fetchAllIngredients } from './IngredientsAPI';

export const ingredientsAdapter = createEntityAdapter<Ingredient>({
  selectId: (ingredient) => ingredient.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const categoriesAdapter = createEntityAdapter<Category>({
  selectId: (category) => category.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const fetchAllIngredientsAsync = createAsyncThunk(
  'ingredients/fetchAllIngredients',
  async () => {
    const response = await fetchAllIngredients();

    return response.data;
  }
);

export const fetchAllCategoriesWithIngredientsAsync = createAsyncThunk(
  'categories/fetchAllCategoriesWithIngredients',
  async () => {
    const response = await fetchAllCategoriesWithIngredients();

    return response.data;
  }
);

const initialState = {
  ingredients: ingredientsAdapter.getInitialState(),
  categories: categoriesAdapter.getInitialState(),
}

interface FetchAllCategoriesWithIngredientsAction {
  payload: CategoryResponse[];
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {
    addIngredient: (state, action) => {
      ingredientsAdapter.addOne(state.ingredients, action.payload);
    },
    updateIngredient: (state, action) => {
      ingredientsAdapter.updateOne(state.ingredients, action.payload);
    },
    removeIngredient: (state, action) => {
      ingredientsAdapter.removeOne(state.ingredients, action.payload);
    },
    setIngredients: (state, action) => {
      ingredientsAdapter.setAll(state.ingredients, action.payload);
    },
    selectIngredient: (state, { payload }) => {
      ingredientsAdapter.updateOne(state.ingredients, {
        id: payload.id,
        changes: { selected: true },
      });
    },
    deselectIngredient: (state, { payload }) => {
      ingredientsAdapter.updateOne(state.ingredients, {
        id: payload.id,
        changes: { selected: false },
      });
    },
    addCategory: (state, action) => {
      categoriesAdapter.addOne(state.categories, action.payload);
    },
    updateCategory: (state, action) => {
      categoriesAdapter.updateOne(state.categories, action.payload);
    },
    removeCategory: (state, action) => {
      categoriesAdapter.removeOne(state.categories, action.payload);
    },
    setCategories: (state, action) => {
      categoriesAdapter.setAll(state.categories, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllIngredientsAsync.fulfilled, (state, { payload }) => {
      ingredientsAdapter.setAll(state.ingredients, payload);
    });
    builder.addCase(fetchAllCategoriesWithIngredientsAsync.fulfilled, (state, action: FetchAllCategoriesWithIngredientsAction) => {
      const categories = action.payload.map((category: CategoryResponse): Category => ({
        ...category,
        ingredientIds: category.products.map((product) => product.id),
      }));

      const ingredients = action.payload.flatMap((category: CategoryResponse): Ingredient[] => category.products);

      categoriesAdapter.setAll(state.categories, categories);
      ingredientsAdapter.setAll(state.ingredients, ingredients);
    });
  }
});

export const {
  addIngredient,
  updateIngredient,
  removeIngredient,
  setIngredients,
  selectIngredient,
  deselectIngredient,
  addCategory,
  updateCategory,
  removeCategory,
  setCategories,
} = ingredientsSlice.actions;

export const ingredientSelectors = ingredientsAdapter.getSelectors<RootState>(
  (state: RootState) => state.ingredients.ingredients
)

export const categoriesSelectors = categoriesAdapter.getSelectors<RootState>(
  (state: RootState) => state.ingredients.categories
)

export const selectAllIngredients = (state: RootState) => ingredientSelectors.selectAll(state);
export const selectAllCategories = (state: RootState) => categoriesSelectors.selectAll(state);

export default ingredientsSlice.reducer;
