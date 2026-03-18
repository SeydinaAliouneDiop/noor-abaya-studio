import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductsContext';
import { formatCFA, isNewProduct } from '@/lib/utils';
import { FABRICS } from '@/lib/types';
import { SlidersHorizontal, X } from 'lucide-react';

export default function CataloguePage() {
  const { products } = useProducts();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);

  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach(p => p.colors.forEach(c => map.set(c.name, c.hex)));
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (!p.isActive) return false;
      if (selectedColors.length && !p.colors.some(c => selectedColors.includes(c.name))) return false;
      if (selectedSizes.length && !p.sizes.some(s => selectedSizes.includes(s))) return false;
      if (selectedFabrics.length && !selectedFabrics.includes(p.fabric)) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });
  }, [products, selectedColors, selectedSizes, selectedFabrics, priceRange]);

  const toggleFilter = (arr: string[], val: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-heading text-sm font-semibold mb-3">Couleurs</h4>
        <div className="flex flex-wrap gap-2">
          {allColors.map(c => (
            <button
              key={c.name}
              onClick={() => toggleFilter(selectedColors, c.name, setSelectedColors)}
              className={`w-7 h-7 rounded-full border-2 transition-noor ${selectedColors.includes(c.name) ? 'border-accent ring-2 ring-accent/30' : 'border-border'}`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-heading text-sm font-semibold mb-3">Tailles</h4>
        <div className="flex flex-wrap gap-2">
          {allSizes.map(s => (
            <button
              key={s}
              onClick={() => toggleFilter(selectedSizes, s, setSelectedSizes)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-noor ${selectedSizes.includes(s) ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-heading text-sm font-semibold mb-3">Tissu</h4>
        <div className="space-y-2">
          {FABRICS.map(f => (
            <label key={f} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFabrics.includes(f)}
                onChange={() => toggleFilter(selectedFabrics, f, setSelectedFabrics)}
                className="rounded border-border text-primary"
              />
              {f}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-heading text-sm font-semibold mb-3">Prix (FCFA)</h4>
        <input
          type="range"
          min={0}
          max={50000}
          step={1000}
          value={priceRange[1]}
          onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-accent"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{formatCFA(priceRange[0])}</span>
          <span>{formatCFA(priceRange[1])}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold mb-8">Catalogue</h1>
      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-20 self-start">
          <FilterPanel />
        </aside>

        {/* Mobile filter toggle */}
        <div className="lg:hidden fixed bottom-4 right-4 z-30">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="bg-primary text-primary-foreground p-3 rounded-full shadow-warm-lg"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile filter drawer */}
        {filterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-foreground/50" onClick={() => setFilterOpen(false)} />
            <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-lg font-bold">Filtres</h3>
                <button onClick={() => setFilterOpen(false)}><X className="h-5 w-5" /></button>
              </div>
              <FilterPanel />
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-4">{filtered.length} produit{filtered.length !== 1 ? 's' : ''}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map(product => {
              const totalStock = product.variants.reduce((s, v) => s + v.stock, 0);
              return (
                <Link to={`/produit/${product.id}`} key={product.id} className="group bg-card rounded-lg overflow-hidden shadow-warm hover:shadow-warm-lg transition-noor-slow block">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {isNewProduct(product.createdAt) && (
                      <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">Nouveau</span>
                    )}
                    {totalStock === 0 && (
                      <span className="absolute top-3 right-3 bg-muted text-muted-foreground text-xs font-bold px-3 py-1 rounded-full">Rupture de stock</span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading text-lg font-semibold mb-1">{product.name}</h3>
                    <p className="text-accent font-bold mb-2">{formatCFA(product.price)}</p>
                    <div className="flex items-center gap-1.5">
                      {product.colors.map(c => (
                        <span key={c.hex} className="w-3.5 h-3.5 rounded-full border border-border" style={{ backgroundColor: c.hex }} title={c.name} />
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">Aucun produit trouvé avec ces filtres.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
