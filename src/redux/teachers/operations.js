import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTeachersOnce } from "../../firebase/data-reader";

export const fetchTeachers = createAsyncThunk(
    'teachers/fetchTeachers',
    async ({limit = 4, page = 1} = {}, thunkAPI) => {
        try {
            return await fetchTeachersOnce(limit, page);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)