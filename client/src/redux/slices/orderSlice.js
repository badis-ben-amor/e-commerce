import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersOrders, addOrder } from "../../services/orderServices";
import { refresh } from "../../services/authService";

export const getUsersOrdersThunk = createAsyncThunk(
  "order/getOrders",
  async (accessToken, thunkAPI) => {
    try {
      const res = await getUsersOrders(accessToken);
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const res = await refresh();
        const { newAccessToken } = res.data;
        if (newAccessToken) {
          const retryRes = await getUsersOrders(newAccessToken);
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const addOrderThunk = createAsyncThunk(
  "ordre/addOrder",
  async ({ shippingAdress, accessToken }, thunkAPI) => {
    try {
      const res = await addOrder({ shippingAdress, accessToken });
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const res = await refresh();
        const { newAccessToken } = res.data;
        if (newAccessToken) {
          const retryRes = await addOrder({
            shippingAdress,
            accessToken: newAccessToken,
          });
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    order: {},
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersOrdersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getUsersOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addOrderThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOrderThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addOrderThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;
