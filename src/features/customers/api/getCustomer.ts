import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

type GetCustomerProps = {
    id: string;
};

export default async function getCustomer({ id }: GetCustomerProps) {
    const { data } = await api.get(`/customers/${id}`);
    return data;
}
