import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllProductsAdmin,
  createProductAdmin,
  updateProductAdmin,
  deleteProductAdmin,
} from "../../../services/admin/productServiceAdmin";
import { refresh } from "../../../services/authService";

export const getAllProductsAdminThunk = createAsyncThunk(
  "adminProduct/getAllProducts",
  async (accessToken, thunkAPI) => {
    try {
      const res = await getAllProductsAdmin(accessToken);
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const res = await refresh();
        const { newAccessToken } = res.data;
        if (newAccessToken) {
          const retryRes = await getAllProductsAdmin(newAccessToken);
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createProductAdminThunk = createAsyncThunk(
  "adminProduct/createProduct",
  async ({ formData, accessToken }, thunkAPI) => {
    try {
      const res = await createProductAdmin({ formData, accessToken });
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const res = await refresh();
        const { newAccessToken } = res.data;
        if (newAccessToken) {
          const retryRes = await createProductAdmin({
            formData,
            accessToken: newAccessToken,
          });
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updateProductAdminThunk = createAsyncThunk(
  "adminProduct/updateProduct",
  async ({ productId, formData, accessToken }, thunkAPI) => {
    try {
      const res = await updateProductAdmin({
        productId,
        formData,
        accessToken,
      });
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const res = await refresh();
        const { newAccessToken } = res.data;
        if (newAccessToken) {
          const retryRes = await updateProductAdmin({
            productId,
            formData,
            accessToken: newAccessToken,
          });
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteProductAdminThunk = createAsyncThunk(
  "adminProduct/deleteProduct",
  async ({ productId, accessToken }, thunkAPI) => {
    try {
      const res = await deleteProductAdmin({ productId, accessToken });
      return res.data;
    } catch (error) {
      if (error.response?.status === 403) {
        const res = await refresh();
        const { newAccessToken } = res.data;
        if (newAccessToken) {
          const retryRes = await deleteProductAdmin({
            productId,
            accessToken: newAccessToken,
          });
          return retryRes.data;
        }
      }
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    products: [],
    product: {},
    isLoading: false,
    updateLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsAdminThunk.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(getAllProductsAdminThunk.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getAllProductsAdminThunk.rejected, (state, action) => {
        // state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createProductAdminThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductAdminThunk.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createProductAdminThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProductAdminThunk.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateProductAdminThunk.fulfilled, (state, action) => {
        state.updateLoading = false;
      })
      .addCase(updateProductAdminThunk.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProductAdminThunk.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(deleteProductAdminThunk.fulfilled, (state) => {
        // state.isLoading = false;
      })
      .addCase(deleteProductAdminThunk.rejected, (state, action) => {
        // state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default adminProductSlice.reducer;
