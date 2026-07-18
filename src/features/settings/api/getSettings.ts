import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

export default async function getSettings() {
    const { data } = await api.get("/settings?_page=1&_per_page=10");
    return data.data;
}
