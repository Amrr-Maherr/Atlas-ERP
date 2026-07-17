import { Category } from "../types/category.types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { formatDate } from "@/components/utils/format-date";
import { ImageIcon, PackageIcon } from "lucide-react";
import Image from "next/image";
import { CategoryStatusBadge } from "./category-status-badge";

type CategoryDetailsCardProps = {
  category: Category;
};

export function CategoryDetailsCard({ category }: CategoryDetailsCardProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="relative size-16 shrink-0 items-center justify-center rounded-lg bg-muted overflow-hidden">
            {category.image ? (
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <ImageIcon className="size-6 text-muted-foreground" />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <CardTitle className="text-lg @[250px]/card:text-xl">
              {category.name}
            </CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </div>
          <CardAction>
            <CategoryStatusBadge status={category.status} />
          </CardAction>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Separator />

        <div className="flex items-center gap-2">
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
            {category.slug}
          </code>
          {category.parentCategory && (
            <Badge variant="outline" className="text-xs">
              Parent: {category.parentCategory}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 @[400px]/card:grid-cols-4">
          <Field orientation="vertical">
            <FieldLabel>Products</FieldLabel>
            <FieldContent>
              <div className="flex items-center gap-1.5">
                <PackageIcon className="size-4 text-muted-foreground" />
                <Badge variant="secondary">{category.productCount}</Badge>
              </div>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Display Order</FieldLabel>
            <FieldContent>
              <span className="text-sm font-medium tabular-nums">
                {category.displayOrder}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Created</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(category.createdAt)}
              </span>
            </FieldContent>
          </Field>
          <Field orientation="vertical">
            <FieldLabel>Updated</FieldLabel>
            <FieldContent>
              <span className="text-sm text-muted-foreground">
                {formatDate(category.updatedAt)}
              </span>
            </FieldContent>
          </Field>
        </div>

        {category.seoTitle && (
          <>
            <Separator />
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium text-[var(--info)] uppercase tracking-wide">
                SEO
              </p>
              <div className="grid grid-cols-1 gap-3 @[400px]/card:grid-cols-2">
                <Field orientation="vertical">
                  <FieldLabel>SEO Title</FieldLabel>
                  <FieldContent>
                    <span className="text-sm">{category.seoTitle}</span>
                  </FieldContent>
                </Field>
                <Field orientation="vertical">
                  <FieldLabel>Meta Keywords</FieldLabel>
                  <FieldContent>
                    <div className="flex flex-wrap gap-1">
                      {category.metaKeywords.map((keyword) => (
                        <Badge
                          key={keyword}
                          variant="outline"
                          className="text-xs border-[var(--info)]/20 text-[var(--info)]"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </FieldContent>
                </Field>
              </div>
              {category.seoDescription && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {category.seoDescription}
                </p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
