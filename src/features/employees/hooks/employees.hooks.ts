"use client";

import { useQuery } from "@tanstack/react-query";
import { getEmployees, getEmployee } from "../api/employees.api";

export function useEmployees({ page = 1, per_page = 10 } = {}) {
  return useQuery({
    queryKey: ["employees", page, per_page],
    queryFn: () => getEmployees({ page, per_page }),
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
