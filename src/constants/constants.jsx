//theme

export const THEMES = ['yellow', 'green', 'blue', 'red', 'orange'];
export const THEME_STORAGE_KEY = 'll-theme-session';

export const pickRandomTheme = (exclude) => {
  const pool = exclude ? THEMES.filter(t => t !== exclude) : THEMES;
  return pool[Math.floor(Math.random() * pool.length)];
};

export const isTheme = (x) => typeof x === 'string' && THEMES.includes(x);

