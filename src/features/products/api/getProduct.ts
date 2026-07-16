import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

type GetProductProps = {
    id: string;
};

export default async function getProduct({ id }: GetProductProps) {
    const { data } = await api.get(`/products/${id}`);
    return data;
}
