"use client";

import { useQuery } from "@tanstack/react-query";
import { getSettings, getSetting } from "../api/settings.api";

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettings(),
  });
}

type UseSettingProps = {
  id: string;
};

export function useSetting({ id }: UseSettingProps) {
  return useQuery({
    queryKey: ["settings", id],
    queryFn: () => getSetting({ id }),
  });
}
