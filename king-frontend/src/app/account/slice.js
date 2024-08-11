import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogged: false,
  user: null
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    doSaveUserIdAction: (state, action) => {
      state.isLogged = true;
      state.user = action.payload;
    },
    doLogoutAction: (state) => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('persist:auth');
      state.isLogged = false;
      state.user = null;
    }
  }
});

export const { doSaveUserIdAction, doLogoutAction } = accountSlice.actions;

export default accountSlice.reducer;
