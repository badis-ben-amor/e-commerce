import axios from "axios";

export const getCart = async (accessToken) => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}/cart`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res;
};

export const addItemToCart = async ({ productId, quantity, accessToken }) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/cart`,
    { productId, quantity },
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res;
};

export const updatCartItem = async ({ productId, quantity, accessToken }) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_KEY}/cart`,
    { productId, quantity },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return res;
};

export const removeCartItem = async ({ productId, accessToken }) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_KEY}/cart/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res;
};
