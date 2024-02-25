import axios from 'axios';

export const fetchOrders = async () => {
    const { data } = await axios.get('http://localhost:4000/api/ordenes');
    data.sort().reverse();
    return data;
};

export const updateOrder = async (id, order) => {
    const { data } = await axios.put(`http://localhost:4000/api/ordenes/${id}`, order);
    return data;
};