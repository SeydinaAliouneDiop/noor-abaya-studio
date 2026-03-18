import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/lib/types';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

interface ProductsContextType {
  products: Product[];
  getProduct: (id: string) => Product | undefined;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateVariantStock: (productId: string, size: string, color: string, stock: number) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

function loadProducts(): Product[] {
  try {
    const data = localStorage.getItem('noor-products');
    return data ? JSON.parse(data) : MOCK_PRODUCTS;
  } catch { return MOCK_PRODUCTS; }
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(loadProducts);

  useEffect(() => {
    localStorage.setItem('noor-products', JSON.stringify(products));
  }, [products]);

  const getProduct = (id: string) => products.find(p => p.id === id);

  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));

  const updateVariantStock = (productId: string, size: string, color: string, stock: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p;
      return {
        ...p,
        variants: p.variants.map(v =>
          v.size === size && v.color === color ? { ...v, stock } : v
        ),
      };
    }));
  };

  return (
    <ProductsContext.Provider value={{ products, getProduct, addProduct, updateProduct, deleteProduct, updateVariantStock }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
}
