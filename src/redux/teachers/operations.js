import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTeachersOnce } from "../../firebase/data-reader";

export const fetchTeachers = createAsyncThunk(
    'teachers/fetchTeachers',
    async (_, thunkAPI) => {
        try {
            return await fetchTeachersOnce();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)