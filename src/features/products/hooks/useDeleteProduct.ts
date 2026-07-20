"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteProduct from "../api/deleteProduct";

export default function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id }: { id: string }) => deleteProduct({ id }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
}
