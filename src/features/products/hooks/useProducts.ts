import { useQuery } from "@tanstack/react-query";
import getProducts from "../api/getProducts";

export default function useProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: () => getProducts(),
    });
}
