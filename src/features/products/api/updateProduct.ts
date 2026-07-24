import api from "../../../lib/api";
import { Product } from "../types/product.types";

type UpdateProductProps = {
    id: string;
    UpdateData: Product;
};

export default async function updateProduct({ id, UpdateData }: UpdateProductProps) {
    const { data } = await api.patch(`/products/${id}`, UpdateData);
    return data;
}
