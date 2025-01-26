import axios from "axios";

export const getAllProductsAdmin = async (accessToken) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/admin/product`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res;
};

export const createProductAdmin = async ({ formData, accessToken }) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/admin/product`,
    formData,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res;
};

export const updateProductAdmin = async ({
  productId,
  formData,
  accessToken,
}) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_KEY}/admin/product/${productId}`,
    formData,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res;
};

export const deleteProductAdmin = async ({ productId, accessToken }) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_KEY}/admin/product/${productId}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res;
};
