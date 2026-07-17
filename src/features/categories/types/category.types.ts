export type Category = {
  id: string;
  name: string;
  description: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  image: string;
  displayOrder: number;
  seoTitle: string;
  seoDescription: string;
  metaKeywords: string[];
  parentCategory: string | null;
  productCount: number;
  status: string;
};
