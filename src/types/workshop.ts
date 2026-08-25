export type OrderStatus =
  | 'PENDING'
  | 'WAITING_PAYMENT'
  | 'PAID'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'COMPLETED'
  | 'CANCELLED';

export type PaymentStatus =
  | 'PENDING'
  | 'WAITING_VERIFICATION'
  | 'PAID'
  | 'REJECTED'
  | 'REFUNDED';

export type PaymentMethod = 'QRIS' | 'BANK_TRANSFER' | 'CASH_ON_DELIVERY' | 'WORKSHOP_CASH';

export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'IN_SERVICE'
  | 'COMPLETED'
  | 'CANCELLED';

export type StockMovementType =
  | 'RESTOCK'
  | 'SALE'
  | 'ADJUSTMENT'
  | 'RETURN'
  | 'DAMAGE';

export type RoleType =
  | 'OWNER'
  | 'ADMIN'
  | 'CASHIER'
  | 'MECHANIC'
  | 'CONTENT_MANAGER';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: RoleType;
  avatar?: string;
  status: 'ACTIVE' | 'INACTIVE';
  lastLogin?: string;
  createdAt: string;
}

export interface Permission {
  resource: string;
  label: string;
  actions: {
    view: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

export interface RolePermissions {
  role: RoleType;
  description: string;
  permissions: {
    products: { view: boolean; create: boolean; update: boolean; delete: boolean };
    orders: { view: boolean; create: boolean; update: boolean; delete: boolean };
    inventory: { view: boolean; create: boolean; update: boolean; delete: boolean };
    bookings: { view: boolean; create: boolean; update: boolean; delete: boolean };
    customers: { view: boolean; create: boolean; update: boolean; delete: boolean };
    payments: { view: boolean; create: boolean; update: boolean; delete: boolean };
    cms: { view: boolean; create: boolean; update: boolean; delete: boolean };
    users: { view: boolean; create: boolean; update: boolean; delete: boolean };
    settings: { view: boolean; create: boolean; update: boolean; delete: boolean };
  };
}

export interface Vehicle {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  brand: string; // Honda, Yamaha, Kawasaki, Suzuki, Vespa
  model: string; // Vario 160, NMAX 155, ZX25R, Sprint 150
  year: number;
  licensePlate: string; // N 1234 XX, B 4567 ABC
  engineType: string; // 160cc 4-Valve eSP+, 155cc VVA, etc.
  odometerKm?: number;
  color?: string;
  notes?: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  totalOrders: number;
  totalSpending: number; // in IDR
  lastOrderDate?: string;
  lastBookingDate?: string;
  vehicles: Vehicle[];
  address?: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  itemCount: number;
  type: 'PRODUCT' | 'SERVICE';
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  categoryId: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  minStock: number;
  weightGram: number;
  images: string[];
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  featured: boolean;
  compatibleVehicles: string[]; // e.g. ["Honda Vario 160", "Honda PCX 160", "Yamaha NMAX"]
  brand: string;
  rating?: number;
  salesCount?: number;
  updatedAt: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  type: StockMovementType;
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  userName: string;
  userRole: string;
  date: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
}

export interface PaymentProof {
  imageUrl: string;
  accountHolder: string;
  bankName: string;
  transferDate: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. ORD-2026-0825-001
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  shippingAddress: {
    recipientName: string;
    phone: string;
    street: string;
    city: string;
    province: string;
    postalCode: string;
    courier?: string;
    trackingNumber?: string;
  };
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  paymentProof?: PaymentProof;
  timeline: {
    status: string;
    timestamp: string;
    description: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  bankDestination?: string; // BCA 1234567890 an Bengkel JTM Tech
  qrisRef?: string;
  paymentProof?: PaymentProof;
  verifiedBy?: string;
  verifiedAt?: string;
  rejectionReason?: string;
  createdAt: string;
}

export interface Mechanic {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  specialization: string; // CVT Specialist, Engine Overhaul, Kelistrikan, General Tuning
  status: 'AVAILABLE' | 'BUSY' | 'OFF_DUTY';
  activeBookingsCount: number;
  rating: number;
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  estimatedDuration: string; // e.g. "45 Menit", "1.5 Jam", "3 Jam"
  image: string;
  status: 'ACTIVE' | 'INACTIVE';
  featured?: boolean;
}

export interface ServiceBooking {
  id: string;
  bookingNumber: string; // e.g. SB-202608-001
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  vehicleId: string;
  vehicleModel: string;
  vehiclePlate: string;
  vehicleYear: number;
  serviceId: string;
  serviceName: string;
  mechanicId?: string;
  mechanicName?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (e.g. 09:00, 10:30)
  status: BookingStatus;
  notes?: string;
  estimatedCost: number;
  createdAt: string;
}

// CMS Models
export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  status: 'PUBLISHED' | 'DRAFT';
  updatedAt: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  excerpt: string;
  content: string;
  author: string;
  views: number;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  publishedAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  target: '_self' | '_blank';
  position: 'HERO_SLIDER' | 'POPUP' | 'PROMO_BAR' | 'FOOTER';
  status: 'ACTIVE' | 'INACTIVE';
  order: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'WORKSHOP_ACTIVITY' | 'MODIFICATION' | 'DYNO_TUNING' | 'RESTORATION';
  imageUrl: string;
  description?: string;
  date: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  vehicle: string;
  serviceUsed: string;
  rating: number; // 1-5
  comment: string;
  avatar?: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'SERVICE' | 'ORDER' | 'PAYMENT' | 'WARRANTY';
  order: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  sizeBytes: number;
  mimeType: string;
  dimensions?: string; // e.g. "1200x800"
  folder: 'products' | 'services' | 'banners' | 'articles' | 'payments' | 'gallery';
  createdAt: string;
}

export interface WorkshopSettings {
  businessInfo: {
    name: string;
    tagline: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    phone: string;
    whatsapp: string;
    email: string;
    openingHours: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
    googleMapsUrl?: string;
  };
  paymentSettings: {
    qrisEnabled: boolean;
    qrisMerchantName: string;
    qrisNMID: string;
    qrisImageUrl: string;
    bankAccounts: {
      bank: string;
      accountNumber: string;
      accountHolder: string;
      active: boolean;
    }[];
    manualVerificationInstructions: string;
  };
  shippingSettings: {
    allowWorkshopPickup: boolean;
    pickupInstructions: string;
    couriers: {
      name: string;
      code: string;
      active: boolean;
    }[];
    defaultOriginCity: string;
  };
  websiteSettings: {
    logoUrl: string;
    faviconUrl: string;
    siteTitle: string;
    metaDescription: string;
    keywords: string[];
    socialMedia: {
      instagram?: string;
      tiktok?: string;
      youtube?: string;
      facebook?: string;
    };
  };
}
