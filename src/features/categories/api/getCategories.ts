import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export default async function getCategories() {
    const { data } = await api.get("/categories");
    return data;
}
