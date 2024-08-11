import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toggle: false
};

export const ToggleSidebarSlice = createSlice({
  name: 'ToggleSidebar',
  initialState,
  reducers: {
    openToggle: (state) => {
      state.toggle = true;
    },
    closeToggle: (state) => {
      state.toggle = false;
    }
  }
});

export const { openToggle, closeToggle } = ToggleSidebarSlice.actions;

export default ToggleSidebarSlice.reducer;
