import { useQuery } from "@tanstack/react-query";
import getSetting from "../api/getSetting";

type UseSettingProps = {
    id: string;
};

export default function useSetting({ id }: UseSettingProps) {
    return useQuery({
        queryKey: ["settings", id],
        queryFn: () => getSetting({ id }),
    });
}
