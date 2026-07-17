"use client";
import { useCategory } from "@/features/categories";
import { CategoryDetails } from "@/features/categories";
import { useParams } from "next/navigation";

export default function CategoryDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useCategory({ id });

  return (
    <div className="flex flex-col gap-6 p-6">
      <CategoryDetails
        categoryData={data}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
