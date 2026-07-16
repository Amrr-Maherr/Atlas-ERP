import { useQuery } from "@tanstack/react-query";
import getSales from "../api/getSales";

export default function useSales() {
    return useQuery({
        queryKey: ["sales"],
        queryFn: () => getSales(),
    });
}
