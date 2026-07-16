import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

type GetSaleProps = {
    id: string;
};

export default async function getSale({ id }: GetSaleProps) {
    const { data } = await api.get(`/sales/${id}`);
    return data;
}
