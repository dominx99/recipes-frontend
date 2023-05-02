import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/app/store';
import fetchAllUnits from './MeasuresAPI';

interface MyRecipesState {
  units: string[],
  loading: {
    fetchUnits: boolean,
  },
}

const initialState: MyRecipesState = {
  units: [],
  loading: {
    fetchUnits: false,
  },
}

export const fetchAllUnitsAsync = createAsyncThunk(
  'measures/fetchAllUnits',
  async () => {
    const response = await fetchAllUnits();

    return response.data;
  }
)

export const myRecipesSlice = createSlice({
  name: 'myRecipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUnitsAsync.pending, (state) => {
        state.loading.fetchUnits = true;
      })
      .addCase(fetchAllUnitsAsync.fulfilled, (state, action) => {
        state.loading.fetchUnits = false;
        state.units = action.payload;
      })
  }
});

export const unitsSelector = (state: RootState) => state.cookeryMeasures.units;

export default myRecipesSlice.reducer;
