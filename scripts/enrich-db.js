const fs = require('fs');
const path = require('path');

const DB_PATH = path.resolve(__dirname, '..', 'db.json');
const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

// ── Helpers ──
const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[rnd(0, arr.length - 1)];
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const egyptianFirstNames = [
  'Ahmed', 'Mohamed', 'Omar', 'Ali', 'Hassan', 'Hussein', 'Khaled', 'Mahmoud',
  'Amr', 'Youssef', 'Mostafa', 'Ibrahim', 'Tarek', 'Walid', 'Sherif', 'Karim',
  'Nour', 'Sara', 'Mona', 'Fatma', 'Nada', 'Yasmin', 'Hana', 'Layla',
  'Heba', 'Dina', 'Maha', 'Salma', 'Mariam', 'Nada', 'Rania', 'Nehal'
];
const egyptianLastNames = [
  'Maher', 'Hassan', 'Ali', 'Ibrahim', 'Youssef', 'Ahmed', 'Mounir', 'Fawzy',
  'Bakry', 'Ashraf', 'Youssef', 'El-Din', 'Nabil', 'Refaat', 'Ghaly', 'Saleh',
  'Farouk', 'Rashid', 'Saeed', 'Kamal', 'Nasser', 'Abbas', 'Khalil', 'Sami'
];
const cities = ['Cairo', 'Alexandria', 'Giza', 'Mansoura', 'Zagazig', 'Tanta', 'Aswan', 'Luxor', 'Port Said', 'Ismailia'];
const streets = ['El-Tahrir', 'El-Marg', 'El-Salam', 'El-Thawra', 'El-Kornish', 'El-Sha\'aer', 'Pyramids Road', 'Corniche'];
const brands = ['Apple', 'Dell', 'Lenovo', 'HP', 'ASUS', 'Acer', 'Samsung', 'Logitech', 'Razer', 'HyperX', 'Corsair', 'BenQ'];
const paymentMethods = ['Cash', 'Visa', 'MasterCard', 'Vodafone Cash', 'Bank Transfer', 'InstaPay'];
const departments = ['Administration', 'Management', 'Sales', 'Warehouse', 'Finance', 'HR', 'IT', 'Marketing'];
const positions = ['Admin', 'Manager', 'Sales Representative', 'Cashier', 'Warehouse Supervisor', 'Accountant', 'HR Specialist', 'IT Support', 'Branch Manager'];
const supplierBrands = { '75bab921': ['Apple', 'Dell', 'Lenovo', 'HP'], 'd2470eeb': ['ASUS', 'Acer', 'BenQ'], '0f2f3407': ['Logitech', 'Razer', 'HyperX', 'Corsair'] };

// ── 1. Users ──
console.log('Enriching users...');
data.users = data.users.map((u, i) => {
  const [first, last] = u.name.split(' ');
  return {
    ...u,
    firstName: first,
    lastName: last,
    avatar: `/images/avatars/${u.name.toLowerCase().replace(/\s+/g, '-')}.png`,
    phone: `+20150${String(1000001 + i).slice(0, 7)}`,
    department: pick(departments),
    position: u.role,
    permissions: u.role === 'admin' ? ['all'] : u.role === 'manager' ? ['sales', 'reports', 'inventory', 'employees'] : u.role === 'warehouse' ? ['inventory', 'purchase_orders'] : ['sales', 'customers'],
    lastLogin: `2026-07-${String(rnd(1, 15)).padStart(2, '0')}T${String(rnd(8, 22)).padStart(2, '0')}:${String(rnd(0, 59)).padStart(2, '0')}:00.000Z`,
    createdAt: u.createdAt || '2026-01-15T08:00:00.000Z',
    updatedAt: `2026-07-${String(rnd(1, 15)).padStart(2, '0')}T08:00:00.000Z`
  };
});

// ── 2. Categories ──
console.log('Enriching categories...');
data.categories = data.categories.map((c, i) => ({
  ...c,
  slug: slugify(c.name),
  image: `/images/categories/${slugify(c.name)}.png`,
  displayOrder: i + 1,
  seoTitle: `${c.name} - Atlas ERP Store`,
  seoDescription: `Browse our wide selection of ${c.name.toLowerCase()}. ${c.description}.`,
  metaKeywords: [c.name.toLowerCase(), 'atlas erp', 'shop online', 'egypt'],
  parentCategory: null,
  productCount: data.products.filter(p => p.categoryId === c.id).length
}));

