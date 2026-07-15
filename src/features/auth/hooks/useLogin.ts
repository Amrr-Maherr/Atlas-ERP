import { useMutation } from "@tanstack/react-query";
import handleLogin from "../api/handleLogin";

type LoginInput = {
    email: string;
    password: string;
};

export default function useLogin() {
    return useMutation({
        mutationFn: ({ email, password }: LoginInput) =>
            handleLogin({ email, password }),
    });
}
