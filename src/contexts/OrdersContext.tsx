import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, OrderStatus } from '@/lib/types';

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrder: (id: string) => Order | undefined;
  getOrderByRef: (ref: string) => Order | undefined;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

function loadOrders(): Order[] {
  try {
    const data = localStorage.getItem('noor-orders');
    return data ? JSON.parse(data) : MOCK_ORDERS;
  } catch { return MOCK_ORDERS; }
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'o1', ref: 'CMD-2024-0038',
    customerFirstName: 'Aminata', customerLastName: 'Diallo',
    phone: '+221 77 123 45 67', address: 'Pikine, rue 10, villa 4', quartier: 'Pikine',
    paymentMethod: 'wave',
    items: [{ productId: 'p1', name: 'Abaya Fatou', image: 'https://placehold.co/400x500/F5F0E8/3D1A47?text=Abaya+Fatou', size: 'M', color: 'Noir', quantity: 1, price: 18000 }],
    subtotal: 18000, deliveryFee: 2000, total: 20000,
    status: 'confirmee',
    statusHistory: [
      { status: 'en_attente', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { status: 'confirmee', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'o2', ref: 'CMD-2024-0039',
    customerFirstName: 'Fatou', customerLastName: 'Sow',
    phone: '+221 78 234 56 78', address: 'Grand Yoff, villa 12', quartier: 'Grand Yoff',
    paymentMethod: 'orange_money',
    items: [
      { productId: 'p2', name: 'Abaya Aïssatou Royale', image: 'https://placehold.co/400x500/F5F0E8/3D1A47?text=Aissatou+Royale', size: 'L', color: 'Bordeaux', quantity: 1, price: 42000 },
      { productId: 'p4', name: 'Khimar Awa', image: 'https://placehold.co/400x500/F5F0E8/3D1A47?text=Khimar+Awa', size: 'M', color: 'Noir', quantity: 1, price: 12000 },
    ],
    subtotal: 54000, deliveryFee: 2000, total: 56000,
    status: 'en_attente',
    statusHistory: [
      { status: 'en_attente', date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'o3', ref: 'CMD-2024-0040',
    customerFirstName: 'Marième', customerLastName: 'Ndiaye',
    phone: '+221 76 345 67 89', address: 'Médina, rue 22', quartier: 'Médina',
    paymentMethod: 'wave',
    items: [{ productId: 'p7', name: 'Abaya Sokhna Prestige', image: 'https://placehold.co/400x500/F5F0E8/3D1A47?text=Sokhna+Prestige', size: 'M', color: 'Ivoire', quantity: 1, price: 45000 }],
    subtotal: 45000, deliveryFee: 2000, total: 47000,
    status: 'expediee',
    statusHistory: [
      { status: 'en_attente', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
      { status: 'confirmee', date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
      { status: 'expediee', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'o4', ref: 'CMD-2024-0041',
    customerFirstName: 'Awa', customerLastName: 'Ba',
    phone: '+221 70 456 78 90', address: 'Parcelles Assainies U14', quartier: 'Parcelles Assainies',
    paymentMethod: 'orange_money',
    items: [{ productId: 'p3', name: 'Abaya Mariama Sport', image: 'https://placehold.co/400x500/F5F0E8/3D1A47?text=Mariama+Sport', size: 'L', color: 'Kaki', quantity: 2, price: 15000 }],
    subtotal: 30000, deliveryFee: 2000, total: 32000,
    status: 'en_attente',
    statusHistory: [
      { status: 'en_attente', date: new Date().toISOString() },
    ],
    createdAt: new Date().toISOString(),
  },
];

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(loadOrders);

  useEffect(() => {
    localStorage.setItem('noor-orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Order) => setOrders(prev => [order, ...prev]);

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      return {
        ...o,
        status,
        statusHistory: [...o.statusHistory, { status, date: new Date().toISOString() }],
      };
    }));
  };

  const getOrder = (id: string) => orders.find(o => o.id === id);
  const getOrderByRef = (ref: string) => orders.find(o => o.ref.toLowerCase() === ref.toLowerCase());

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus, getOrder, getOrderByRef }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
}
