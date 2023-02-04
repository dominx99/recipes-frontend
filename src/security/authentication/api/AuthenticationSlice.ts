import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../shared/app/store";
import { authenticate, invalidateToken } from "./AuthenticationAPI";

export interface AuthenticationCredentials {
  username: string,
  password: string,
}

export type AuthenticationDetails = {
  token: string,
  refresh_token: string,
}

export interface AuthenticationState {
  authenticationDetails: AuthenticationDetails | null,
  message: string | null,
}

const initialState: AuthenticationState = {
  authenticationDetails: null,
  message: null,
}

export const authenticateAsync = createAsyncThunk(
  "authentication/authenticate",
  async (authenticationCredentials: AuthenticationCredentials) => {
    const response = await authenticate(authenticationCredentials);

    return response.data;
  }
)

export const invalidateTokenAsync = createAsyncThunk(
  "authentication/invalidateToken",
  (details: AuthenticationDetails | null) => {
    invalidateToken(details);
  }
)

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthenticationDetails: (state, { payload }) => {
      state.authenticationDetails = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authenticateAsync.rejected, (state, { error }) => {
      state.message = error.message ? error.message : 'Invalid details';
    })
    builder.addCase(authenticateAsync.fulfilled, (state, { payload }) => {
      state.authenticationDetails = payload;

      localStorage.setItem('AUTHENTICATION_DETAILS', JSON.stringify(payload));
    })
    builder.addCase(invalidateTokenAsync.fulfilled, (state) => {
      state.authenticationDetails = null;
    })
  }
})

export const {
  setAuthenticationDetails,
} = authenticationSlice.actions;

export const authenticationMessage = (state: RootState) => state.authentication.message;
export const authenticationDetails = (state: RootState) => state.authentication.authenticationDetails;

export default authenticationSlice.reducer;
