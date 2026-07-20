import { Category } from "../types/category.types";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/components/utils/format-date";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { CategoryStatusBadge } from "./category-status-badge";
import { CategoryRowActions } from "./category-row-actions";

type CategoriesTableRowProps = {
  category: Category;
};

export function CategoriesTableRow({ category }: CategoriesTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-md bg-muted overflow-hidden">
            {category.image ? (
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : (
              <ImageIcon className="size-4 text-muted-foreground" />
            )}
          </div>
          <span className="font-medium">{category.name}</span>
        </div>
      </TableCell>
      <TableCell className="max-w-[300px] truncate text-muted-foreground">
        {category.description}
      </TableCell>
      <TableCell>
        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
          {category.slug}
        </code>
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{category.productCount}</Badge>
      </TableCell>
      <TableCell>{category.displayOrder}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(category.createdAt)}
      </TableCell>
      <TableCell>
        <CategoryStatusBadge status={category.status} />
      </TableCell>
      <TableCell className="text-end">
        <CategoryRowActions category={category} />
      </TableCell>
    </TableRow>
  );
}
