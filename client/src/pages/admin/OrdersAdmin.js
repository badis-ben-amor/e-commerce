import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersAdminThunk,
  updateOrderDeliveredStatusAdminThunk,
  updateOrderPaidStatusAdminThunk,
  deleteOrderAdminThunk,
} from "../../redux/slices/admin/orderSliceAdmin";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Table,
  Typography,
} from "@mui/material";
import { Cancel, CheckCircle, Delete } from "@mui/icons-material";
import { getToken } from "../../services/tokenServices";

const OrdersAdmin = () => {
  const dispatch = useDispatch();
  const { orders: ordersData } = useSelector((state) => state.adminOrder);
  // const { accessToken } = useSelector((state) => state.auth);
  const accessToken = getToken();

  const [orders, setOrders] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersAdminThunk(accessToken));
  }, [dispatch]);

  useEffect(() => {
    setOrders(ordersData);
  }, [ordersData]);

  const handleTogglePaidStatus = (orderId) => {
    dispatch(updateOrderPaidStatusAdminThunk({ orderId, accessToken })).then(
      () => dispatch(getAllOrdersAdminThunk(accessToken))
    );
  };

  const handleToggleDeliveredStatus = (orderId) => {
    dispatch(
      updateOrderDeliveredStatusAdminThunk({ orderId, accessToken })
    ).then(() => {
      dispatch(getAllOrdersAdminThunk(accessToken));
    });
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrderAdminThunk({ orderId, accessToken })).then(() => {
      dispatch(getAllOrdersAdminThunk(accessToken));
      setShowDeleteModal(false);
    });
  };

  const handleShowDeleteModal = (order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin - Manage Orders
      </Typography>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Products</th>
            <th>Total Price</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, i) => (
            <tr key={order._id}>
              <td>{i + 1}</td>
              <td>
                {order.user.name} <br />
                <small>{order.user.email}</small>
              </td>
              <td>
                {order.products.map((product, i) => (
                  <div key={i}>{product.product.name}</div>
                ))}
              </td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>
                <Button
                  variant={order.isPaid ? "contained" : "outlined"}
                  color={order.isPaid ? "success" : "default"}
                  startIcon={order.isPaid && <CheckCircle />}
                  onClick={() => handleTogglePaidStatus(order._id)}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </Button>
                {order.paidAt && (
                  <div>
                    <small>
                      Paid At: {new Date(order.paidAt).toLocaleString()}
                    </small>
                  </div>
                )}
              </td>
              <td>
                <Button
                  variant={order.isDelivered ? "contained" : "outlined"}
                  color={order.isDelivered ? "primary" : "default"}
                  startIcon={order.isDelivered && <CheckCircle />}
                  onClick={() => handleToggleDeliveredStatus(order._id)}
                >
                  {order.isDelivered ? "Delivered" : "Not Delivered"}
                </Button>
                {order.deliveredAt && (
                  <div>
                    <small>
                      Delivered At:{" "}
                      {new Date(order.deliveredAt).toLocaleString()}
                    </small>
                  </div>
                )}
              </td>
              <td>
                <IconButton
                  color="error"
                  onClick={() => handleShowDeleteModal(order)}
                >
                  <Delete />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            are you sure you want to delete this order
          </Typography>
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button onClick={() => setShowDeleteModal(false)} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => handleDeleteOrder(selectedOrder?._id)}
              variant="contained"
              color="error"
              startIcon={<Cancel />}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default OrdersAdmin;
