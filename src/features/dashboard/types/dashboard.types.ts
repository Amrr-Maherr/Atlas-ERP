export type DashboardCategory = {
  id: string;
  name: string;
  productCount: number;
  status: string;
};

export type DashboardCustomer = {
  id: string;
  name: string;
  email: string;
  city: string;
  totalSpent: number;
  totalOrders: number;
  vipStatus: string;
  status: string;
  createdAt: string;
  lastOrderDate: string | null;
  customerSince: string;
};

export type DashboardSupplier = {
  id: string;
  name: string;
  totalOrders: number;
  rating: number;
  status: string;
};

export type DashboardEmployee = {
  id: string;
  name: string;
  role: string;
  department: string;
  salary: number;
  isActive: boolean;
  performanceRating: number;
  salesCount: number;
};

export type DashboardProduct = {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  supplierId: string;
  price: number;
  costPrice: number;
  stock: number;
  minStock: number;
  reorderLevel: number;
  status: string;
  brand: string;
};

export type DashboardSale = {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  employeeName: string;
  total: number;
  paidAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  invoiceStatus: string;
  orderStatus: string;
  createdAt: string;
  saleDate: string;
  items: Array<{ productId: string; productName: string; quantity: number }>;
};

export type DashboardPurchaseOrder = {
  id: string;
  poNumber: string;
  supplierId: string;
  total: number;
  status: string;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
  orderDate: string;
};
