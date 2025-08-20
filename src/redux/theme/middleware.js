import { pickRandomTheme } from "../../constants/constants";
import { setTheme } from "./slice";

export const themeAutoSwitchMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const type = action && action.type ? String(action.type) : '';
  if (type.startsWith('theme/')) return result;
  if (type.startsWith('@@redux')) return result;

  const state = store.getState();
  const current = state.theme.current;
  const nextTheme = pickRandomTheme(current);

  if (nextTheme && nextTheme !== current) {
    store.dispatch(setTheme(nextTheme));
  }

  return result;
};