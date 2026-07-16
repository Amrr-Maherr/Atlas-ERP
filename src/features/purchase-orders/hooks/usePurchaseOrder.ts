import { useQuery } from "@tanstack/react-query";
import getPurchaseOrder from "../api/getPurchaseOrder";

type UsePurchaseOrderProps = {
    id: string;
};

export default function usePurchaseOrder({ id }: UsePurchaseOrderProps) {
    return useQuery({
        queryKey: ["purchaseOrders", id],
        queryFn: () => getPurchaseOrder({ id }),
    });
}
