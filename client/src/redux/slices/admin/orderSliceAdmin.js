import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllOrdersAdmin,
  updateOrderDeliveredStatusAdmin,
  updateOrderPaidStatusAdmin,
  deleteOrderAdmin,
} from "../../../services/admin/orderServiceAdmin";
import { refresh } from "../../../services/authService";

export const getAllOrdersAdminThunk = createAsyncThunk(
  "adminOrder/getAllOrders",
  async (accessToken, thunkAPI) => {
    try {
      const res = await getAllOrdersAdmin(accessToken);
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const res = await refresh();
        const { newAccessToken } = res.data;
        if (newAccessToken) {
          const retryRes = await getAllOrdersAdmin(newAccessToken);
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updateOrderDeliveredStatusAdminThunk = createAsyncThunk(
  "adminProduct/updateDeliveredStatus",
  async ({ orderId, accessToken }, thunkAPI) => {
    try {
      const res = await updateOrderDeliveredStatusAdmin({
        orderId,
        accessToken,
      });
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const res = await refresh();
        const { newAccessToken } = res.data;
        if (newAccessToken) {
          const retryRes = await updateOrderDeliveredStatusAdmin({
            orderId,
            accessToken: newAccessToken,
          });
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updateOrderPaidStatusAdminThunk = createAsyncThunk(
  "adminProduct/updatePaidStatus",
  async ({ orderId, accessToken }, thunkAPI) => {
    try {
      const res = await updateOrderPaidStatusAdmin({
        orderId,
        accessToken,
      });
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const res = await refresh();
        const { newAccessToken } = res.data;
        if (newAccessToken) {
          const retryRes = await updateOrderPaidStatusAdmin({
            orderId,
            accessToken: newAccessToken,
          });
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteOrderAdminThunk = createAsyncThunk(
  "adminOrder/deleteOrder",
  async ({ orderId, accessToken }, thunkAPI) => {
    try {
      const res = await deleteOrderAdmin({ orderId, accessToken });
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const res = await refresh();
        const { newAccessToken } = res.data;
        if (newAccessToken) {
          const retryRes = await deleteOrderAdmin({
            orderId,
            accessToken: newAccessToken,
          });
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState: {
    orders: [],
    order: {},
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersAdminThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersAdminThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrdersAdminThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderDeliveredStatusAdminThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateOrderDeliveredStatusAdminThunk.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.order = action.payload;
        }
      )
      .addCase(
        updateOrderDeliveredStatusAdminThunk.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(updateOrderPaidStatusAdminThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderPaidStatusAdminThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(updateOrderPaidStatusAdminThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrderAdminThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrderAdminThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteOrderAdminThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default adminOrderSlice.reducer;
