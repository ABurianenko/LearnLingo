import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTeachersOnce } from "../../firebase/data-reader";

export const fetchTeachers = createAsyncThunk(
    'teachers/fetchTeachers',
    async ({limit = 4, page = 1} = {}, thunkAPI) => {
        try {
            const { filters } = thunkAPI.getState();
            return await fetchTeachersOnce({
                limit,
                page,
                filters: filters.filters
            });
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)