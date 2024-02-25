import axios from "axios";

export const createOrder = async (order) => {
  const { data } = await axios.post(
    "http://localhost:4000/api/ordenes",
    order,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const fetchOrders = async (dni) => {
  const { data } = await axios.get(`http://localhost:4000/api/ordenes/user/${dni}`);
  return data;
}

export const updateOrder = async (id, order) => {
  const { data } = await axios.put(
    `http://localhost:4000/api/ordenes/${id}`,
    order,
  );
  return data;
};