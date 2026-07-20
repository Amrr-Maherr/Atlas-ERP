import api from "../../../lib/api";

type DeleteProductProps = {
    id: string;
};

export default async function deleteProduct({ id }: DeleteProductProps) {
    const { data } = await api.delete(`/products/${id}`);
    return data;
}
