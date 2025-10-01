import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllLanguages } from "../../firebase/data-reader";

export const getLanguages = createAsyncThunk(
    'languages/fetchAllLanguages',
    async (_, thunkAPI) => {
        try {
            const res = await fetchAllLanguages();

            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)