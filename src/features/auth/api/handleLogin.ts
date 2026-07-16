import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
});

type HandleLoginProps = {
    email: string;
    password: string;
};

export default async function handleLogin({ email, password }: HandleLoginProps) {
    const { data: users } = await api.get("/users", {
        params: { email },
    });

    if (!users.length) {
        throw new Error("Invalid email or password.");
    }

    const user = users[0];

    if (user.password !== password) {
        throw new Error("Invalid password.");
    }
    if (user.email !== email) {
        throw new Error("Invalid email.");
    }

    if (!user.isActive) {
        throw new Error("Your account has been deactivated.");
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
}
