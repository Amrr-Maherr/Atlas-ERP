import api from "../../../lib/api";
import { Product } from "../types/product.types";

type CreateProductProps = {
    CreateData: Product;
};

export default async function createProduct({ CreateData }: CreateProductProps) {
    const { data } = await api.post(`/products`, CreateData);
    return data;
}
