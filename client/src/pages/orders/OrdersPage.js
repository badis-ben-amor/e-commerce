import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersOrdersThunk,
  addOrderThunk,
} from "../../redux/slices/orderSlice";
import { Badge, ListGroup } from "react-bootstrap";
import { getToken } from "../../services/tokenServices";

const OrdersPage = () => {
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);

  const { orders: ordersData } = useSelector((state) => state.order);
  // const { accessToken } = useSelector((state) => state.auth);
  const accessToken = getToken();

  useEffect(() => {
    dispatch(getUsersOrdersThunk(accessToken));
  }, [dispatch]);

  useEffect(() => {
    setOrders(ordersData);
  }, [ordersData]);
  return (
    <div className="mt-4">
      <h1>Orders</h1>
      <ListGroup>
        {orders.orders?.map((order) => (
          <ListGroup.Item
            key={order._id}
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2">
              <div className="fw-bold">Order #{order._id}</div>
              <p className="mb-1">
                <strong>Total Price: </strong>${order.totalPrice.toFixed(2)}
              </p>
              <p className="m-b-1">
                <strong>Shipping Address: </strong>
                {`${order.shippingAdress.address},
                ${order.shippingAdress.city},
                ${order.shippingAdress.postalCode},
                ${order.shippingAdress.country},`}
              </p>
              <div>
                <strong>Prodcts:</strong>
                <ul>
                  {order.products.map((product, idx) => (
                    <li key={idx}>
                      {product.product.name} - Quantity: {product.quantity} -
                      Price: ${product.product.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h5>
              <Badge
                bg={order.isDelivered ? "success" : "warning"}
                className={`${!order.isDelivered && "text-dark"}`}
                pill
              >
                {order.isDelivered ? "Delivered" : "Pending"}
              </Badge>
            </h5>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default OrdersPage;
