import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, OrderStatus } from '@/lib/types';
import { supabase } from '@/lib/supabase/client';

interface OrdersContextType {
  orders: Order[];
  loading: boolean;
  addOrder: (order: Omit<Order, 'id'>) => Promise<string>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  getOrder: (id: string) => Order | undefined;
  getOrderByRef: (ref: string) => Promise<Order | undefined>;
  refetch: () => Promise<void>;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

async function fetchOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select(`*, order_items(*), order_status_history(*)`)
    .order('created_at', { ascending: false });

  if (error) { console.error('fetchOrders error:', error); return []; }

  return (data || []).map((o: any) => ({
    id: o.id,
    ref: o.ref,
    customerFirstName: o.customer_first_name,
    customerLastName: o.customer_last_name,
    phone: o.phone,
    address: o.address,
    quartier: o.quartier,
    paymentMethod: o.payment_method,
    subtotal: o.subtotal,
    deliveryFee: o.delivery_fee,
    total: o.total,
    status: o.status,
    createdAt: o.created_at,
    items: (o.order_items || []).map((i: any) => ({
      productId: i.product_id,
      name: i.name,
      image: i.image,
      size: i.size,
      color: i.color,
      quantity: i.quantity,
      price: i.price,
    })),
    statusHistory: (o.order_status_history || [])
      .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      .map((h: any) => ({
        status: h.status,
        date: h.created_at,
      })),
  }));
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await fetchOrders();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addOrder = async (order: Omit<Order, 'id'>): Promise<string> => {
    const { data: orderData, error } = await supabase
      .from('orders')
      .insert([{
        ref: order.ref,
        customer_first_name: order.customerFirstName,
        customer_last_name: order.customerLastName,
        phone: order.phone,
        address: order.address,
        quartier: order.quartier,
        payment_method: order.paymentMethod,
        subtotal: order.subtotal,
        delivery_fee: order.deliveryFee,
        total: order.total,
        status: 'en_attente',
      }])
      .select()
      .single();

    if (error || !orderData) {
      console.error('addOrder error:', error);
      return '';
    }

    if (order.items.length > 0) {
      await supabase.from('order_items').insert(
        order.items.map(item => ({
          order_id: orderData.id,
          product_id: item.productId,
          name: item.name,
          image: item.image,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.price,
        }))
      );
    }

    await supabase.from('order_status_history').insert([{
      order_id: orderData.id,
      status: 'en_attente',
    }]);

    await load();
    return orderData.id;
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    // Mise à jour immédiate de l'affichage — pas besoin d'attendre Supabase
    setOrders(prev => prev.map(o =>
      o.id === orderId
        ? {
            ...o,
            status,
            statusHistory: [
              ...o.statusHistory,
              { status, date: new Date().toISOString() },
            ],
          }
        : o
    ));

    // Sauvegarde en base en parallèle
    await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    await supabase.from('order_status_history').insert([{
      order_id: orderId,
      status,
    }]);
  };

  const getOrder = (id: string) => orders.find(o => o.id === id);

  const getOrderByRef = async (ref: string): Promise<Order | undefined> => {
    const { data, error } = await supabase
      .from('orders')
      .select(`*, order_items(*), order_status_history(*)`)
      .ilike('ref', ref)
      .single();

    if (error || !data) return undefined;

    return {
      id: data.id,
      ref: data.ref,
      customerFirstName: data.customer_first_name,
      customerLastName: data.customer_last_name,
      phone: data.phone,
      address: data.address,
      quartier: data.quartier,
      paymentMethod: data.payment_method,
      subtotal: data.subtotal,
      deliveryFee: data.delivery_fee,
      total: data.total,
      status: data.status,
      createdAt: data.created_at,
      items: (data.order_items || []).map((i: any) => ({
        productId: i.product_id,
        name: i.name,
        image: i.image,
        size: i.size,
        color: i.color,
        quantity: i.quantity,
        price: i.price,
      })),
      statusHistory: (data.order_status_history || [])
        .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        .map((h: any) => ({ status: h.status, date: h.created_at })),
    };
  };

  return (
    <OrdersContext.Provider value={{
      orders, loading, addOrder, updateOrderStatus,
      getOrder, getOrderByRef, refetch: load,
    }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
}
