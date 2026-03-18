export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductVariant {
  size: string;
  color: string;
  stock: number;
  alertThreshold: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Abaya classique' | 'Abaya de cérémonie' | 'Abaya sport' | 'Khimar';
  fabric: 'Nida' | 'Crepe' | 'Jersey' | 'Soie de Medine' | 'Autre';
  sizes: string[];
  colors: ProductColor[];
  variants: ProductVariant[];
  images: string[];
  isNew: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'en_attente' | 'confirmee' | 'expediee' | 'annulee';

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  ref: string;
  customerFirstName: string;
  customerLastName: string;
  phone: string;
  address: string;
  quartier: string;
  paymentMethod: 'wave' | 'orange_money';
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  statusHistory: { status: OrderStatus; date: string }[];
  createdAt: string;
}

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;

export const QUARTIERS = [
  'Dakar Plateau',
  'Médina',
  'Grand Yoff',
  'Pikine',
  'Guédiawaye',
  'Rufisque',
  'Parcelles Assainies',
  'Thiaroye',
  'Autre',
] as const;

export const FABRICS = ['Nida', 'Crepe', 'Jersey', 'Soie de Medine', 'Autre'] as const;

export const CATEGORIES = ['Abaya classique', 'Abaya de cérémonie', 'Abaya sport', 'Khimar'] as const;

export const STATUS_LABELS: Record<OrderStatus, string> = {
  en_attente: 'En attente',
  confirmee: 'Confirmée',
  expediee: 'Expédiée',
  annulee: 'Annulée',
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  en_attente: 'bg-yellow-100 text-yellow-800',
  confirmee: 'bg-green-100 text-green-800',
  expediee: 'bg-blue-100 text-blue-800',
  annulee: 'bg-red-100 text-red-800',
};

export const DELIVERY_FEE = 2000;
