import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ValidationErrors } from "../../shared/api/Errors";
import { addUser } from "./AccountAPI";
import { CreateUserForm } from "./AccountForms";

interface AccountState {
  loading: {
    add: boolean,
  },
  errors: {
    add?: ValidationErrors,
  },
  success: {
    add: boolean,
  },
}

const initialState: AccountState = {
  loading: {
    add: false,
  },
  errors: {},
  success: {
    add: false,
  }
}

export const addUserAsync = createAsyncThunk(
  "account/create",
  async (form: CreateUserForm) => {
    const response = await addUser(form);

    return response.data;
  }
)

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearSuccessfullyCreatedUser: (state) => {
      state.success.add = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserAsync.pending, (state) => {
        state.loading.add = true;
        state.success.add = false;
      })
      .addCase(addUserAsync.rejected, (state, {error}) => {
        state.loading.add = false;
        const data = JSON.parse(error.message || '{}');

        if (data.errors) {
          state.errors.add = data.errors;
        }
      })
      .addCase(addUserAsync.fulfilled, (state) => {
        state.loading.add = false;
        state.success.add = true;
      })
  }
});


export const addUserErrorsGetter = (state: RootState) => state.account.errors.add;
export const successfulyCreatedUserGetter = (state: RootState) => state.account.success.add;
export const addUserLoadingGetter = (state: RootState) => state.account.loading.add;

export const {
  clearSuccessfullyCreatedUser,
} = accountSlice.actions;

export default accountSlice.reducer;
