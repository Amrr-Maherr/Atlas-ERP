import api from "../../../lib/api";
import { extractList, extractOne } from "../../../lib/api-response";
import { Product } from "../types/product.types";
import { toBackendSort, type ListQuery } from "../../../lib/list-query";

export type BackendProduct = {
  _id: string;
  name: string;
  sku: string;
  category?: string;
  price: number;
  costPrice?: number;
  stock?: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export function mapProduct(p: BackendProduct): Product {
  const id = String(p._id);
  const status = p.status ?? "active";
  return {
    id,
    name: p.name,
    sku: p.sku,
    barcode: "",
    categoryId: p.category ?? "",
    supplierId: "",
    price: p.price,
    costPrice: p.costPrice ?? 0,
    stock: p.stock ?? 0,
    minStock: 0,
    description: "",
    image: "",
    status,
    unit: "",
    warranty: "",
    createdAt: p.createdAt ?? "",
    updatedAt: p.updatedAt ?? "",
    slug: "",
    brand: "",
    wholesalePrice: 0,
    specifications: {},
    tags: [],
    weight: 0,
    dimensions: "",
    color: "",
    material: "",
    model: "",
    originCountry: "",
    isFeatured: false,
    averageRating: 0,
    reviewCount: 0,
    gallery: [],
    shortDescription: "",
    taxRate: 0,
    discount: 0,
    reservedStock: 0,
    maximumStock: 0,
    reorderLevel: 0,
    warehouseLocation: "",
    notes: "",
  };
}

export function toBackendProduct(p: Partial<Product>) {
  return {
    name: p.name,
    sku: p.sku,
    category: p.categoryId,
    price: p.price,
    costPrice: p.costPrice,
    stock: p.stock,
    status: p.status,
  };
}

export default async function getProducts({ page = 1, per_page = 10, search, sort }: ListQuery = {}) {
  const { data } = await api.get("/products", {
    params: { page, limit: per_page, search, sort: toBackendSort(sort, { description: "name" }) },
  });
  const { items, total } = extractList<BackendProduct>(data, "products");
  return { items: items.map(mapProduct), total };
}