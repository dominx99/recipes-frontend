import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Ingredient } from '../domain/Ingredient';
import { fetchAllIngredients } from './IngredientsAPI';

export const ingredientsAdapter = createEntityAdapter<Ingredient>({
  selectId: (ingredient) => ingredient.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const fetchAllIngredientsAsync = createAsyncThunk(
  'ingredients/fetchAllIngredients',
  async () => {
    const response = await fetchAllIngredients();

    return response.data;
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: ingredientsAdapter.getInitialState(),
  reducers: {
    addIngredient: ingredientsAdapter.addOne,
    updateIngredient: ingredientsAdapter.updateOne,
    removeIngredient: ingredientsAdapter.removeOne,
    setIngredients: ingredientsAdapter.setAll,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllIngredientsAsync.fulfilled, (state, { payload }) => {
      ingredientsAdapter.setAll(state, payload);
    });
  }
});

export const {
  addIngredient,
  updateIngredient,
  removeIngredient,
  setIngredients,
} = ingredientsSlice.actions;

export const ingredientSelectors = ingredientsAdapter.getSelectors<RootState>(
  (state: RootState) => state.ingredients
)

export const selectAllIngredients = (state: RootState) => ingredientSelectors.selectAll(state);

export default ingredientsSlice.reducer;
