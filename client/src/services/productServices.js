import axios from "axios";

export const getAllProducts = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}/product`);
  return res;
};

export const getOneProduct = async (productId) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/product/${productId}`
  );
  return res;
};
