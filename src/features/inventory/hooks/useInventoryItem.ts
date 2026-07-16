import { useQuery } from "@tanstack/react-query";
import getInventoryItem from "../api/getInventoryItem";

type UseInventoryItemProps = {
    id: string;
};

export default function useInventoryItem({ id }: UseInventoryItemProps) {
    return useQuery({
        queryKey: ["inventory", id],
        queryFn: () => getInventoryItem({ id }),
    });
}
