import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export default async function getCustomers() {
    const { data } = await api.get("/customers");
    return data;
}
