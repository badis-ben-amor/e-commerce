import axios from "axios";

export const getUsersOrders = async (accessToken) => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}/order`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res;
};

export const addOrder = async ({ shippingAdress, accessToken }) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_KEY}/order`,
    { shippingAdress },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res;
};
