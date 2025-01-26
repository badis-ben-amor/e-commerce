import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCart,
  addItemToCart,
  updatCartItem,
  removeCartItem,
} from "../../services/cartService";
import { refresh } from "../../services/authService";

export const getCartThunk = createAsyncThunk(
  "/cart/getCart",
  async (accessToken, thunkAPI) => {
    try {
      const res = await getCart(accessToken);
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const res = await refresh();
        if (res.data.newAccessToken) {
          const retryRes = await getCart(res.data.newAccessToken);
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const addItemToCartThunk = createAsyncThunk(
  "/cart/addCartItem",
  async ({ productId, accessToken }, thunkAPI) => {
    try {
      const res = await addItemToCart({ productId, accessToken });
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const res = await refresh();
        const { newAccessToken } = res.data;
        if (newAccessToken) {
          const retryRes = await addItemToCart({
            productId,
            accessToken: newAccessToken,
          });
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updateCartItemThunk = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity, accessToken }, thunkAPI) => {
    try {
      return await updatCartItem({ productId, quantity, accessToken });
    } catch (error) {
      if (error.response?.status === 403) {
        const res = await refresh();
        const { newAccessToken } = res.data;
        if (newAccessToken) {
          const retryRes = await updatCartItem({
            productId,
            quantity,
            accessToken: newAccessToken,
          });
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const removeCateItemThunk = createAsyncThunk(
  "cart/removeCateItem",
  async ({ productId, accessToken }, thunkAPI) => {
    try {
      return await removeCartItem({ productId, accessToken });
    } catch (error) {
      if (error.response?.status === 403) {
        const res = await refresh();
        const { newAccessToken } = res.data;
        if (newAccessToken) {
          const retryRes = await removeCartItem({
            productId,
            accessToken: newAccessToken,
          });
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    item: {},
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload;
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addItemToCartThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItemToCartThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(addItemToCartThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateCartItemThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItemThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(updateCartItemThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(removeCateItemThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCateItemThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(removeCateItemThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
