import React, { useState } from 'react';
import { useProducts } from '@/contexts/ProductsContext';
import { formatCFA, isNewProduct } from '@/lib/utils';
import { CATEGORIES, FABRICS, SIZES, Product, ProductColor } from '@/lib/types';
import ImageUpload from '@/components/admin/ImageUpload';
import { Plus, Edit, Trash2, X } from 'lucide-react';

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editing, setEditing] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const emptyProduct: Omit<Product, 'id' | 'createdAt'> = {
    name: '', description: '', price: 0, category: 'Abaya classique', fabric: 'Nida',
    sizes: [], colors: [], variants: [], images: [], isNew: true, isActive: true,
  };

  const [form, setForm] = useState<Omit<Product, 'id' | 'createdAt'>>(emptyProduct);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#1A1A1A');

  const openCreate = () => { setForm(emptyProduct); setEditing(null); setIsCreating(true); };
  const openEdit = (p: Product) => { setForm(p); setEditing(p); setIsCreating(true); };
  const close = () => { setIsCreating(false); setEditing(null); };

  const addColor = () => {
    if (!newColorName) return;
    setForm({ ...form, colors: [...form.colors, { name: newColorName, hex: newColorHex }] });
    setNewColorName(''); setNewColorHex('#1A1A1A');
  };

  const removeColor = (name: string) => {
    setForm({ ...form, colors: form.colors.filter(c => c.name !== name) });
  };

  const toggleSize = (size: string) => {
    setForm({ ...form, sizes: form.sizes.includes(size) ? form.sizes.filter(s => s !== size) : [...form.sizes, size] });
  };

  const getVariantStock = (size: string, color: string) => {
    return form.variants.find(v => v.size === size && v.color === color)?.stock ?? 0;
  };

  const setVariantStock = (size: string, color: string, stock: number) => {
    const existing = form.variants.find(v => v.size === size && v.color === color);
    if (existing) {
      setForm({ ...form, variants: form.variants.map(v => v.size === size && v.color === color ? { ...v, stock } : v) });
    } else {
      setForm({ ...form, variants: [...form.variants, { size, color, stock, alertThreshold: 2 }] });
    }
  };

  const handleSave = () => {
    if (editing) {
      updateProduct(editing.id, form);
    } else {
      addProduct({ ...form, id: 'p' + Date.now(), createdAt: new Date().toISOString() } as Product);
    }
    close();
  };

  if (isCreating) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-2xl font-bold">{editing ? 'Modifier le produit' : 'Ajouter un produit'}</h1>
          <button onClick={close} className="p-2 hover:bg-muted rounded-lg transition-noor"><X className="h-5 w-5" /></button>
        </div>
        <div className="max-w-2xl space-y-5">
          <div>
            <label className="text-sm font-medium mb-1 block">Nom du produit</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-accent outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-accent outline-none resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Prix (FCFA)</label>
              <input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-accent outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Catégorie</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as Product['category'] })} className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-accent outline-none">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Tissu</label>
            <select value={form.fabric} onChange={e => setForm({ ...form, fabric: e.target.value as Product['fabric'] })} className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-accent outline-none">
              {FABRICS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          {/* Sizes */}
          <div>
            <label className="text-sm font-medium mb-2 block">Tailles disponibles</label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map(s => (
                <button key={s} type="button" onClick={() => toggleSize(s)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-noor ${form.sizes.includes(s) ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="text-sm font-medium mb-2 block">Couleurs</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {form.colors.map(c => (
                <span key={c.name} className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full text-xs">
                  <span className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: c.hex }} />
                  {c.name}
                  <button type="button" onClick={() => removeColor(c.name)} className="hover:text-destructive"><X className="h-3 w-3" /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={newColorName} onChange={e => setNewColorName(e.target.value)} placeholder="Nom couleur" className="flex-1 bg-card border border-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-accent outline-none" />
              <input type="color" value={newColorHex} onChange={e => setNewColorHex(e.target.value)} className="w-10 h-10 rounded border-0 cursor-pointer" />
              <button type="button" onClick={addColor} className="px-4 py-2 bg-muted rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-noor">Ajouter</button>
            </div>
          </div>

          {/* Stock Matrix */}
          {form.sizes.length > 0 && form.colors.length > 0 && (
            <div>
              <label className="text-sm font-medium mb-2 block">Stock par variante</label>
              <div className="overflow-x-auto">
                <table className="text-sm border border-border rounded-lg">
                  <thead>
                    <tr>
                      <th className="p-2 text-left text-muted-foreground">Taille / Couleur</th>
                      {form.colors.map(c => <th key={c.name} className="p-2 text-center">{c.name}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {form.sizes.map(s => (
                      <tr key={s} className="border-t border-border">
                        <td className="p-2 font-medium">{s}</td>
                        {form.colors.map(c => (
                          <td key={c.name} className="p-2">
                            <input type="number" min={0} value={getVariantStock(s, c.name)} onChange={e => setVariantStock(s, c.name, Number(e.target.value))} className="w-16 bg-card border border-border rounded px-2 py-1 text-center text-sm" />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Images */}
          <div>
            <label className="text-sm font-medium mb-2 block">Images</label>
            <ImageUpload value={form.images} onChange={images => setForm({ ...form, images })} />
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isNew} onChange={e => setForm({ ...form, isNew: e.target.checked })} className="rounded" />
              <span className="text-sm">Nouveau produit</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="rounded" />
              <span className="text-sm">Produit actif</span>
            </label>
          </div>

          <button onClick={handleSave} className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-accent hover:text-accent-foreground transition-noor min-h-[48px]">
            {editing ? 'Enregistrer les modifications' : 'Ajouter le produit'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold">Produits</h1>
        <button onClick={openCreate} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-noor min-h-[44px]">
          <Plus className="h-4 w-4" /> Ajouter un produit
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-card rounded-xl overflow-hidden shadow-warm">
            <div className="aspect-[4/5] bg-muted">
              <img src={p.images[0] || 'https://placehold.co/400x500/F5F0E8/3D1A47?text=No+Image'} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <h3 className="font-heading font-semibold text-sm truncate">{p.name}</h3>
              <p className="text-accent font-bold text-sm">{formatCFA(p.price)}</p>
              <div className="flex items-center justify-between mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
                  {p.isActive ? 'Actif' : 'Inactif'}
                </span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-muted rounded transition-noor"><Edit className="h-3.5 w-3.5" /></button>
                  <button onClick={() => deleteProduct(p.id)} className="p-1.5 hover:bg-destructive/10 text-destructive rounded transition-noor"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
