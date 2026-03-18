import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCFA(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
}

export function formatWhatsApp(phone: string): string {
  let cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
  if (cleaned.startsWith('+')) cleaned = cleaned.slice(1);
  if (cleaned.startsWith('00221')) cleaned = cleaned.slice(2);
  if (!cleaned.startsWith('221')) cleaned = '221' + cleaned;
  return `https://wa.me/${cleaned}`;
}

export function generateOrderRef(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `CMD-${year}-${num}`;
}

export function isNewProduct(createdAt: string): boolean {
  const created = new Date(createdAt);
  const now = new Date();
  const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
}
