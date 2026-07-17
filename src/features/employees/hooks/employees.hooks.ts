"use client";

import { useQuery } from "@tanstack/react-query";
import { getEmployees, getEmployee } from "../api/employees.api";

export function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: () => getEmployees(),
  });
}

type UseEmployeeProps = {
  id: string;
};

export function useEmployee({ id }: UseEmployeeProps) {
  return useQuery({
    queryKey: ["employees", id],
    queryFn: () => getEmployee({ id }),
  });
}
