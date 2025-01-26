import { configureStore, createSlice } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";
import cartReducer from "./slices/cartSlice";
// admin reducers
import adminProductReducer from "./slices/admin/productsAdminSlice";
import adminOrderReducer from "./slices/admin/orderSliceAdmin";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    // admin
    adminProduct: adminProductReducer,
    adminOrder: adminOrderReducer,
  },
});

export default store;
