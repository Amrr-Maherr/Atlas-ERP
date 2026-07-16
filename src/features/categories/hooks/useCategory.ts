import { useQuery } from "@tanstack/react-query";
import getCategory from "../api/getCategory";

type UseCategoryProps = {
    id: string;
};

export default function useCategory({ id }: UseCategoryProps) {
    return useQuery({
        queryKey: ["categories", id],
        queryFn: () => getCategory({ id }),
    });
}
