import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

type GetSupplierProps = {
    id: string;
};

export default async function getSupplier({ id }: GetSupplierProps) {
    const { data } = await api.get(`/suppliers/${id}`);
    return data;
}
