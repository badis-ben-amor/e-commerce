import axios from "axios";

export const getAllOrdersAdmin = async (accessToken) => {
  const res = await axios.get(`${process.env.REACT_APP_API_KEY}/admin/order`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res;
};

export const updateOrderDeliveredStatusAdmin = async ({
  orderId,
  accessToken,
}) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_KEY}/admin/order/delivered/${orderId}`,
    {},
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res;
};

export const updateOrderPaidStatusAdmin = async ({ orderId, accessToken }) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_KEY}/admin/order/paid/${orderId}`,
    {},
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res;
};

export const deleteOrderAdmin = async ({ orderId, accessToken }) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_KEY}/admin/order/${orderId}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return res;
};
