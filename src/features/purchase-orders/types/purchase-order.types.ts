export type PurchaseOrder = {
  id: string;
  poNumber: string;
  supplierId: string;
  orderDate: string;
  expectedDate: string;
  status: string;
  total: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
  employeeId: string;
  receivedDate: string | null;
  items: PurchaseOrderItem[];
  shippingAddress: string;
  paymentStatus: string;
  paymentMethod: string;
  approvedBy: string;
  shippingCost: number;
  tax: number;
  orderStatus: string;
};

export type PurchaseOrderItem = {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitCost: number;
  total: number;
};
