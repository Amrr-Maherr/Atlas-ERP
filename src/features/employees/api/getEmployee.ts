import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

type GetEmployeeProps = {
    id: string;
};

export default async function getEmployee({ id }: GetEmployeeProps) {
    const { data } = await api.get(`/employees/${id}`);
    return data;
}
