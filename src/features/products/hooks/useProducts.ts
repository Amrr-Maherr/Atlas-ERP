import { useQuery } from "@tanstack/react-query";
import getProducts from "../api/getProducts";
import type { ListQuery } from "../../../lib/list-query";

export default function useProducts({ page = 1, per_page = 10, search, sort }: ListQuery = {}) {
    return useQuery({
        queryKey: ["products", page, per_page, search, sort],
        queryFn: () => getProducts({ page, per_page, search, sort }),
    });
}
