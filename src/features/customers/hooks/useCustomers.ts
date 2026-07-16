import { useQuery } from "@tanstack/react-query";
import getCustomers from "../api/getCustomers";

export default function useCustomers() {
    return useQuery({
        queryKey: ["customers"],
        queryFn: () => getCustomers(),
    });
}
