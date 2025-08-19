//theme

export const THEMES = ['yellow', 'green', 'blue', 'red', 'orange'];

export const STORAGE_KEY = 'll-theme';

export const pickRandomTheme = () => THEMES[Math.floor(Math.random() * THEMES.length)]

export const isTheme = (x) => {
    if (typeof x === 'string' && THEMES.includes(x)) {
        return true
    } 
    return false;
}