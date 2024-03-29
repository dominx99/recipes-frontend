import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../shared/app/store";

interface LayoutState {
  sidebar: {
    open: boolean;
  }
}

const initialState: LayoutState = {
  sidebar: {
    open: false,
  },
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar.open = !state.sidebar.open;
    }
  },
});

export const {
  toggleSidebar,
} = layoutSlice.actions;

export const isSidebarOpen = (state: RootState) => state.backofficeLayout.sidebar.open;

export default layoutSlice.reducer;
