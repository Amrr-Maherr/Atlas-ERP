import api from "../../../lib/api";
import { extractOne } from "../../../lib/api-response";
import { Product } from "../types/product.types";
import { mapProduct, BackendProduct } from "./getProducts";

type GetProductProps = {
    id: string;
};

export default async function getProduct({ id }: GetProductProps) {
    const { data } = await api.get(`/products/${id}`);
    const product = extractOne<BackendProduct>(data, "product");
    return product ? mapProduct(product) : undefined;
}