// ── 3. Suppliers ──
console.log('Enriching suppliers...');
const supplierPaymentTerms = ['Net 30', 'Net 60', 'Net 90', 'COD', 'Prepaid', 'Net 45'];
data.suppliers = data.suppliers.map((s, i) => ({
  ...s,
  companyName: s.name,
  balance: parseFloat((Math.random() * 50000).toFixed(2)),
  rating: parseFloat((3 + Math.random() * 2).toFixed(1)),
  totalOrders: rnd(5, 50),
  lastOrderDate: `2026-${String(rnd(1, 6)).padStart(2, '0')}-${String(rnd(1, 28)).padStart(2, '0')}T09:00:00.000Z`,
  paymentTerms: pick(supplierPaymentTerms),
  deliveryDays: rnd(7, 30),
  isVerified: Math.random() > 0.2,
  contactPhone: `+2010${String(rnd(10000000, 99999999))}`,
  contactEmail: s.email
}));

// ── 4. Products ──
console.log('Enriching products...');
const specMap = {
  LAP: { screen: ['13.3"', '14"', '15.6"', '16"', '17.3"'], ram: ['8GB', '16GB', '32GB', '64GB'], storage: ['256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD'], cpu: ['Intel i5-1340P', 'Intel i7-13700H', 'Intel i9-13980HX', 'Apple M3', 'AMD Ryzen 7'] },
  DES: { cpu: ['Intel i5-14400', 'Intel i7-14700', 'AMD Ryzen 5 7600', 'AMD Ryzen 9 7900'], ram: ['16GB', '32GB', '64GB'], storage: ['512GB SSD', '1TB SSD', '2TB SSD'] },
  MON: { size: ['24"', '27"', '32"', '34"', '49"'], resolution: ['1080p', '1440p', '4K', 'UWQHD'], panel: ['IPS', 'VA', 'OLED', 'TN'], refreshRate: ['60Hz', '75Hz', '144Hz', '165Hz', '240Hz'] },
  KBD: { type: ['Mechanical', 'Membrane', 'Mechanical RGB'], switches: ['Cherry MX Red', 'Cherry MX Blue', 'Cherry MX Brown', 'Gateron Red'], connectivity: ['Wired USB', 'Wireless', 'Bluetooth'] },
  MS: { type: ['Ergonomic', 'Gaming', 'Trackball', 'Wireless'], dpi: ['800', '1600', '3200', '16000'], connectivity: ['Wired USB', 'Wireless 2.4GHz', 'Bluetooth'] },
  HDS: { type: ['Over-ear', 'In-ear', 'On-ear', 'Gaming'], driver: ['40mm', '50mm', '53mm'], anc: ['Yes', 'No'], connectivity: ['Wired', 'Wireless', 'Bluetooth 5.2'] },
  PRI: { type: ['Laser', 'Inkjet', 'Thermal', 'Label'], speed: ['20 ppm', '30 ppm', '50 ppm'], resolution: ['600x600', '1200x1200', '4800x1200'] },
  NET: { type: ['Router', 'Switch', 'Access Point', 'Modem'], speed: ['100 Mbps', '1 Gbps', '2.5 Gbps', '10 Gbps'], ports: ['4', '8', '16', '24'] },
  SFT: { type: ['Antivirus', 'Office Suite', 'OS License'], duration: ['1 Year', '2 Years', 'Lifetime'] },
  PRN: { type: ['Laser', 'Inkjet', '3D'], speed: ['20 ppm', '30 ppm', '100 mm/s'], resolution: ['600x600', '1200x1200'] },
  CBL: { type: ['USB-C', 'HDMI', 'Ethernet', 'Power Cable'], length: ['1m', '1.5m', '2m', '3m'], speed: ['5 Gbps', '10 Gbps', '40 Gbps'] },
  PWR: { type: ['UPS', 'Surge Protector', 'Power Strip'], capacity: ['600VA', '1000VA', '1500VA', '2000VA'] },
  STG: { type: ['External HDD', 'External SSD', 'USB Flash', 'NAS'], capacity: ['500GB', '1TB', '2TB', '4TB', '8TB'], interface: ['USB 3.0', 'USB 3.2', 'Thunderbolt 4'] },
  ACC: { type: ['Mouse Pad', 'Webcam', 'Microphone', 'Desk Lamp'], feature: ['RGB', 'Adjustable', '4K', 'Noise Cancelling'] }
};

