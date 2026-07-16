import { useQuery } from "@tanstack/react-query";
import getInventory from "../api/getInventory";

export default function useInventory() {
    return useQuery({
        queryKey: ["inventory"],
        queryFn: () => getInventory(),
    });
}
