import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../shared/app/store";

interface LayoutState {
  mode: 'light' | 'dark';
  sidebar: {
    open: boolean;
  },
  menuSidebar: {
    open: boolean;
  }
}

const initialState: LayoutState = {
  mode: 'light',
  sidebar: {
    open: false,
  },
  menuSidebar: {
    open: false,
  }
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar.open = !state.sidebar.open;
    },
    toggleMenuSidebar: (state) => {
      state.menuSidebar.open = !state.menuSidebar.open;
    },
    toggleMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    }
  },
});

export const {
  toggleSidebar,
  toggleMenuSidebar,
  toggleMode,
} = layoutSlice.actions;

export const isSidebarOpen = (state: RootState) => state.cookeryLayout.sidebar.open;
export const isMenuSidebarOpen = (state: RootState) => state.cookeryLayout.menuSidebar.open;
export const getMode = (state: RootState) => state.cookeryLayout.mode;

export default layoutSlice.reducer;
