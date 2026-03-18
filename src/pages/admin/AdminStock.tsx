import React, { useState } from 'react';
import { useProducts } from '@/contexts/ProductsContext';
import { AlertTriangle, X } from 'lucide-react';

export default function AdminStock() {
  const { products, updateVariantStock } = useProducts();
  const [dismissed, setDismissed] = useState(false);

  const allVariants = products.flatMap(p =>
    p.variants.map(v => ({ product: p, ...v }))
  );

  const outOfStock = allVariants.filter(v => v.stock === 0);
  const lowStock = allVariants.filter(v => v.stock > 0 && v.stock <= v.alertThreshold);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">Gestion du stock</h1>

      {/* Alert banner */}
      {!dismissed && outOfStock.length > 0 && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <p className="text-sm font-medium">⚠️ {outOfStock.length} variante{outOfStock.length > 1 ? 's' : ''} en rupture de stock</p>
          </div>
          <button onClick={() => setDismissed(true)} className="p-1 hover:bg-destructive/10 rounded transition-noor"><X className="h-4 w-4" /></button>
        </div>
      )}

      <div className="bg-card rounded-xl shadow-warm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Produit</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Variante</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Stock actuel</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Seuil d'alerte</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allVariants.map((v, i) => {
                const isLow = v.stock <= v.alertThreshold;
                const isOut = v.stock === 0;
                return (
                  <tr key={`${v.product.id}-${v.size}-${v.color}-${i}`} className={`border-b border-border/50 transition-noor ${isOut ? 'bg-destructive/5' : isLow ? 'bg-orange-50' : ''}`}>
                    <td className="p-3 font-medium">{v.product.name}</td>
                    <td className="p-3">{v.size} — {v.color}</td>
                    <td className="p-3">
                      <input
                        type="number"
                        min={0}
                        value={v.stock}
                        onChange={e => updateVariantStock(v.product.id, v.size, v.color, Number(e.target.value))}
                        className={`w-16 border rounded px-2 py-1 text-center text-sm focus:ring-2 focus:ring-accent outline-none ${isOut ? 'border-destructive bg-destructive/5' : 'border-border bg-card'}`}
                      />
                    </td>
                    <td className="p-3 text-muted-foreground">{v.alertThreshold}</td>
                    <td className="p-3">
                      <button
                        onClick={() => updateVariantStock(v.product.id, v.size, v.color, v.stock + 10)}
                        className="px-3 py-1.5 border border-border rounded-lg text-xs font-medium hover:bg-muted transition-noor"
                      >
                        Réapprovisionner (+10)
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
