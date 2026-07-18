import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

type GetProductsProps = {
  page?: number;
  per_page?: number;
};

export default async function getProducts({ page = 1, per_page = 10 }: GetProductsProps = {}) {
    const { data } = await api.get(`/products?_page=${page}&_per_page=${per_page}`);
    return { items: data.data, total: data.items };
}
