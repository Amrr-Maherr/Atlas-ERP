import { Product } from "../types/product.types";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/components/utils/format-date";
import { ImageIcon, PencilIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProductStatusBadge } from "./product-status-badge";

type ProductsTableRowProps = {
  product: Product;
};

export function ProductsTableRow({ product }: ProductsTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-md bg-muted overflow-hidden">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : (
              <ImageIcon className="size-4 text-muted-foreground" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{product.name}</span>
            <span className="text-xs text-muted-foreground">
              {product.brand}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
          {product.sku}
        </code>
      </TableCell>
      <TableCell className="max-w-[200px] truncate text-muted-foreground">
        {product.description}
      </TableCell>
      <TableCell>
        <span className="font-medium tabular-nums">${product.price}</span>
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{product.stock}</Badge>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(product.createdAt)}
      </TableCell>
      <TableCell>
        <ProductStatusBadge status={product.status} />
      </TableCell>
      <TableCell className="text-end">
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/dashboard/products/${product.id}`}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-sm" }),
            )}
          >
            <PencilIcon />
          </Link>
          <Button variant="destructive" size="icon-sm">
            <Trash2Icon />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
