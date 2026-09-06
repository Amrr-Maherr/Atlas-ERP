import api from "../../../lib/api";
import { extractOne } from "../../../lib/api-response";
import { Product } from "../types/product.types";
import { mapProduct, BackendProduct, toBackendProduct } from "./getProducts";

type UpdateProductProps = {
    id: string;
    UpdateData: Product;
};

export default async function updateProduct({ id, UpdateData }: UpdateProductProps) {
    const { data } = await api.patch(`/products/${id}`, toBackendProduct(UpdateData));
    const product = extractOne<BackendProduct>(data, "product");
    return product ? mapProduct(product) : undefined;
}