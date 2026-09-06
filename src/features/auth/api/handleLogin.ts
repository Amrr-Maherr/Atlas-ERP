import axios from "axios";
import api from "../../../lib/api";

type HandleLoginProps = {
    email: string;
    password: string;
};

export default async function handleLogin({ email, password }: HandleLoginProps) {
    try {
        const { data } = await api.post("/auth/login", { email, password });

        const user = data.data?.user as {
            _id: string;
            name: string;
            email: string;
            role: string;
        };

        if (!user) {
            throw new Error("Invalid login response.");
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem(
            "user",
            JSON.stringify({ id: user._id, name: user.name, email: user.email, role: user.role }),
        );

        return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message;
            if (message) throw new Error(message);
        }
        throw error instanceof Error
            ? error
            : new Error("Login failed. Please try again.");
    }
}