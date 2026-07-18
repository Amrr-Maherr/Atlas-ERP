"use client";

import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/users.api";

type UseUserProps = {
  id: string;
};

export function useUser({ id }: UseUserProps) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser({ id }),
    enabled: !!id,
  });
}
