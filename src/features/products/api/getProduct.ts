import api from "../../../lib/api";

type GetProductProps = {
    id: string;
};

export default async function getProduct({ id }: GetProductProps) {
    const { data } = await api.get(`/products/${id}`);
    return data;
}
