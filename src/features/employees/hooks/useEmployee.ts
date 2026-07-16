import { useQuery } from "@tanstack/react-query";
import getEmployee from "../api/getEmployee";

type UseEmployeeProps = {
    id: string;
};

export default function useEmployee({ id }: UseEmployeeProps) {
    return useQuery({
        queryKey: ["employees", id],
        queryFn: () => getEmployee({ id }),
    });
}
