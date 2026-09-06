import api from "../../../lib/api";
import { extractOne } from "../../../lib/api-response";
import { Product } from "../types/product.types";
import { mapProduct, BackendProduct, toBackendProduct } from "./getProducts";

type CreateProductProps = {
    CreateData: Product;
};

export default async function createProduct({ CreateData }: CreateProductProps) {
    const { data } = await api.post(`/products`, toBackendProduct(CreateData));
    const product = extractOne<BackendProduct>(data, "product");
    return product ? mapProduct(product) : undefined;
}