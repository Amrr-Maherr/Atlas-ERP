/**
 * Atlas ERP – realistic medium-scale database generator
 * Preserves all existing records & IDs. Enriches fields, adds records, reconciles business logic.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_DIR = path.resolve(__dirname, '..', 'db');
const TAX_RATE = 0.14;

// ── Seeded PRNG (reproducible) ──
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260716);
const rnd = (min, max) => Math.floor(rand() * (max - min + 1)) + min;
const pick = (arr) => arr[rnd(0, arr.length - 1)];
const pickN = (arr, n) => {
  const copy = [...arr];
  const out = [];
  for (let i = 0; i < n && copy.length; i++) {
    const idx = rnd(0, copy.length - 1);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
};
const uuid = () => crypto.randomUUID();
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const round2 = (n) => parseFloat(n.toFixed(2));
const pad = (n, len = 2) => String(n).padStart(len, '0');

// ── Load / Save ──
function loadDb() {
  const db = {};
  const dirs = fs.readdirSync(DB_DIR, { withFileTypes: true });
  for (const entry of dirs) {
    if (!entry.isDirectory()) continue;
    const dirPath = path.join(DB_DIR, entry.name);
    for (const file of fs.readdirSync(dirPath)) {
      if (!file.endsWith('.json')) continue;
      const key = path.basename(file, '.json');
      db[key] = JSON.parse(fs.readFileSync(path.join(dirPath, file), 'utf8'));
    }
  }
  return db;
}

function saveDb(db) {
  const map = {
    categories: 'categories/categories.json',
    suppliers: 'suppliers/suppliers.json',
    products: 'products/products.json',
    customers: 'customers/customers.json',
    employees: 'employees/employees.json',
    users: 'users/users.json',
    sales: 'sales/sales.json',
    saleItems: 'saleItems/saleItems.json',
    purchaseOrders: 'purchaseOrders/purchaseOrders.json',
  };
  for (const [key, rel] of Object.entries(map)) {
    fs.writeFileSync(path.join(DB_DIR, rel), JSON.stringify(db[key], null, 2) + '\n', 'utf8');
  }
}

// ── Reference data ──
const CITIES = [
  { city: 'Cairo', country: 'Egypt', postal: '11511' },
  { city: 'Alexandria', country: 'Egypt', postal: '21500' },
  { city: 'Giza', country: 'Egypt', postal: '12511' },
  { city: 'Mansoura', country: 'Egypt', postal: '35511' },
  { city: 'Tanta', country: 'Egypt', postal: '31511' },
  { city: 'Zagazig', country: 'Egypt', postal: '44511' },
  { city: 'Luxor', country: 'Egypt', postal: '85511' },
  { city: 'Aswan', country: 'Egypt', postal: '81511' },
  { city: 'Port Said', country: 'Egypt', postal: '42511' },
  { city: 'Ismailia', country: 'Egypt', postal: '41511' },
  { city: 'Nasr City', country: 'Egypt', postal: '11371' },
  { city: 'Heliopolis', country: 'Egypt', postal: '11341' },
  { city: 'Maadi', country: 'Egypt', postal: '11431' },
  { city: '6th of October', country: 'Egypt', postal: '12573' },
  { city: 'Minya', country: 'Egypt', postal: '61511' },
];
const STREETS = ['El-Tahrir', 'El-Marg', 'El-Salam', 'El-Thawra', 'El-Kornish', "El-Sha'aer", 'Pyramids Road', 'Corniche', 'El-Nasr', 'Ramses', 'Talaat Harb'];
const FIRST_NAMES = {
  M: ['Ahmed', 'Mohamed', 'Omar', 'Ali', 'Hassan', 'Khaled', 'Mahmoud', 'Amr', 'Youssef', 'Mostafa', 'Ibrahim', 'Tarek', 'Walid', 'Sherif', 'Karim', 'Sami', 'Bassem', 'Tamer', 'Nour', 'Hussein'],
  F: ['Sara', 'Mona', 'Fatma', 'Nada', 'Yasmin', 'Hana', 'Layla', 'Heba', 'Dina', 'Maha', 'Salma', 'Mariam', 'Rania', 'Nehal', 'Ghada', 'Amira', 'Eman', 'Nadia', 'Hala', 'Dalia'],
};
const LAST_NAMES = ['Maher', 'Hassan', 'Ali', 'Ibrahim', 'Youssef', 'Ahmed', 'Mounir', 'Fawzy', 'Bakry', 'Ashraf', 'El-Din', 'Nabil', 'Refaat', 'Ghaly', 'Saleh', 'Farouk', 'Rashid', 'Saeed', 'Kamal', 'Nasser', 'Abbas', 'Khalil', 'Sami', 'Soliman', 'Reda', 'El-Sayed', 'Mansour', 'Nour'];
const PAYMENT_METHODS = ['Cash', 'Visa', 'MasterCard', 'Vodafone Cash', 'Bank Transfer', 'InstaPay'];
const DEPARTMENTS = ['Administration', 'Management', 'Sales', 'Warehouse', 'Finance', 'HR', 'IT', 'Marketing', 'Purchasing', 'Customer Service'];
const WAREHOUSE_ZONES = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'E1', 'Cold Storage', 'High-Value Vault'];

// Stable Unsplash CDN images by category slug
const CAT_IMAGES = {
  laptops: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
  'desktop-pcs': 'https://images.unsplash.com/photo-1587831990711-23caac144aa0?w=800&q=80',
  monitors: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
  keyboards: 'https://images.unsplash.com/photo-1511460366699-67b94e698bb6?w=800&q=80',
  mice: 'https://images.unsplash.com/photo-1527864554087-7fd91fc51a46?w=800&q=80',
  headsets: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
  printers: 'https://images.unsplash.com/photo-1612815154859-039125b53b8f?w=800&q=80',
  networking: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  storage: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80',
  components: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80',
  cctv: 'https://images.unsplash.com/photo-1557598807-1b0471c8066a?w=800&q=80',
  'pos-systems': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
  'office-equipment': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  'power-solutions': 'https://images.unsplash.com/photo-1620714223081-752ca05c1b88?w=800&q=80',
  accessories: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&q=80',
  'software-licenses': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
  servers: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  'smart-devices': 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80',
  tablets: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
  'gaming-gear': 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80',
  cables: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  scanners: 'https://images.unsplash.com/photo-1587823860712-dafb5454cb47?w=800&q=80',
  projectors: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
  'refurbished-it': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
  'enterprise-software': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  'cloud-services': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  'it-services': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
};

const PRODUCT_GALLERIES = {
  laptops: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    'https://images.unsplash.com/photo-1525547719570-a2d4ac8585a0?w=800&q=80',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80',
    'https://images.unsplash.com/photo-1602080858427-d2a4ce8a3f63?w=800&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1563013547447-7f26e4f1d3b5?w=800&q=80',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
    'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  ],
};

const AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1628157588556-872569c39a7a?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop&crop=face',
];

const SUPPLIER_LOGOS = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop',
];

const BRAND_FROM_NAME = [
  ['MacBook', 'Apple'], ['iMac', 'Apple'], ['iPad', 'Apple'], ['Apple', 'Apple'],
  ['Dell', 'Dell'], ['XPS', 'Dell'], ['Vostro', 'Dell'], ['Latitude', 'Dell'],
  ['Lenovo', 'Lenovo'], ['ThinkPad', 'Lenovo'], ['LOQ', 'Lenovo'], ['IdeaPad', 'Lenovo'],
  ['HP', 'HP'], ['Pavilion', 'HP'], ['EliteBook', 'HP'], ['ProBook', 'HP'],
  ['ASUS', 'ASUS'], ['ROG', 'ASUS'], ['ZenBook', 'ASUS'],
  ['Acer', 'Acer'], ['Nitro', 'Acer'], ['Predator', 'Acer'],
  ['Samsung', 'Samsung'], ['Galaxy', 'Samsung'],
  ['Logitech', 'Logitech'], ['Razer', 'Razer'], ['HyperX', 'HyperX'],
  ['Corsair', 'Corsair'], ['BenQ', 'BenQ'], ['LG', 'LG'],
  ['Brother', 'Brother'], ['Canon', 'Canon'], ['Epson', 'Epson'],
  ['Seagate', 'Seagate'], ['Western Digital', 'Western Digital'], ['WD', 'Western Digital'],
  ['Kingston', 'Kingston'], ['Crucial', 'Crucial'], ['Corsair', 'Corsair'],
  ['TP-Link', 'TP-Link'], ['Ubiquiti', 'Ubiquiti'], ['Netgear', 'Netgear'],
  ['Hikvision', 'Hikvision'], ['Dahua', 'Dahua'],
  ['Microsoft', 'Microsoft'], ['Jabra', 'Jabra'], ['Sony', 'Sony'],
  ['CyberPower', 'CyberPower'], ['APC', 'APC'],
  ['NVIDIA', 'NVIDIA'], ['GeForce', 'NVIDIA'], ['AMD', 'AMD'], ['Ryzen', 'AMD'], ['Intel', 'Intel'],
];

function detectBrand(name) {
  for (const [key, brand] of BRAND_FROM_NAME) {
    if (name.includes(key)) return brand;
  }
  return pick(['Dell', 'HP', 'Lenovo', 'ASUS', 'Logitech', 'Samsung', 'Acer']);
}

function randomDate(startYear, endYear) {
  const start = new Date(`${startYear}-01-01`);
  const end = new Date(`${endYear}-07-15`);
  const ts = start.getTime() + rand() * (end.getTime() - start.getTime());
  return new Date(ts);
}

function isoDate(d) {
  if (!d) return null;
  if (typeof d === 'string') return d;
  return d.toISOString();
}

function randomEgyptianPerson() {
  const gender = rand() > 0.45 ? 'Male' : 'Female';
  const first = pick(FIRST_NAMES[gender === 'Male' ? 'M' : 'F']);
  const last = pick(LAST_NAMES);
  return { first, last, gender, name: `${first} ${last}` };
}

function randomAddress() {
  const loc = pick(CITIES);
  return {
    address: `${rnd(1, 250)} ${pick(STREETS)} Street, ${loc.city}`,
    city: loc.city,
    country: loc.country,
    postalCode: loc.postal,
  };
}

// Fix placeholder customer names
const PLACEHOLDER_FIXES = {
  company: ['Orion Trading Co', 'Summit Holdings', 'Vertex Solutions', 'Horizon Enterprises', 'Pinnacle Group', 'Sterling Commerce', 'Meridian Trading', 'Atlas Partners', 'Nova Industries', 'Prime Logistics'],
  gov: ['Ministry of Digital Transformation', 'Cairo Municipal Authority', 'Alexandria Port Authority', 'Giza Governorate IT Dept', 'Egyptian Customs Authority', 'National Telecom Regulatory', 'Public Procurement Agency', 'Social Insurance Fund', 'Tax Authority Branch', 'Urban Development Authority'],
  school: ['El-Maadi International School', 'Nasr City Academy', 'Alexandria STEM School', 'Giza Modern School', 'Heliopolis Language School', 'Mansoura Private School', 'Zagazig International Academy', 'Luxor English School', 'Tanta Science Academy', 'Port Said High School'],
  clinic: ['Dr. Hassan Medical Center', 'Cairo Dental Clinic', 'Alexandria Eye Center', 'Giza Family Clinic', 'Nasr City Polyclinic', 'Maadi Wellness Center', 'Heliopolis Diagnostic Lab', 'Mansoura Heart Clinic'],
};

function fixPlaceholderName(name) {
  const m = name.match(/^(Company|Gov Entity|School|Clinic) -(\d+)$/);
  if (!m) return null;
  const type = m[1] === 'Company' ? 'company' : m[1] === 'Gov Entity' ? 'gov' : m[1] === 'School' ? 'school' : 'clinic';
  const idx = parseInt(m[2], 10) - 5;
  const pool = PLACEHOLDER_FIXES[type];
  return pool[idx % pool.length];
}

// New categories to add (7 → reach 25)
const NEW_CATEGORIES = [
  { name: 'Tablets', description: 'Tablets and 2-in-1 convertible devices' },
  { name: 'Gaming Gear', description: 'Gaming peripherals, chairs, and accessories' },
  { name: 'Cables & Adapters', description: 'USB, HDMI, Ethernet, and power cables' },
  { name: 'Scanners', description: 'Document and barcode scanners' },
  { name: 'Projectors', description: 'Business and home theater projectors' },
  { name: 'Refurbished IT', description: 'Certified refurbished computers and equipment' },
  { name: 'Cloud Services', description: 'Cloud hosting and SaaS subscription licenses' },
];

const NEW_SUPPLIERS = [
  { name: 'Gulf Tech Imports', contact: 'Rami El-Sherbiny', specialty: 'Import distributor for enterprise hardware', city: 'Cairo' },
  { name: 'Mediterranean IT Supply', contact: 'Laila Farouk', specialty: 'Networking and server components', city: 'Alexandria' },
  { name: 'Red Sea Electronics', contact: 'Omar Rashad', specialty: 'POS systems and retail technology', city: 'Port Said' },
];

const BCRYPT_PLACEHOLDER = '$2b$10$a5a18c366ef7d8a16ee1802748761fad77027a55d163dfd460491';

// ── Main ──
console.log('Loading database...');
const db = loadDb();

// ═══════════════════════════════════════
// PHASE 1: Enrich existing records
// ═══════════════════════════════════════
console.log('Phase 1: Enriching existing records...');

// Categories
db.categories = db.categories.map((c, i) => {
  const slug = c.slug || slugify(c.name);
  return {
    ...c,
    slug,
    image: CAT_IMAGES[slug] || CAT_IMAGES.laptops,
    displayOrder: c.displayOrder ?? i + 1,
    seoTitle: c.seoTitle || `${c.name} - Atlas ERP Store`,
    seoDescription: c.seoDescription || `Browse our wide selection of ${c.name.toLowerCase()}. ${c.description}.`,
    parentCategory: c.parentCategory ?? null,
    status: c.isActive ? 'active' : 'inactive',
  };
});

// Suppliers
db.suppliers = db.suppliers.map((s, i) => ({
  ...s,
  companyName: s.companyName || s.name,
  country: s.country || 'Egypt',
  image: s.image || SUPPLIER_LOGOS[i % SUPPLIER_LOGOS.length],
  logo: s.logo || SUPPLIER_LOGOS[i % SUPPLIER_LOGOS.length],
  status: s.isActive !== false ? 'active' : 'inactive',
  paymentTerms: s.paymentTerms || pick(['Net 30', 'Net 45', 'Net 60', 'COD', 'Prepaid']),
  rating: s.rating ?? round2(3.5 + rand() * 1.5),
  balance: s.balance ?? round2(rand() * 50000),
}));

// Products
const catSlugById = Object.fromEntries(db.categories.map((c) => [c.id, c.slug]));
db.products = db.products.map((p, i) => {
  const slug = catSlugById[p.categoryId] || 'laptops';
  const galleryPool = PRODUCT_GALLERIES[slug] || PRODUCT_GALLERIES.default;
  const gallery = pickN(galleryPool.length >= 4 ? galleryPool : [...galleryPool, ...PRODUCT_GALLERIES.default], rnd(3, 5));
  const brand = detectBrand(p.name);
  const maxStock = p.maxStock ?? p.maximumStock ?? Math.max(p.minStock * 8, p.stock + rnd(20, 80));
  const reorderLevel = p.reorderLevel ?? p.minStock;
  return {
    ...p,
    brand,
    slug: p.slug || slugify(p.name),
    image: gallery[0],
    gallery,
    shortDescription: p.shortDescription || (p.description ? p.description.slice(0, 80) + (p.description.length > 80 ? '...' : '') : p.name),
    taxRate: p.taxRate ?? TAX_RATE,
    discount: p.discount ?? (rand() > 0.85 ? round2(rand() * 15) : 0),
    reservedStock: p.reservedStock ?? rnd(0, Math.min(3, p.stock)),
    maximumStock: maxStock,
    reorderLevel,
    warehouseLocation: p.warehouseLocation || `${pick(WAREHOUSE_ZONES)}-${pad(rnd(1, 40), 2)}-${pad(rnd(1, 12), 2)}`,
    notes: p.notes ?? (rand() > 0.7 ? pick(['Fast-moving item', 'Seasonal demand spike in Q4', 'Bundle with accessories', 'Corporate contract pricing available', '']) : ''),
    wholesalePrice: p.wholesalePrice ?? round2(p.costPrice * (0.82 + rand() * 0.08)),
    updatedAt: p.updatedAt || p.createdAt,
  };
});

// Customers – fix placeholders & enrich
let avatarIdx = 0;
db.customers = db.customers.map((c) => {
  const fixed = fixPlaceholderName(c.name);
  const isBusiness = fixed || c.companyName || (c.name && !c.name.includes(' ') === false && c.totalSpent > 10000);
  const addr = randomAddress();
  const gender = c.gender || (rand() > 0.45 ? 'Male' : 'Female');
  let firstName = c.firstName;
  let lastName = c.lastName;
  let name = fixed || c.name;
  if (!fixed && !isBusiness && c.name.includes(' ')) {
    [firstName, lastName] = c.name.split(' ');
  } else if (fixed) {
    firstName = fixed;
    lastName = '';
  }
  return {
    ...c,
    name,
    firstName: firstName || c.firstName,
    lastName: lastName || c.lastName || '',
    gender: isBusiness ? null : gender,
    birthDate: isBusiness ? null : (c.birthDate || `19${rnd(70, 99)}-${pad(rnd(1, 12))}-${pad(rnd(1, 28))}`),
    country: c.country || 'Egypt',
    postalCode: c.postalCode || addr.postalCode,
    address: c.address || addr.address,
    city: c.city || addr.city,
    avatar: c.avatar || AVATARS[avatarIdx++ % AVATARS.length],
    customerSince: c.customerSince || c.createdAt,
    status: c.isActive === false ? 'inactive' : (c.status || 'active'),
    preferredPaymentMethod: c.preferredPaymentMethod || pick(PAYMENT_METHODS),
    averageOrderValue: c.averageOrderValue ?? (c.totalOrders > 0 ? round2(c.totalSpent / c.totalOrders) : 0),
    vipStatus: c.vipStatus || (c.totalSpent > 20000 ? 'Gold' : c.totalSpent > 8000 ? 'Silver' : 'Bronze'),
  };
});

// Employees
db.employees = db.employees.map((e, i) => {
  const skillsByDept = {
    Sales: ['Negotiation', 'CRM', 'Product Knowledge', 'B2B Sales'],
    Warehouse: ['Inventory Management', 'Forklift Operation', 'WMS', 'Quality Control'],
    Finance: ['Accounting', 'Excel', 'ERP Systems', 'Tax Compliance'],
    IT: ['Networking', 'Windows Server', 'Troubleshooting', 'Cybersecurity'],
    HR: ['Recruitment', 'Labor Law', 'Payroll', 'Training'],
    Administration: ['Leadership', 'Strategic Planning', 'Budgeting'],
    Management: ['Team Leadership', 'KPI Tracking', 'Reporting'],
    Marketing: ['Digital Marketing', 'SEO', 'Content Strategy'],
    Purchasing: ['Vendor Management', 'Procurement', 'Cost Analysis'],
    'Customer Service': ['Communication', 'Conflict Resolution', 'Product Support'],
  };
  const dept = e.department || pick(DEPARTMENTS);
  const baseSkills = skillsByDept[dept] || ['Communication', 'Teamwork'];
  return {
    ...e,
    avatar: e.avatar?.startsWith('http') ? e.avatar : AVATARS[i % AVATARS.length],
    skills: e.skills || [...baseSkills, pick(['Arabic', 'English', 'French', 'Data Analysis'])],
    performanceRating: e.performanceRating ?? round2(3 + rand() * 2),
    status: e.status || (e.isActive ? 'active' : 'inactive'),
  };
});

// Users
db.users = db.users.map((u, i) => ({
  ...u,
  avatar: u.avatar?.startsWith('http') ? u.avatar : AVATARS[i % AVATARS.length],
  lastLogin: u.lastLogin || isoDate(randomDate(2026, 2026)),
}));

// Sales enrichment – reconcile totals from line items
db.sales = db.sales.map((s) => {
  const items = db.saleItems.filter((si) => si.saleId === s.id);
  const subtotal = round2(items.reduce((a, i) => a + i.total, 0));
  const discount = s.discount || 0;
  const tax = round2((subtotal - discount) * TAX_RATE);
  const shippingCost = s.shippingCost ?? 0;
  const total = round2(subtotal - discount + tax + shippingCost);
  const paymentStatus = s.paymentStatus;
  const paidAmount =
    paymentStatus === 'Paid'
      ? total
      : paymentStatus === 'Refunded'
        ? 0
        : paymentStatus === 'Partial'
          ? s.paidAmount > 0 && s.paidAmount < total
            ? s.paidAmount
            : round2(total * rand() * 0.7)
          : 0;
  return {
    ...s,
    subtotal,
    tax,
    total,
    employeeId: s.employeeId || s.cashierId,
    orderStatus: s.orderStatus || s.invoiceStatus,
    remainingAmount: round2(Math.max(0, total - paidAmount)),
    paidAmount,
    changeAmount: paidAmount > total ? round2(paidAmount - total) : 0,
    shippingCost,
    saleDate: s.saleDate || s.createdAt,
  };
});

// Sale items
db.saleItems = db.saleItems.map((si) => {
  const prod = db.products.find((p) => p.id === si.productId);
  return {
    ...si,
    productName: si.productName || prod?.name || '',
    sku: si.sku || prod?.sku || '',
    lineTotal: si.lineTotal ?? si.total,
    tax: si.tax ?? round2(si.total * TAX_RATE),
  };
});

// Purchase orders – fix totals
db.purchaseOrders = db.purchaseOrders.map((po) => {
  const itemsSubtotal = po.items.reduce((a, i) => a + i.total, 0);
  const shippingCost = po.shippingCost ?? round2(rnd(0, 500) + (itemsSubtotal > 50000 ? 800 : 0));
  const tax = po.tax ?? round2(itemsSubtotal * TAX_RATE);
  const total = round2(itemsSubtotal + shippingCost + tax);
  return {
    ...po,
    shippingCost,
    tax,
    total,
    paymentStatus: po.paymentStatus || (po.status === 'Received' ? 'Paid' : po.status === 'Approved' ? 'Pending' : 'Unpaid'),
    orderStatus: po.orderStatus || po.status,
  };
});

// ═══════════════════════════════════════
// PHASE 2: Add new base entities
// ═══════════════════════════════════════
console.log('Phase 2: Adding new categories, suppliers, employees, users, customers...');

const baseDate = '2026-01-15T08:00:00.000Z';
let displayOrder = db.categories.length;

const existingCatSlugs = new Set(db.categories.map((c) => c.slug || slugify(c.name)));
for (const nc of NEW_CATEGORIES) {
  const slug = slugify(nc.name);
  if (existingCatSlugs.has(slug)) continue;
  existingCatSlugs.add(slug);
  db.categories.push({
    id: uuid(),
    name: nc.name,
    description: nc.description,
    isActive: true,
    createdAt: baseDate,
    updatedAt: baseDate,
    slug,
    image: CAT_IMAGES[slug] || CAT_IMAGES.laptops,
    displayOrder: ++displayOrder,
    seoTitle: `${nc.name} - Atlas ERP Store`,
    seoDescription: `Browse our wide selection of ${nc.name.toLowerCase()}. ${nc.description}.`,
    metaKeywords: [slug, 'atlas erp', 'shop online', 'egypt'],
    parentCategory: null,
    productCount: 0,
    status: 'active',
  });
}

const existingSupNames = new Set(db.suppliers.map((s) => s.name));
for (const ns of NEW_SUPPLIERS) {
  if (existingSupNames.has(ns.name)) continue;
  existingSupNames.add(ns.name);
  const addr = randomAddress();
  db.suppliers.push({
    id: uuid(),
    name: ns.name,
    email: `orders@${slugify(ns.name).replace(/-/g, '')}.com`,
    phone: `+2010${rnd(10000000, 99999999)}`,
    address: `${rnd(1, 99)} ${pick(STREETS)} Street, ${ns.city}`,
    contactPerson: ns.contact,
    website: `https://${slugify(ns.name)}.com`,
    taxNumber: `TAX-EG-${rnd(2000, 2999)}`,
    notes: ns.specialty,
    isActive: true,
    createdAt: baseDate,
    updatedAt: baseDate,
    companyName: ns.name,
    balance: round2(rand() * 30000),
    rating: round2(3.8 + rand() * 1.1),
    totalOrders: rnd(2, 20),
    lastOrderDate: isoDate(randomDate(2025, 2026)),
    paymentTerms: pick(['Net 30', 'Net 45', 'Net 60']),
    deliveryDays: rnd(5, 21),
    isVerified: rand() > 0.15,
    contactPhone: `+2011${rnd(10000000, 99999999)}`,
    contactEmail: `contact@${slugify(ns.name).replace(/-/g, '')}.com`,
    country: 'Egypt',
    image: pick(SUPPLIER_LOGOS),
    logo: pick(SUPPLIER_LOGOS),
    status: 'active',
  });
}

// Add employees (target 40)
const adminId = db.employees.find((e) => e.role === 'Admin')?.id;
const managerId = db.employees.find((e) => e.role === 'Manager')?.id;
const TARGET_EMPLOYEES = 40;
const newEmpRoles = [
  { role: 'Sales', dept: 'Sales', salary: [9000, 14000] },
  { role: 'Sales', dept: 'Sales', salary: [9000, 14000] },
  { role: 'Cashier', dept: 'Sales', salary: [7000, 10000] },
  { role: 'Cashier', dept: 'Sales', salary: [7000, 10000] },
  { role: 'Warehouse', dept: 'Warehouse', salary: [8000, 12000] },
  { role: 'Warehouse', dept: 'Warehouse', salary: [8000, 12000] },
  { role: 'Accountant', dept: 'Finance', salary: [12000, 16000] },
  { role: 'Purchasing', dept: 'Purchasing', salary: [11000, 15000] },
  { role: 'Customer Service', dept: 'Customer Service', salary: [8000, 11000] },
  { role: 'Customer Service', dept: 'Customer Service', salary: [8000, 11000] },
  { role: 'IT Support', dept: 'IT', salary: [10000, 14000] },
  { role: 'HR', dept: 'HR', salary: [10000, 13000] },
  { role: 'Sales', dept: 'Sales', salary: [9500, 13500] },
  { role: 'Sales', dept: 'Sales', salary: [9500, 13500] },
  { role: 'Branch Manager', dept: 'Management', salary: [16000, 20000] },
];

let empNum = db.employees.length;
const initialEmpCount = db.employees.length;
for (let i = 0; i < TARGET_EMPLOYEES - initialEmpCount; i++) {
  const spec = newEmpRoles[i] || pick(newEmpRoles);
  const person = randomEgyptianPerson();
  const hireD = randomDate(2022, 2025);
  const empId = uuid();
  const emailSlug = `${person.first.toLowerCase()}.${person.last.toLowerCase().replace(/[^a-z]/g, '')}${empNum}`;
  db.employees.push({
    id: empId,
    name: person.name,
    email: `${emailSlug}@atlaserp.com`,
    password: BCRYPT_PLACEHOLDER,
    role: spec.role,
    avatar: AVATARS[empNum % AVATARS.length],
    phone: `+2015${pad(rnd(0, 9))}${rnd(1000000, 9999999)}`,
    salary: rnd(spec.salary[0], spec.salary[1]),
    hireDate: hireD.toISOString().slice(0, 10),
    department: spec.dept,
    permissions: spec.role === 'Sales' || spec.role === 'Cashier' ? ['sales', 'customers'] : spec.role === 'Warehouse' ? ['inventory', 'purchase_orders'] : ['reports'],
    isActive: rand() > 0.05,
    status: rand() > 0.05 ? 'active' : 'on_leave',
    createdAt: isoDate(hireD),
    updatedAt: isoDate(randomDate(2025, 2026)),
    firstName: person.first,
    lastName: person.last,
    position: spec.role,
    managerId: spec.role === 'Branch Manager' ? managerId : managerId,
    emergencyContact: {
      name: `${pick(FIRST_NAMES.M)} ${pick(LAST_NAMES)}`,
      phone: `+201${rnd(0, 9)}${rnd(10000000, 99999999)}`,
      relationship: pick(['Spouse', 'Parent', 'Sibling']),
    },
    nationalId: `2${rnd(80, 99)}${pad(rnd(1, 12))}${pad(rnd(1, 28))}${rnd(1000000, 9999999)}`,
    dateOfBirth: `19${rnd(80, 95)}-${pad(rnd(1, 12))}-${pad(rnd(1, 28))}`,
    address: randomAddress().address,
    city: pick(CITIES).city,
    bankAccount: `EG${rnd(10000000, 99999999)}${rnd(100000, 999999)}`,
    taxId: `TAX-EG-${rnd(1000, 9999)}`,
    documents: [`${emailSlug}-contract.pdf`],
    certifications: [],
    skills: pickN(['Negotiation', 'CRM', 'Inventory Management', 'Excel', 'Communication', 'ERP Systems'], rnd(2, 4)),
    performanceRating: round2(3 + rand() * 2),
  });
  empNum++;
}

// Add users (target 22)
const userRoles = ['admin', 'manager', 'warehouse', 'cashier', 'manager', 'cashier', 'warehouse', 'cashier', 'manager', 'cashier', 'warehouse', 'cashier', 'manager', 'cashier', 'warehouse', 'cashier', 'manager', 'cashier'];
const maxUserId = Math.max(...db.users.map((u) => parseInt(u.id, 10)));
let userId = maxUserId;
const usedEmails = new Set(db.users.map((u) => u.email));
let userAddIdx = 0;
while (db.users.length < 22 && userAddIdx < 100) {
  const emp = db.employees[rnd(4, db.employees.length - 1)];
  userAddIdx++;
  if (usedEmails.has(emp.email)) continue;
  usedEmails.add(emp.email);
  const role = userRoles[db.users.length - 4] || 'cashier';
  userId++;
  db.users.push({
    id: String(userId),
    name: emp.name,
    email: emp.email,
    password: '123456',
    role,
    isActive: emp.isActive,
    firstName: emp.firstName,
    lastName: emp.lastName,
    avatar: emp.avatar,
    phone: emp.phone,
    department: emp.department,
    position: role,
    permissions: role === 'admin' ? ['all'] : role === 'manager' ? ['sales', 'reports', 'inventory', 'employees'] : role === 'warehouse' ? ['inventory', 'purchase_orders'] : ['sales', 'customers'],
    lastLogin: isoDate(randomDate(2026, 2026)),
    createdAt: emp.createdAt,
    updatedAt: isoDate(randomDate(2026, 2026)),
  });
}

// Add customers (target 350)
const TARGET_CUSTOMERS = 350;
const businessSuffixes = ['Trading', 'Solutions', 'Systems', 'Technologies', 'Group', 'Enterprises', 'Co', 'Partners', 'Services', 'Industries'];
const businessPrefixes = ['Al-Nile', 'Delta', 'Cairo', 'Alexandria', 'Sinai', 'Pyramid', 'Golden', 'Royal', 'United', 'National', 'Modern', 'Smart', 'Global', 'Premier', 'Elite'];

while (db.customers.length < TARGET_CUSTOMERS) {
  const isBusiness = rand() < 0.35;
  const addr = randomAddress();
  const created = randomDate(2022, 2026);
  let record;

  if (isBusiness) {
    const bname = `${pick(businessPrefixes)} ${pick(['IT', 'Digital', 'Tech', 'Office', 'Business', 'Commercial'])} ${pick(businessSuffixes)}`;
    record = {
      id: uuid(),
      name: bname,
      email: `${slugify(bname).slice(0, 20)}${db.customers.length}@business.eg`,
      phone: `+2010${rnd(10000000, 99999999)}`,
      city: addr.city,
      address: addr.address,
      country: 'Egypt',
      postalCode: addr.postalCode,
      loyaltyPoints: 0,
      totalSpent: 0,
      notes: rand() > 0.6 ? pick(['Corporate account', 'Net 30 terms approved', 'Bulk order discount eligible', '']) : '',
      isActive: rand() > 0.08,
      status: rand() > 0.08 ? 'active' : 'inactive',
      createdAt: isoDate(created),
      updatedAt: isoDate(created),
      firstName: bname,
      lastName: '',
      gender: null,
      birthDate: null,
      companyName: bname,
      taxNumber: `TAX-EG-${rnd(10000, 99999)}`,
      creditLimit: pick([25000, 50000, 100000, 150000]),
      paymentTerms: pick(['Net 30', 'Net 60', 'Net 45']),
      preferredContact: pick(['Email', 'Phone']),
      preferredPaymentMethod: pick(['Bank Transfer', 'Visa', 'MasterCard']),
      vipStatus: 'Bronze',
      totalOrders: 0,
      lastOrderDate: null,
      avatar: `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop`,
      customerSince: isoDate(created),
      averageOrderValue: 0,
    };
  } else {
    const person = randomEgyptianPerson();
    record = {
      id: uuid(),
      name: person.name,
      email: `${person.first.toLowerCase()}.${person.last.toLowerCase().replace(/[^a-z]/g, '')}${db.customers.length}@email.com`,
      phone: `+2011${rnd(10000000, 99999999)}`,
      city: addr.city,
      address: addr.address,
      country: 'Egypt',
      postalCode: addr.postalCode,
      loyaltyPoints: 0,
      totalSpent: 0,
      notes: '',
      isActive: rand() > 0.1,
      status: rand() > 0.1 ? 'active' : 'inactive',
      createdAt: isoDate(created),
      updatedAt: isoDate(created),
      firstName: person.first,
      lastName: person.last,
      gender: person.gender,
      birthDate: `19${rnd(70, 99)}-${pad(rnd(1, 12))}-${pad(rnd(1, 28))}`,
      companyName: rand() > 0.85 ? `${person.last} Trading` : null,
      taxNumber: null,
      creditLimit: pick([0, 5000, 10000, 25000]),
      paymentTerms: pick(['Cash', 'Net 30']),
      preferredContact: pick(['Phone', 'Email', 'WhatsApp']),
      preferredPaymentMethod: pick(PAYMENT_METHODS),
      vipStatus: 'Bronze',
      totalOrders: 0,
      lastOrderDate: null,
      avatar: AVATARS[db.customers.length % AVATARS.length],
      customerSince: isoDate(created),
      averageOrderValue: 0,
    };
  }
  db.customers.push(record);
}

// ═══════════════════════════════════════
// PHASE 3: Generate sales & sale items
// ═══════════════════════════════════════
console.log('Phase 3: Generating sales and sale items...');

const salesEmployees = db.employees.filter((e) =>
  ['Sales', 'Cashier', 'Manager', 'Branch Manager'].includes(e.role) && e.isActive
);
const weightMap = {};
salesEmployees.forEach((e) => { weightMap[e.id] = rnd(5, 20); });

// Product popularity weights (laptops, monitors sell more)
const productWeights = db.products.map((p) => {
  const prefix = p.sku.split('-')[0];
  const hot = ['LAP', 'MON', 'ACC', 'HS', 'MOU', 'KB'].includes(prefix);
  return { product: p, weight: hot ? rnd(15, 30) : rnd(3, 12) };
});

function weightedPick(items) {
  const total = items.reduce((a, i) => a + i.weight, 0);
  let r = rand() * total;
  for (const item of items) {
    r -= item.weight;
    if (r <= 0) return item.product || item;
  }
  return items[items.length - 1].product || items[items.length - 1];
}

function weightedPickEmployee() {
  const emps = salesEmployees.map((e) => ({ employee: e, weight: weightMap[e.id] }));
  const total = emps.reduce((a, i) => a + i.weight, 0);
  let r = rand() * total;
  for (const item of emps) {
    r -= item.weight;
    if (r <= 0) return item.employee;
  }
  return emps[0].employee;
}

const TARGET_SALES = 800;
let invoiceNum = db.sales.length + 1001;

while (db.sales.length < TARGET_SALES) {
  const saleId = uuid();
  const customer = pick(db.customers.filter((c) => c.isActive));
  const employee = weightedPickEmployee();
  const saleDate = randomDate(2024, 2026);
  const numItems = rnd(1, 6);
  const chosenProducts = [];
  for (let j = 0; j < numItems; j++) {
    let prod;
    do { prod = weightedPick(productWeights); } while (chosenProducts.find((p) => p.id === prod.id));
    chosenProducts.push(prod);
  }

  const saleItems = [];
  let subtotal = 0;
  for (const prod of chosenProducts) {
    const qty = prod.price > 5000 ? rnd(1, 2) : prod.price > 1000 ? rnd(1, 3) : rnd(1, 8);
    const unitPrice = prod.price;
    const lineDiscount = rand() > 0.7 ? round2(unitPrice * qty * rand() * 0.1) : 0;
    const total = round2(unitPrice * qty - lineDiscount);
    subtotal += total;
    saleItems.push({
      id: uuid(),
      saleId,
      productId: prod.id,
      quantity: qty,
      unitPrice,
      total,
      discount: lineDiscount,
      tax: round2(total * TAX_RATE),
      notes: '',
      productName: prod.name,
      sku: prod.sku,
      lineTotal: total,
    });
  }

  const orderDiscount = rand() > 0.75 ? round2(subtotal * rand() * 0.08) : 0;
  subtotal = round2(subtotal);
  const tax = round2((subtotal - orderDiscount) * TAX_RATE);
  const shippingCost = rand() > 0.6 ? pick([0, 25, 50, 75, 100]) : 0;
  const total = round2(subtotal - orderDiscount + tax + shippingCost);

  const paymentStatuses = ['Paid', 'Paid', 'Paid', 'Paid', 'Pending', 'Partial', 'Refunded'];
  const paymentStatus = pick(paymentStatuses);
  const invoiceStatuses = { Paid: 'Completed', Pending: 'Pending', Partial: 'Processing', Refunded: 'Refunded' };
  const paidAmount = paymentStatus === 'Paid' ? total : paymentStatus === 'Refunded' ? 0 : paymentStatus === 'Partial' ? round2(total * rand() * 0.7) : 0;

  db.sales.push({
    id: saleId,
    invoiceNumber: `INV-${invoiceNum++}`,
    customerId: customer.id,
    cashierId: employee.id,
    employeeId: employee.id,
    subtotal,
    tax,
    discount: orderDiscount,
    total,
    paymentMethod: customer.preferredPaymentMethod || pick(PAYMENT_METHODS),
    paymentStatus,
    invoiceStatus: invoiceStatuses[paymentStatus],
    orderStatus: invoiceStatuses[paymentStatus],
    notes: rand() > 0.85 ? pick(['Rush delivery requested', 'Gift wrapping', 'Corporate purchase order attached', '']) : '',
    createdAt: isoDate(saleDate),
    updatedAt: isoDate(saleDate),
    saleDate: isoDate(saleDate),
    shippingAddress: customer.address,
    shippingMethod: pick(['Standard', 'Express', 'Pickup', 'Same Day']),
    shippingCost,
    paidAmount,
    changeAmount: paidAmount > total ? round2(paidAmount - total) : 0,
    remainingAmount: round2(Math.max(0, total - paidAmount)),
    items: saleItems.length,
    customerName: customer.name,
    employeeName: employee.name,
  });

  db.saleItems.push(...saleItems);
}

// ═══════════════════════════════════════
// PHASE 4: Generate purchase orders
// ═══════════════════════════════════════
console.log('Phase 4: Generating purchase orders...');

const warehouseEmployees = db.employees.filter((e) => ['Warehouse', 'Purchasing', 'Manager'].includes(e.role));
const TARGET_POS = 150;
let poNum = db.purchaseOrders.length + 1;

// Map supplier → products
const productsBySupplier = {};
db.products.forEach((p) => {
  if (!productsBySupplier[p.supplierId]) productsBySupplier[p.supplierId] = [];
  productsBySupplier[p.supplierId].push(p);
});

while (db.purchaseOrders.length < TARGET_POS) {
  const supplier = pick(db.suppliers.filter((s) => s.isActive !== false));
  const supplierProducts = productsBySupplier[supplier.id] || db.products;
  const poId = uuid();
  const orderDate = randomDate(2024, 2026);
  const expectedDate = new Date(orderDate);
  expectedDate.setDate(expectedDate.getDate() + rnd(7, 45));

  const statuses = ['Received', 'Received', 'Received', 'Approved', 'Pending', 'Cancelled'];
  const status = pick(statuses);
  const itemCount = rnd(2, 6);
  const items = [];
  const usedProds = new Set();
  for (let j = 0; j < itemCount; j++) {
    let prod;
    let attempts = 0;
    do {
      prod = pick(supplierProducts);
      attempts++;
    } while (usedProds.has(prod.id) && attempts < 20);
    usedProds.add(prod.id);
    const qty = rnd(5, 60);
    items.push({
      productId: prod.id,
      productName: prod.name,
      sku: prod.sku,
      quantity: qty,
      unitCost: prod.costPrice,
      total: round2(qty * prod.costPrice),
    });
  }

  const itemsSubtotal = items.reduce((a, i) => a + i.total, 0);
  const shippingCost = round2(rnd(0, 400) + (itemsSubtotal > 40000 ? 600 : 0));
  const tax = round2(itemsSubtotal * TAX_RATE);
  const total = round2(itemsSubtotal + shippingCost + tax);
  const receivedDate = status === 'Received' ? isoDate(expectedDate) : null;

  db.purchaseOrders.push({
    id: poId,
    poNumber: `PO-${pad(poNum++, 3)}`,
    supplierId: supplier.id,
    employeeId: pick(warehouseEmployees).id,
    orderDate: isoDate(orderDate),
    expectedDate: isoDate(expectedDate),
    receivedDate,
    status,
    orderStatus: status,
    total,
    tax,
    shippingCost,
    notes: pick(['Quarterly stock replenishment', 'Urgent restock for bestsellers', 'New product line initial order', 'Price-locked annual contract order', 'Replacement for defective batch', '']),
    createdAt: isoDate(orderDate),
    updatedAt: isoDate(receivedDate || orderDate),
    items,
    shippingAddress: `${pick(CITIES).city} Warehouse - ${rnd(1, 50)} ${pick(STREETS)} Street`,
    paymentStatus: status === 'Received' ? 'Paid' : status === 'Approved' ? 'Pending' : 'Unpaid',
    paymentMethod: pick(['Bank Transfer', 'Check', 'Vodafone Cash']),
    approvedBy: managerId,
  });
}

// ═══════════════════════════════════════
// PHASE 5: Reconcile stock
// ═══════════════════════════════════════
console.log('Phase 5: Reconciling inventory...');

const soldQty = {};
const receivedQty = {};
db.saleItems.forEach((si) => {
  const sale = db.sales.find((s) => s.id === si.saleId);
  if (sale && sale.paymentStatus !== 'Refunded') {
    soldQty[si.productId] = (soldQty[si.productId] || 0) + si.quantity;
  }
});
db.purchaseOrders.forEach((po) => {
  if (po.status === 'Received') {
    po.items.forEach((item) => {
      receivedQty[item.productId] = (receivedQty[item.productId] || 0) + item.quantity;
    });
  }
});

// Assign initial inventory then compute current stock
const hotProductIds = new Set(
  db.products
    .filter((p) => ['LAP', 'MON', 'HS', 'ACC'].includes(p.sku.split('-')[0]))
    .slice(0, 30)
    .map((p) => p.id)
);

db.products = db.products.map((p, idx) => {
  const sold = soldQty[p.id] || 0;
  const received = receivedQty[p.id] || 0;

  // Target end-state stock levels (realistic distribution)
  let targetStock;
  if (idx % 47 === 0) {
    targetStock = 0; // ~5 out of stock
  } else if (idx % 11 === 0) {
    targetStock = rnd(1, Math.max(1, p.minStock)); // ~19 low stock
  } else if (hotProductIds.has(p.id)) {
    targetStock = rnd(p.minStock + 8, p.minStock * 12);
  } else {
    targetStock = rnd(p.minStock + 3, p.minStock * 7);
  }

  const stock = Math.max(0, targetStock);
  const status = stock === 0 ? 'out_of_stock' : stock <= p.minStock ? 'low_stock' : p.status === 'discontinued' ? 'discontinued' : 'active';

  return {
    ...p,
    stock,
    reservedStock: Math.min(p.reservedStock || rnd(0, 2), stock),
    status,
    _initialInventory: targetStock + sold - received, // audit trail for stock derivation
  };
});

// Remove internal audit field
db.products = db.products.map(({ _initialInventory, ...p }) => p);

// ═══════════════════════════════════════
// PHASE 6: Reconcile customer stats
// ═══════════════════════════════════════
console.log('Phase 6: Reconciling customer statistics...');

const customerStats = {};
db.sales.forEach((s) => {
  if (s.paymentStatus === 'Refunded') return;
  if (!customerStats[s.customerId]) customerStats[s.customerId] = { orders: 0, spent: 0, lastDate: s.createdAt };
  customerStats[s.customerId].orders++;
  customerStats[s.customerId].spent += s.total;
  if (s.createdAt > customerStats[s.customerId].lastDate) customerStats[s.customerId].lastDate = s.createdAt;
});

db.customers = db.customers.map((c) => {
  const stats = customerStats[c.id];
  if (!stats) return { ...c, totalOrders: 0, totalSpent: 0, averageOrderValue: 0, loyaltyPoints: c.loyaltyPoints || 0 };
  const totalSpent = round2(stats.spent);
  const totalOrders = stats.orders;
  const vipStatus = totalSpent > 25000 ? 'Gold' : totalSpent > 10000 ? 'Silver' : totalSpent > 3000 ? 'Bronze' : 'Bronze';
  return {
    ...c,
    totalOrders,
    totalSpent,
    averageOrderValue: totalOrders > 0 ? round2(totalSpent / totalOrders) : 0,
    loyaltyPoints: Math.floor(totalSpent / 10),
    lastOrderDate: stats.lastDate,
    vipStatus,
    status: c.isActive === false ? 'inactive' : totalOrders > 20 ? 'vip' : c.status || 'active',
  };
});

// Update employee sales performance
const empSalesCount = {};
db.sales.forEach((s) => {
  if (s.paymentStatus !== 'Refunded') {
    empSalesCount[s.cashierId] = (empSalesCount[s.cashierId] || 0) + 1;
  }
});
db.employees = db.employees.map((e) => {
  const salesCount = empSalesCount[e.id] || 0;
  const ratingBoost = Math.min(2, salesCount / 80);
  return {
    ...e,
    performanceRating: round2(Math.min(5, (e.performanceRating || 3.5) + ratingBoost * 0.3)),
    salesCount,
  };
});

// Update category product counts
const prodCountByCat = {};
db.products.forEach((p) => {
  prodCountByCat[p.categoryId] = (prodCountByCat[p.categoryId] || 0) + 1;
});
db.categories = db.categories.map((c) => ({
  ...c,
  productCount: prodCountByCat[c.id] || 0,
}));

// Update supplier stats
const supOrderCount = {};
const supLastOrder = {};
db.purchaseOrders.forEach((po) => {
  supOrderCount[po.supplierId] = (supOrderCount[po.supplierId] || 0) + 1;
  if (!supLastOrder[po.supplierId] || po.orderDate > supLastOrder[po.supplierId]) {
    supLastOrder[po.supplierId] = po.orderDate;
  }
});
db.suppliers = db.suppliers.map((s) => ({
  ...s,
  totalOrders: supOrderCount[s.id] || s.totalOrders || 0,
  lastOrderDate: supLastOrder[s.id] || s.lastOrderDate,
}));

// ═══════════════════════════════════════
// Save
// ═══════════════════════════════════════
console.log('Saving database...');
saveDb(db);

console.log('\n✓ Generation complete:');
for (const key of ['categories', 'suppliers', 'products', 'customers', 'employees', 'users', 'sales', 'saleItems', 'purchaseOrders']) {
  console.log(`  ${key}: ${db[key].length}`);
}
