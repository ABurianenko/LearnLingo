import { createSlice } from "@reduxjs/toolkit";
import { makeTeacherKey } from "../../utils/teacherKey";

const STORAGE_KEY = "ll-favorites-keys";

const load = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(raw) ? raw : [];
  } catch { return []; }
};

const initialState = { keys: load() };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavoriteByTeacher(state, { payload }) {
      const key = makeTeacherKey(payload);
      const i = state.keys.indexOf(key);
      if (i === -1) state.keys.push(key);
      else state.keys.splice(i, 1);
    },
    clearFavorites(state) { state.keys = []; }
  },
});

export const { toggleFavoriteByTeacher, clearFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;


