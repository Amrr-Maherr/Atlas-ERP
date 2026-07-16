import { useQuery } from "@tanstack/react-query";
import getPurchaseOrders from "../api/getPurchaseOrders";

export default function usePurchaseOrders() {
    return useQuery({
        queryKey: ["purchaseOrders"],
        queryFn: () => getPurchaseOrders(),
    });
}
