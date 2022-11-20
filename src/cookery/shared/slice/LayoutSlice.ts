import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

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

export const isSidebarOpen = (state: RootState) => state.layout.sidebar.open;

export default layoutSlice.reducer;
