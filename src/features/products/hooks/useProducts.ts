import { useQuery } from "@tanstack/react-query";
import getProducts from "../api/getProducts";

type UseProductsProps = {
  page?: number;
  per_page?: number;
};

export default function useProducts({ page = 1, per_page = 10 }: UseProductsProps = {}) {
    return useQuery({
        queryKey: ["products", page, per_page],
        queryFn: () => getProducts({ page, per_page }),
    });
}
