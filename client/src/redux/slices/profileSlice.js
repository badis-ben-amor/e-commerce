import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserProfile } from "../../services/profileService";
import { refresh } from "../../services/authService";

export const getUserProfileThunk = createAsyncThunk(
  "user/get",
  async (accessToken, thunkAPI) => {
    try {
      const res = await getUserProfile(accessToken);
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const res = await refresh();
        if (res.data.newAccessToken) {
          const reGetUserProfile = await getUserProfile(
            res.data.newAccessToken
          );
          return reGetUserProfile.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfileThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfileThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
