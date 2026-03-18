import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductsContext';
import { useCart } from '@/contexts/CartContext';
import { formatCFA } from '@/lib/utils';
import { Minus, Plus, Check, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getProduct } = useProducts();
  const { addItem } = useCart();
  const product = getProduct(id || '');

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-heading text-2xl mb-4">Produit introuvable</h1>
        <Link to="/catalogue" className="text-accent underline">Retour au catalogue</Link>
      </div>
    );
  }

  const variant = useMemo(() => {
    if (!selectedSize || !selectedColor) return null;
    return product.variants.find(v => v.size === selectedSize && v.color === selectedColor);
  }, [selectedSize, selectedColor, product]);

  const availableStock = variant?.stock ?? 0;

  const handleAdd = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Veuillez sélectionner une taille et une couleur');
      return;
    }
    if (availableStock === 0) {
      toast.error('Ce produit est en rupture de stock');
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
      price: product.price,
    });
    toast.success('Ajouté au panier !');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/catalogue" className="text-sm text-muted-foreground hover:text-foreground transition-noor mb-6 inline-block">
        ← Retour au catalogue
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="aspect-[4/5] rounded-lg overflow-hidden bg-muted mb-3">
            <img src={product.images[mainImage] || product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(i)}
                  className={`w-16 h-20 rounded-md overflow-hidden border-2 transition-noor ${i === mainImage ? 'border-accent' : 'border-border'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-accent text-xl font-bold mb-4">{formatCFA(product.price)}</p>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{product.description}</p>

          {/* Size */}
          <div className="mb-5">
            <h4 className="text-sm font-semibold mb-2">Taille</h4>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-noor min-w-[44px] min-h-[44px] ${selectedSize === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-primary/10'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mb-5">
            <h4 className="text-sm font-semibold mb-2">Couleur</h4>
            <div className="flex flex-wrap gap-3">
              {product.colors.map(c => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-9 h-9 rounded-full border-2 transition-noor flex items-center justify-center min-w-[44px] min-h-[44px] ${selectedColor === c.name ? 'border-accent ring-2 ring-accent/30' : 'border-border'}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {selectedColor === c.name && <Check className="h-4 w-4 text-white drop-shadow" />}
                </button>
              ))}
            </div>
            {selectedColor && <p className="text-xs text-muted-foreground mt-1">{selectedColor}</p>}
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-2">Quantité</h4>
            <div className="flex items-center gap-3">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 transition-noor">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(availableStock || 10, quantity + 1))} className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 transition-noor">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Stock warning */}
          {variant && availableStock > 0 && availableStock <= 3 && (
            <p className="text-sm text-orange-600 mb-4 font-medium">⚠ Plus que {availableStock} en stock</p>
          )}

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            disabled={availableStock === 0 && !!variant}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold text-sm hover:bg-accent hover:text-accent-foreground transition-noor shadow-warm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px]"
          >
            <ShoppingBag className="h-4 w-4" />
            Ajouter au panier
          </button>

          <p className="text-xs text-muted-foreground mt-3 text-center">
            ✓ Paiement par Wave ou Orange Money • Livraison à Dakar et banlieue
          </p>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 lg:hidden z-30">
        <button
          onClick={handleAdd}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-accent hover:text-accent-foreground transition-noor flex items-center justify-center gap-2 min-h-[48px]"
        >
          <ShoppingBag className="h-4 w-4" />
          Ajouter — {formatCFA(product.price)}
        </button>
      </div>
    </div>
  );
}
