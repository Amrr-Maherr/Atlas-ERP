import { useQuery } from "@tanstack/react-query";
import getProduct from "../api/getProduct";

type UseProductProps = {
    id: string;
};

export default function useProduct({ id }: UseProductProps) {
    return useQuery({
        queryKey: ["products", id],
        queryFn: () => getProduct({ id }),
    });
}
