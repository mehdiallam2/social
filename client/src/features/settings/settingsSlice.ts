import { createSlice } from "@reduxjs/toolkit";

interface SettingsState {
  theme: string;
}

const initialState: SettingsState = {
  theme: "light",
};

const settingsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    switchTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { setTheme, switchTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
