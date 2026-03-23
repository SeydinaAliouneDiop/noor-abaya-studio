import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/lib/types';
import { supabase } from '@/lib/supabase/client';

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  getProduct: (id: string) => Product | undefined;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateVariantStock: (productId: string, size: string, color: string, stock: number) => Promise<void>;
  uploadProductImage: (file: File) => Promise<string>;
  refetch: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

async function fetchProducts(): Promise<Product[]> {
  const { data: products, error } = await supabase
    .from('products')
    .select(`*, product_variants(*)`)
    .order('created_at', { ascending: false });

  if (error) { console.error('fetchProducts error:', error); return []; }

  return (products || []).map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    category: p.category,
    fabric: p.fabric,
    sizes: p.sizes || [],
    colors: p.colors || [],
    images: p.images || [],
    isNew: p.is_new,
    isActive: p.is_active,
    createdAt: p.created_at,
    variants: (p.product_variants || []).map((v: any) => ({
      size: v.size,
      color: v.color,
      stock: v.stock,
      alertThreshold: v.alert_threshold,
    })),
  }));
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await fetchProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const getProduct = (id: string) => products.find(p => p.id === id);

  const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>) => {
    // 1. Sauvegarde dans Supabase
    const { data, error } = await supabase.from('products').insert([{
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      fabric: product.fabric,
      sizes: product.sizes,
      colors: product.colors,
      images: product.images,
      is_new: product.isNew,
      is_active: product.isActive,
    }]).select().single();

    if (error) { console.error('addProduct error:', error); return; }

    // 2. Sauvegarde des variantes
    if (product.variants.length > 0) {
      await supabase.from('product_variants').insert(
        product.variants.map(v => ({
          product_id: data.id,
          size: v.size,
          color: v.color,
          stock: v.stock,
          alert_threshold: v.alertThreshold,
        }))
      );
    }

    // 3. Mise à jour optimiste immédiate — on ajoute le produit dans React sans attendre load()
    const newProduct: Product = {
      ...product,
      id: data.id,
      createdAt: data.created_at,
    };
    setProducts(prev => [newProduct, ...prev]);

    // 4. Rechargement en arrière-plan pour avoir les vraies données (avec variantes)
    load();
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    const dbUpdates: any = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.price !== undefined) dbUpdates.price = updates.price;
    if (updates.category !== undefined) dbUpdates.category = updates.category;
    if (updates.fabric !== undefined) dbUpdates.fabric = updates.fabric;
    if (updates.sizes !== undefined) dbUpdates.sizes = updates.sizes;
    if (updates.colors !== undefined) dbUpdates.colors = updates.colors;
    if (updates.images !== undefined) dbUpdates.images = updates.images;
    if (updates.isNew !== undefined) dbUpdates.is_new = updates.isNew;
    if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;

    // Mise à jour optimiste
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));

    // Sauvegarde en base
    await supabase.from('products').update(dbUpdates).eq('id', id);

    if (updates.variants) {
      await supabase.from('product_variants').delete().eq('product_id', id);
      await supabase.from('product_variants').insert(
        updates.variants.map(v => ({
          product_id: id,
          size: v.size,
          color: v.color,
          stock: v.stock,
          alert_threshold: v.alertThreshold,
        }))
      );
    }

    // Rechargement final
    load();
  };

  const deleteProduct = async (id: string) => {
    // Suppression optimiste immédiate
    setProducts(prev => prev.filter(p => p.id !== id));

    // Suppression en base en arrière-plan
    await supabase.from('products').delete().eq('id', id);
  };

  const updateVariantStock = async (productId: string, size: string, color: string, stock: number) => {
    // Mise à jour optimiste immédiate
    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p;
      return {
        ...p,
        variants: p.variants.map(v =>
          v.size === size && v.color === color ? { ...v, stock } : v
        ),
      };
    }));

    // Sauvegarde en base en arrière-plan
    await supabase
      .from('product_variants')
      .update({ stock })
      .eq('product_id', productId)
      .eq('size', size)
      .eq('color', color);
  };

  const uploadProductImage = async (file: File): Promise<string> => {
    const ext = file.name.split('.').pop();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage
      .from('product-images')
      .upload(filename, file, { cacheControl: '3600', upsert: false });

    if (error) { console.error('upload error:', error); return ''; }

    const { data } = supabase.storage.from('product-images').getPublicUrl(filename);
    return data.publicUrl;
  };

  return (
    <ProductsContext.Provider value={{
      products, loading, getProduct, addProduct, updateProduct,
      deleteProduct, updateVariantStock, uploadProductImage, refetch: load,
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
}
