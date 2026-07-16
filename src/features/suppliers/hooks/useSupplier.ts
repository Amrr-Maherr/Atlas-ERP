import { useQuery } from "@tanstack/react-query";
import getSupplier from "../api/getSupplier";

type UseSupplierProps = {
    id: string;
};

export default function useSupplier({ id }: UseSupplierProps) {
    return useQuery({
        queryKey: ["suppliers", id],
        queryFn: () => getSupplier({ id }),
    });
}
