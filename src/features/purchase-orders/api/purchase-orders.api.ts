import api from "../../../lib/api";
import { extractList, extractOne, mapId } from "../../../lib/api-response";
import { PurchaseOrder, PurchaseOrderItem } from "../types/purchase-order.types";
import { BackendOrder } from "../../sales/api/sales.api";
import { toBackendSort, type ListQuery } from "../../../lib/list-query";

export function mapOrderToPurchaseOrder(o: BackendOrder): PurchaseOrder {
  const items: PurchaseOrderItem[] = (Array.isArray(o.items) ? o.items : []).map(
    (item) => ({
      productId: "",
      productName: "",
      sku: "",
      quantity: item.quantity,
      unitCost: item.price,
      total: item.price * item.quantity,
    }),
  );
  return {
    id: mapId(o).id,
    poNumber: o.orderNumber,
    supplierId: "",
    orderDate: o.orderDate ?? o.createdAt ?? "",
    expectedDate: "",
    status: o.status ?? "pending",
    total: o.totalAmount,
    notes: "",
    createdAt: o.createdAt ?? "",
    updatedAt: o.updatedAt ?? "",
    employeeId: "",
    receivedDate: null,
    items,
    shippingAddress: "",
    paymentStatus: o.paymentStatus ?? "unpaid",
    paymentMethod: "",
    approvedBy: "",
    shippingCost: 0,
    tax: 0,
    orderStatus: o.status ?? "pending",
  };
}

export function toBackendPurchaseOrder(data: Partial<PurchaseOrder>) {
  const items = (data.items ?? []).map((item) => ({
    quantity: item.quantity,
    price: item.unitCost,
  }));
  const body: Record<string, unknown> = {
    orderNumber: data.poNumber,
    type: "purchase",
    items,
    totalAmount: data.total,
    status: data.orderStatus ?? data.status,
    paymentStatus: data.paymentStatus,
  };
  return body;
}

export async function getPurchaseOrders({ page = 1, per_page = 10, search, sort }: ListQuery = {}) {
  const { data } = await api.get("/orders", {
    params: {
      page,
      limit: per_page,
      type: "purchase",
      search,
      sort: toBackendSort(sort, {
        poNumber: "orderNumber",
        total: "totalAmount",
        orderStatus: "status",
      }),
    },
  });
  const { items, total } = extractList<BackendOrder>(data, "orders");
  return { items: items.map(mapOrderToPurchaseOrder), total };
}

type GetPurchaseOrderProps = {
  id: string;
};

export async function getPurchaseOrder({ id }: GetPurchaseOrderProps) {
  const { data } = await api.get(`/orders/${id}`);
  const order = extractOne<BackendOrder>(data, "order");
  return order ? mapOrderToPurchaseOrder(order) : undefined;
}

export async function DeletePurchaseOrder({ id }: GetPurchaseOrderProps) {
  const { data } = await api.delete(`/orders/${id}`);
  return data;
}

type CreatePurchaseOrderProps = {
  CreateData: PurchaseOrder;
};

export async function CreatePurchaseOrder({ CreateData }: CreatePurchaseOrderProps) {
  const { data } = await api.post("/orders", toBackendPurchaseOrder(CreateData));
  const order = extractOne<BackendOrder>(data, "order");
  return order ? mapOrderToPurchaseOrder(order) : undefined;
}

type UseUpdatePurchaseOrderProps = {
  id: string;
  UpdateData: PurchaseOrder;
};

export async function UpdatePurchaseOrder({ id, UpdateData }: UseUpdatePurchaseOrderProps) {
  const { data } = await api.patch(`/orders/${id}`, toBackendPurchaseOrder(UpdateData));
  const order = extractOne<BackendOrder>(data, "order");
  return order ? mapOrderToPurchaseOrder(order) : undefined;
}