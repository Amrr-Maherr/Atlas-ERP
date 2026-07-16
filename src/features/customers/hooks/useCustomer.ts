import { useQuery } from "@tanstack/react-query";
import getCustomer from "../api/getCustomer";

type UseCustomerProps = {
    id: string;
};

export default function useCustomer({ id }: UseCustomerProps) {
    return useQuery({
        queryKey: ["customers", id],
        queryFn: () => getCustomer({ id }),
    });
}
