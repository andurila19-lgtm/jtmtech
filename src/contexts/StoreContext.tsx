'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  ServiceItem,
  Article,
  Order,
  ServiceBooking,
  Vehicle,
  Customer,
  PaymentProof,
  WorkshopSettings,
  OrderItem,
} from 'types/workshop';
import {
  initialProducts,
  initialServices,
  initialArticles,
  initialOrders,
  initialBookings,
  initialVehicles,
  initialCustomers,
  initialSettings,
} from 'services/mockData';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;

  // Customer & Auth
  customer: Customer | null;
  isLoggedIn: boolean;
  login: (emailOrPhone: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<Customer>) => void;

  // Vehicles
  vehicles: Vehicle[];
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'customerId' | 'customerName' | 'customerPhone'>) => Vehicle;
  removeVehicle: (vehicleId: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: {
    items: OrderItem[];
    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
    shippingAddress: Order['shippingAddress'];
    paymentMethod: Order['paymentMethod'];
  }) => Order;
  updateOrderPaymentProof: (orderId: string, proof: PaymentProof) => void;

  // Bookings
  bookings: ServiceBooking[];
  createBooking: (bookingData: {
    vehicleId: string;
    vehicleModel: string;
    vehiclePlate: string;
    vehicleYear: number;
    serviceId: string;
    serviceName: string;
    date: string;
    time: string;
    notes?: string;
    estimatedCost: number;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
  }) => ServiceBooking;

  // Static/Live Data
  products: Product[];
  services: ServiceItem[];
  articles: Article[];
  settings: WorkshopSettings;

  // Global Search
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Customer State (default logged in as first mock customer for frictionless UX)
  const [customer, setCustomer] = useState<Customer | null>(initialCustomers[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Garage Vehicles State
  const [vehicles, setVehicles] = useState<Vehicle[]>(
    initialVehicles.filter((v) => v.customerId === initialCustomers[0]?.id)
  );

  // Orders & Bookings
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [bookings, setBookings] = useState<ServiceBooking[]>(initialBookings);

  // Master Data
  const [products] = useState<Product[]>(initialProducts);
  const [services] = useState<ServiceItem[]>(initialServices);
  const [articles] = useState<Article[]>(initialArticles);
  const [settings] = useState<WorkshopSettings>(initialSettings);

  // Global Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Load / Save Cart from LocalStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('jtm_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
  }, []);

  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('jtm_cart', JSON.stringify(newCart));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  };

  // Cart Handlers
  const addToCart = (product: Product, quantity = 1) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let newCart: CartItem[];
    if (existingIndex > -1) {
      newCart = [...cart];
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart = [...cart, { product, quantity }];
    }
    saveCartToStorage(newCart);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const newCart = cart.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCartToStorage(newCart);
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter((item) => item.product.id !== productId);
    saveCartToStorage(newCart);
  };

  const clearCart = () => {
    saveCartToStorage([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + (item.product.discountPrice || item.product.price) * item.quantity,
    0
  );

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  // Auth Handlers
  const login = (emailOrPhone: string) => {
    const matched = initialCustomers.find(
      (c) => c.email.toLowerCase() === emailOrPhone.toLowerCase() || c.phone === emailOrPhone
    ) || initialCustomers[0];
    setCustomer(matched);
    setIsLoggedIn(true);
    setVehicles(initialVehicles.filter((v) => v.customerId === matched.id));
    return true;
  };

  const logout = () => {
    setCustomer(null);
    setIsLoggedIn(false);
    setVehicles([]);
  };

  const updateProfile = (data: Partial<Customer>) => {
    if (!customer) return;
    const updated = { ...customer, ...data };
    setCustomer(updated);
  };

  // Vehicle Handlers
  const addVehicle = (
    v: Omit<Vehicle, 'id' | 'createdAt' | 'customerId' | 'customerName' | 'customerPhone'>
  ): Vehicle => {
    const newVehicle: Vehicle = {
      ...v,
      id: `veh-${Date.now()}`,
      customerId: customer?.id || 'cust-001',
      customerName: customer?.name || 'Customer Bengkel',
      customerPhone: customer?.phone || '081234567890',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setVehicles([newVehicle, ...vehicles]);
    return newVehicle;
  };

  const removeVehicle = (vehicleId: string) => {
    setVehicles(vehicles.filter((v) => v.id !== vehicleId));
  };

  // Order Handlers
  const createOrder = (orderData: {
    items: OrderItem[];
    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
    shippingAddress: Order['shippingAddress'];
    paymentMethod: Order['paymentMethod'];
  }): Order => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randId = Math.floor(100 + Math.random() * 900);
    const orderNumber = `ORD-${dateStr}-${randId}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerId: customer?.id || 'cust-guest',
      customerName: orderData.shippingAddress.recipientName || customer?.name || 'Pelanggan JTM',
      customerEmail: customer?.email || 'customer@gmail.com',
      customerPhone: orderData.shippingAddress.phone || customer?.phone || '08123456789',
      items: orderData.items,
      subtotal: orderData.subtotal,
      shippingFee: orderData.shippingFee,
      discount: orderData.discount,
      total: orderData.total,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: 'PENDING',
      orderStatus: 'PENDING',
      timeline: [
        {
          status: 'Pesanan Dibuat',
          timestamp: `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 5)}`,
          description: 'Pesanan berhasil dibuat dan menunggu pembayaran dari pelanggan.',
        },
      ],
      createdAt: now.toISOString().slice(0, 10),
      updatedAt: now.toISOString().slice(0, 10),
    };

    setOrders([newOrder, ...orders]);
    clearCart();
    return newOrder;
  };

  const updateOrderPaymentProof = (orderId: string, proof: PaymentProof) => {
    setOrders(
      orders.map((o) => {
        if (o.id === orderId || o.orderNumber === orderId) {
          const now = new Date();
          return {
            ...o,
            paymentProof: proof,
            paymentStatus: 'WAITING_VERIFICATION',
            orderStatus: 'PROCESSING',
            timeline: [
              ...o.timeline,
              {
                status: 'Bukti Pembayaran Diunggah',
                timestamp: `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 5)}`,
                description: `Bukti transfer atas nama ${proof.accountHolder} (${proof.bankName}) sedang diverifikasi oleh admin.`,
              },
            ],
          };
        }
        return o;
      })
    );
  };

  // Booking Handlers
  const createBooking = (bookingData: {
    vehicleId: string;
    vehicleModel: string;
    vehiclePlate: string;
    vehicleYear: number;
    serviceId: string;
    serviceName: string;
    date: string;
    time: string;
    notes?: string;
    estimatedCost: number;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
  }): ServiceBooking => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 7).replace('-', '');
    const randNum = Math.floor(100 + Math.random() * 900);
    const bookingNumber = `SB-${dateStr}-${randNum}`;

    const newBooking: ServiceBooking = {
      id: `sb-${Date.now()}`,
      bookingNumber,
      customerId: customer?.id || 'cust-guest',
      customerName: bookingData.customerName,
      customerPhone: bookingData.customerPhone,
      customerEmail: bookingData.customerEmail,
      vehicleId: bookingData.vehicleId,
      vehicleModel: bookingData.vehicleModel,
      vehiclePlate: bookingData.vehiclePlate,
      vehicleYear: bookingData.vehicleYear,
      serviceId: bookingData.serviceId,
      serviceName: bookingData.serviceName,
      date: bookingData.date,
      time: bookingData.time,
      status: 'PENDING',
      notes: bookingData.notes,
      estimatedCost: bookingData.estimatedCost,
      createdAt: now.toISOString().slice(0, 10),
    };

    setBookings([newBooking, ...bookings]);
    return newBooking;
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        customer,
        isLoggedIn,
        login,
        logout,
        updateProfile,
        vehicles,
        addVehicle,
        removeVehicle,
        orders,
        createOrder,
        updateOrderPaymentProof,
        bookings,
        createBooking,
        products,
        services,
        articles,
        settings,
        isSearchOpen,
        openSearch,
        closeSearch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