data.products = data.products.map((p, i) => {
  const prefix = p.sku.split('-')[0];
  const specs = specMap[prefix] || {};
  const specList = {};
  for (const [key, values] of Object.entries(specs)) {
    specList[key] = pick(values);
  }
  return {
    ...p,
    slug: slugify(p.name),
    brand: pick(brands),
    wholesalePrice: parseFloat((p.costPrice * 0.85).toFixed(2)),
    specifications: specList,
    tags: [p.sku.split('-')[0].toLowerCase(), p.name.split(' ')[0].toLowerCase()],
    weight: parseFloat((Math.random() * 8 + 0.2).toFixed(2)),
    dimensions: `${rnd(20, 60)}x${rnd(15, 40)}x${rnd(5, 15)}cm`,
    color: pick(['Black', 'Silver', 'White', 'Space Gray', 'Blue']),
    material: pick(['Plastic', 'Aluminum', 'Steel', 'Carbon Fiber']),
    model: p.name,
    originCountry: pick(['China', 'Taiwan', 'USA', 'Japan', 'South Korea', 'Germany']),
    isFeatured: Math.random() > 0.7,
    averageRating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
    reviewCount: rnd(0, 150),
    createdAt: p.createdAt || `2026-02-${String(rnd(1, 28)).padStart(2, '0')}T08:00:00.000Z`,
    updatedAt: p.updatedAt || p.createdAt || `2026-02-${String(rnd(1, 28)).padStart(2, '0')}T08:00:00.000Z`
  };
});

// ── 5. Customers ──
console.log('Enriching customers...');
data.customers = data.customers.map((c, i) => {
  const [first, last] = c.name.split(' ');
  return {
    ...c,
    firstName: first,
    lastName: last,
    gender: Math.random() > 0.4 ? 'Male' : 'Female',
    birthDate: `19${rnd(70, 99)}-${String(rnd(1, 12)).padStart(2, '0')}-${String(rnd(1, 28)).padStart(2, '0')}`,
    companyName: Math.random() > 0.7 ? `${first} ${last} Trading` : null,
    taxNumber: Math.random() > 0.7 ? `TAX-${rnd(100000, 999999)}` : null,
    creditLimit: pick([0, 5000, 10000, 25000, 50000]),
    paymentTerms: pick(['Cash', 'Net 30', 'Net 60']),
    preferredContact: pick(['Phone', 'Email', 'WhatsApp']),
    vipStatus: c.totalSpent > 15000 ? 'Gold' : c.totalSpent > 5000 ? 'Silver' : 'Bronze',
    totalOrders: rnd(1, 30),
    lastOrderDate: `2026-${String(rnd(1, 6)).padStart(2, '0')}-${String(rnd(1, 28)).padStart(2, '0')}T12:00:00.000Z`,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt
  };
});

// ── 6. Employees ──
console.log('Enriching employees...');
const empIds = data.employees.map(e => e.id);
data.employees = data.employees.map((e, i) => {
  const [first, last] = e.name.split(' ');
  const nationalId = `2${rnd(80, 99)}${String(rnd(1, 12)).padStart(2, '0')}${String(rnd(1, 28)).padStart(2, '0')}${rnd(100000, 999999)}`;
  return {
    ...e,
    firstName: first,
    lastName: last,
    position: e.role || pick(positions),
    managerId: e.role === 'Admin' ? null : empIds[rnd(0, Math.min(1, empIds.length - 1))],
    emergencyContact: { name: `${pick(egyptianFirstNames)} ${pick(egyptianLastNames)}`, phone: `+201${rnd(0, 9)}${rnd(10000000, 99999999)}`, relationship: pick(['Spouse', 'Parent', 'Sibling', 'Friend']) },
    nationalId,
    dateOfBirth: `19${rnd(75, 95)}-${String(rnd(1, 12)).padStart(2, '0')}-${String(rnd(1, 28)).padStart(2, '0')}`,
    address: `${rnd(1, 200)} ${pick(streets)} Street, ${pick(cities)}`,
    city: pick(cities),
    bankAccount: `EG${rnd(10000000, 99999999)}${rnd(100000, 999999)}`,
    taxId: `TAX-EG-${rnd(1000, 9999)}`,
    documents: [`${e.name.toLowerCase().replace(/\s+/g, '-')}-id.pdf`, `${e.name.toLowerCase().replace(/\s+/g, '-')}-contract.pdf`],
    certifications: e.role === 'Admin' ? ['PMP', 'ISO 27001'] : e.role === 'Manager' ? ['MBA', 'Six Sigma'] : [],
    createdAt: e.createdAt,
    updatedAt: e.updatedAt
  };
});

