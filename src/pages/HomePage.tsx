import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductsContext';
import { formatCFA, isNewProduct } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

function TrustIcon({ type }: { type: 'delivery' | 'payment' | 'return' }) {
  const paths: Record<string, React.ReactNode> = {
    delivery: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="14" width="28" height="20" rx="2" />
        <path d="M30 22h8l6 8v4h-14" />
        <circle cx="12" cy="36" r="4" fill="currentColor" />
        <circle cx="38" cy="36" r="4" fill="currentColor" />
      </svg>
    ),
    payment: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="10" width="40" height="28" rx="4" />
        <path d="M4 20h40" />
        <rect x="8" y="28" width="12" height="4" rx="1" />
      </svg>
    ),
    return: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 28l-8-8 8-8" />
        <path d="M4 20h28a12 12 0 010 24H20" />
      </svg>
    ),
  };
  return <div className="text-accent">{paths[type]}</div>;
}

export default function HomePage() {
  const { products } = useProducts();
  const activeProducts = products.filter(p => p.isActive).slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-primary">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://placehold.co/1920x1080/3D1A47/C9A84C?text=)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 leading-tight">
            L'Élégance à<br />Votre Image
          </h1>
          <p className="text-primary-foreground/70 text-lg md:text-xl max-w-lg mx-auto mb-8 font-body">
            Abayas premium, confectionnées avec amour au Sénégal
          </p>
          <Link
            to="/catalogue"
            className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold text-sm hover:brightness-110 transition-noor shadow-warm"
          >
            Découvrir la collection
          </Link>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-indicator text-primary-foreground/50">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* Nos Collections */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">Nos Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeProducts.map(product => {
            const totalStock = product.variants.reduce((s, v) => s + v.stock, 0);
            return (
              <div key={product.id} className="group bg-card rounded-lg overflow-hidden shadow-warm hover:shadow-warm-lg transition-noor-slow">
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
                  <p className="text-accent font-bold mb-3">{formatCFA(product.price)}</p>
                  <div className="flex items-center gap-1.5 mb-4">
                    {product.colors.map(c => (
                      <span
                        key={c.hex}
                        className="w-4 h-4 rounded-full border border-border"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                  <Link
                    to={`/produit/${product.id}`}
                    className="block w-full text-center bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-noor"
                  >
                    Voir le produit
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Link to="/catalogue" className="inline-block border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-noor">
            Voir tout le catalogue
          </Link>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-card py-12 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <TrustIcon type="delivery" />
              <p className="font-semibold text-sm">Livraison à Dakar</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <TrustIcon type="payment" />
              <p className="font-semibold text-sm">Paiement Wave / OM</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <TrustIcon type="return" />
              <p className="font-semibold text-sm">Retour sous 48h</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
