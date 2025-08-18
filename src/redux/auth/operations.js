import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from '../../firebase/config';

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ email, password, displayName }, thunkAPI) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user, { displayName });
            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await signOut(auth);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        try {
            return await new Promise((resolve) => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        resolve({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        });
                    } else {
                        resolve(null);
                    }
                });
            });
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);