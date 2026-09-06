import api from "../../../lib/api";
import { extractList, extractOne, mapId } from "../../../lib/api-response";
import { Sale } from "../types/sale.types";
import { toBackendSort, type ListQuery } from "../../../lib/list-query";

type BackendOrderItem = {
  quantity: number;
  price: number;
};

export type BackendOrder = {
  _id: string;
  orderNumber: string;
  type: string;
  items?: BackendOrderItem[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  orderDate?: string;
  createdAt?: string;
  updatedAt?: string;
};

export function mapOrderToSale(o: BackendOrder): Sale {
  const items = Array.isArray(o.items) ? o.items : [];
  return {
    id: mapId(o).id,
    invoiceNumber: o.orderNumber,
    customerId: "",
    cashierId: "",
    subtotal: o.totalAmount,
    tax: 0,
    discount: 0,
    total: o.totalAmount,
    paymentMethod: "",
    paymentStatus: o.paymentStatus ?? "unpaid",
    invoiceStatus: o.status ?? "completed",
    notes: "",
    createdAt: o.createdAt ?? "",
    updatedAt: o.updatedAt ?? "",
    employeeId: "",
    saleDate: o.orderDate ?? o.createdAt ?? "",
    shippingAddress: "",
    shippingMethod: "",
    shippingCost: 0,
    paidAmount: 0,
    changeAmount: 0,
    items: items.length,
    customerName: "",
    employeeName: "",
    orderStatus: o.status ?? "completed",
    remainingAmount: 0,
  };
}

export function toBackendOrder(data: Partial<Sale>) {
  return {
    orderNumber: data.invoiceNumber,
    type: "sale",
    items: data.items && data.items > 0 ? [] : undefined,
    totalAmount: data.total,
    status: data.orderStatus ?? data.invoiceStatus,
    paymentStatus: data.paymentStatus,
  };
}

export async function getSales({ page = 1, per_page = 10, search, sort }: ListQuery = {}) {
  const { data } = await api.get("/orders", {
    params: {
      page,
      limit: per_page,
      type: "sale",
      search,
      sort: toBackendSort(sort, {
        invoiceNumber: "orderNumber",
        total: "totalAmount",
        orderStatus: "status",
      }),
    },
  });
  const { items, total } = extractList<BackendOrder>(data, "orders");
  return { items: items.map(mapOrderToSale), total };
}

type GetSaleProps = {
  id: string;
};

export async function getSale({ id }: GetSaleProps) {
  const { data } = await api.get(`/orders/${id}`);
  const order = extractOne<BackendOrder>(data, "order");
  return order ? mapOrderToSale(order) : undefined;
}

export async function DeleteSale({ id }: GetSaleProps) {
  const { data } = await api.delete(`/orders/${id}`);
  return data;
}

type CreateSaleProps = {
  CreateData: Sale;
};

export async function CreateSale({ CreateData }: CreateSaleProps) {
  const { data } = await api.post("/orders", toBackendOrder(CreateData));
  const order = extractOne<BackendOrder>(data, "order");
  return order ? mapOrderToSale(order) : undefined;
}

type UseUpdateSaleProps = {
  id: string;
  UpdateData: Sale;
};

export async function UpdateSale({ id, UpdateData }: UseUpdateSaleProps) {
  const { data } = await api.patch(`/orders/${id}`, toBackendOrder(UpdateData));
  const order = extractOne<BackendOrder>(data, "order");
  return order ? mapOrderToSale(order) : undefined;
}