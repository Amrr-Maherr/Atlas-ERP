import { useQuery } from "@tanstack/react-query";
import getCategories from "../api/getCategories";

export default function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });
}
