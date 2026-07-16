import { useQuery } from "@tanstack/react-query";
import getSale from "../api/getSale";

type UseSaleProps = {
    id: string;
};

export default function useSale({ id }: UseSaleProps) {
    return useQuery({
        queryKey: ["sales", id],
        queryFn: () => getSale({ id }),
    });
}
