import { useQuery } from "@tanstack/react-query";
import getSuppliers from "../api/getSuppliers";

export default function useSuppliers() {
    return useQuery({
        queryKey: ["suppliers"],
        queryFn: () => getSuppliers(),
    });
}
