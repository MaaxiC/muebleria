import axios from 'axios';

export const fetchProducts = async () => {
    const { data } = await axios.get(`http://localhost:4000/api/productos/${window.location.search}`);
    return data;
};

export const fetchProductsByCat = async (page, category) => {
    const { data } = await axios.get(`http://localhost:4000/api/productos/category=${category}?page=${page}`);
    return data;
};

export const fetchCountByCat = async (category) => {
    const { data } = await axios.get(`http://localhost:4000/api/productos/count/category=${category}`);
    return data.maxPages;
};

export const fetchRecProducts = async () => {
    const { data } = await axios.get(`http://localhost:4000/api/productos/recommended`);
    return data;
};

export const fetchFavProducts = async () => {
    const { data } = await axios.get(`http://localhost:4000/api/productos/favorites`);
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