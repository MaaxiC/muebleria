import axios from 'axios';

export const fetchOrders = async () => {
    const { data } = await axios.get(`http://localhost:4000/api/ordenes/${window.location.search}`);
    return data;
};

export const fetchOrdersByPage = async (page) => {
    const { data } = await axios.get(`http://localhost:4000/api/ordenes/?page=${page}`);
    return data;
};

export const updateOrder = async (id, order) => {
    const { data } = await axios.put(`http://localhost:4000/api/ordenes/${id}`, order);
    return data;
};