// Build employee ID lookup for sales
const employeeEmailToId = {};
data.employees.forEach(e => { employeeEmailToId[e.email] = e.id; });
// cashierId maps from sales to employee via email matching or use the cashierId directly (it's already an employee UUID)

// ── 7. Sales ──
console.log('Enriching sales...');
data.sales = data.sales.map((s, i) => {
  const cust = data.customers.find(c => c.id === s.customerId);
  const emp = data.employees.find(e => e.id === s.cashierId);
  const saleDate = s.createdAt;
  const paidAmount = s.paymentStatus === 'Paid' ? s.total : s.paymentStatus === 'Refunded' ? 0 : parseFloat((s.total * Math.random()).toFixed(2));
  return {
    ...s,
    employeeId: s.cashierId,
    saleDate,
    shippingAddress: cust ? cust.address : '',
    shippingMethod: pick(['Standard', 'Express', 'Pickup', 'Same Day']),
    shippingCost: pick([0, 25, 50, 75, 100]),
    paidAmount,
    changeAmount: paidAmount > s.total ? parseFloat((paidAmount - s.total).toFixed(2)) : 0,
    items: data.saleItems.filter(si => si.saleId === s.id).length,
    customerName: cust ? cust.name : '',
    employeeName: emp ? emp.name : '',
    createdAt: s.createdAt,
    updatedAt: s.updatedAt
  };
});

// ── 8. Sale Items ──
console.log('Enriching sale items...');
data.saleItems = data.saleItems.map((si, i) => {
  const prod = data.products.find(p => p.id === si.productId);
  return {
    ...si,
    discount: parseFloat((si.unitPrice * si.quantity * (Math.random() * 0.1)).toFixed(2)),
    tax: parseFloat((si.total * 0.14).toFixed(2)),
    notes: '',
    productName: prod ? prod.name : '',
    sku: prod ? prod.sku : '',
    lineTotal: si.total
  };
});

// ── 9. Purchase Orders ──
console.log('Enriching purchase orders...');
data.purchaseOrders = data.purchaseOrders.map((po, i) => {
  const [mm, dd] = po.orderDate.split('-');
  const orderYear = 2026;
  const properOrderDate = `${orderYear}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}T09:00:00.000Z`;
  const [emm, edd] = po.expectedDate.split('-');
  const properExpectedDate = `${orderYear}-${emm.padStart(2, '0')}-${edd.padStart(2, '0')}T14:00:00.000Z`;
  const receivedDate = po.status === 'Received' ? `${orderYear}-${emm.padStart(2, '0')}-${edd.padStart(2, '0')}T14:00:00.000Z` : null;

  // Generate items array based on approximate item count
  const itemCount = rnd(2, 6);
  const items = [];
  for (let j = 0; j < itemCount; j++) {
    const prod = data.products[rnd(0, data.products.length - 1)];
    const qty = rnd(5, 50);
    items.push({
      productId: prod.id,
      productName: prod.name,
      sku: prod.sku,
      quantity: qty,
      unitCost: prod.costPrice,
      total: parseFloat((qty * prod.costPrice).toFixed(2))
    });
  }

  return {
    ...po,
    employeeId: data.employees[rnd(2, 3)].id, // warehouse or manager employees
    orderDate: properOrderDate,
    expectedDate: properExpectedDate,
    receivedDate,
    items,
    shippingAddress: `${pick(cities)} Warehouse - ${rnd(1, 50)} ${pick(streets)} Street`,
    paymentStatus: po.status === 'Received' ? 'Paid' : po.status === 'Approved' ? 'Pending' : 'Unpaid',
    paymentMethod: pick(['Bank Transfer', 'Vodafone Cash', 'Check', 'Cash']),
    approvedBy: data.employees[1].id, // manager
    createdAt: po.createdAt,
    updatedAt: po.updatedAt
  };
});

// ── Write ──
console.log('Writing enriched db.json...');
fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
console.log(`Done! Enriched: ${data.users.length} users, ${data.categories.length} categories, ${data.suppliers.length} suppliers, ${data.products.length} products, ${data.customers.length} customers, ${data.employees.length} employees, ${data.sales.length} sales, ${data.saleItems.length} saleItems, ${data.purchaseOrders.length} purchaseOrders`);
