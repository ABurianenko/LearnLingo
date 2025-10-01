import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    filters: {
        language: '',
        level: '',
        price: '',
    }
}

const filtersSlice = createSlice(
    {
        name: 'filters',
        initialState,
        reducers: {
            setLanguage(state, action) {
                state.filters.language = action.payload;
            },
            setLevel(state, action) {
                state.filters.level = action.payload;
            },
            setPrice(state, action) {
                state.filters.price = action.payload;
            },
            clearFilters(state) {
                state.filters = initialState.filters;
            }
        }
    }
)

export const { setLanguage, setLevel, setPrice, clearFilters } = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;