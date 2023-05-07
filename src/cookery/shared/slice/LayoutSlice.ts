import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../shared/app/store";

interface LayoutState {
  sidebar: {
    open: boolean;
  },
  menuSidebar: {
    open: boolean;
  }
}

const initialState: LayoutState = {
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
    }
  },
});

export const {
  toggleSidebar,
  toggleMenuSidebar,
} = layoutSlice.actions;

export const isSidebarOpen = (state: RootState) => state.cookeryLayout.sidebar.open;
export const isMenuSidebarOpen = (state: RootState) => state.cookeryLayout.menuSidebar.open;

export default layoutSlice.reducer;
