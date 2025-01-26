import axios from "axios";

export const getAllOrders = async (token) => {
  const res = await axios.get(`${process.env.REACT_APP_KEY}/orders`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateOrderToDelivered = async (token, orderId) => {
  const res = axios.put(`${process.env.REACT_APP_KEY}/orders/${orderId}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return res.data;
};
