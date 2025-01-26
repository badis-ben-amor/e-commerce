import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  refresh,
  logout,
} from "../../services/authService";

export const userRegisterThunk = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const res = await registerUser({ name, email, password });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const userLoginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await loginUser({ email, password });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const res = await refresh();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const res = await logout();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    error: null,
    accessToken: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegisterThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegisterThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(userRegisterThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(userLoginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLoginThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(refreshThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
