import { useQuery } from "@tanstack/react-query";
import getEmployees from "../api/getEmployees";

export default function useEmployees() {
    return useQuery({
        queryKey: ["employees"],
        queryFn: () => getEmployees(),
    });
}
