"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import createProduct from "../api/createProduct";
import { Product } from "../types/product.types";

type UseCreateProductProps = {
    CreateData: Product;
};

export default function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ CreateData }: UseCreateProductProps) => createProduct({ CreateData }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
}
