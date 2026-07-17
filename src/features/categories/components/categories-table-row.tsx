import { Category } from "../types/category.types";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/components/utils/format-date";
import { ImageIcon, EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CategoryStatusBadge } from "./category-status-badge";

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
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/dashboard/categories/${category.id}`}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-sm" }),
            )}
          >
            <EyeIcon />
          </Link>
          <Button variant="ghost" size="icon-sm">
            <PencilIcon />
          </Button>
          <Button variant="destructive" size="icon-sm">
            <Trash2Icon />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
