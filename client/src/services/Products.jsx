import axios from 'axios';

export const fetchProducts = async () => {
    const { data } = await axios.get(`http://localhost:4000/api/productos/${window.location.search}`);
    return data;
};

export const fetchProductsByPage = async (page) => {
    const { data } = await axios.get(`http://localhost:4000/api/productos/?page=${page}`);
    return data;
};

export const fetchRecProducts = async () => {
    const { data } = await axios.get(`http://localhost:4000/api/productos/?limit=${4}&page=${1}`);
    return data;
};

export const fetchOneProduct = async (id) => {
    const { data } = await axios.get(`http://localhost:4000/api/productos/${id}`);
    return data;
};

export const fetchCategories = async () => {
    const { data } = await axios.get('http://localhost:4000/api/categorias/');
    return data;
};