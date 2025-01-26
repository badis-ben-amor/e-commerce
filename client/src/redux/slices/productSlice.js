import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts, getOneProduct } from "../../services/productServices";

export const getAllProductsThunk = createAsyncThunk(
  "product/getAllProducts",
  async (_, thunkAPI) => {
    try {
      const res = await getAllProducts();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getProductByIdThunk = createAsyncThunk(
  "product/getOneProduct",
  async (productId, thunkAPI) => {
    try {
      const res = await getOneProduct(productId);
      return res.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: {},
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getAllProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getProductByIdThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(getProductByIdThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
