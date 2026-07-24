"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateProduct from "../api/updateProduct";
import { Product } from "../types/product.types";

type UseUpdateProductProps = {
    id: string;
    UpdateData: Product;
};

export default function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, UpdateData }: UseUpdateProductProps) => updateProduct({ id, UpdateData }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
}
