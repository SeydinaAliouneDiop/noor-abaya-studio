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
      {/* Hero — fond ivoire élégant avec motifs dorés */}
      <section
        className="relative h-[85vh] min-h-[560px] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#F5F0E8' }}
      >
        {/* Cercle décoratif doré gauche */}
        <div
          className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
          style={{ border: '2px solid #C9A84C' }}
        />
        {/* Cercle décoratif doré droit */}
        <div
          className="absolute -right-20 top-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ border: '2px solid #C9A84C' }}
        />
        {/* Petit cercle doré haut gauche */}
        <div
          className="absolute left-1/4 top-12 w-32 h-32 rounded-full opacity-8"
          style={{ border: '1px solid #C9A84C' }}
        />

        {/* Ligne décorative horizontale dorée */}
        <div
          className="absolute top-1/3 left-0 right-0 h-px opacity-10"
          style={{ backgroundColor: '#C9A84C' }}
        />
        <div
          className="absolute bottom-1/3 left-0 right-0 h-px opacity-10"
          style={{ backgroundColor: '#C9A84C' }}
        />

        {/* Contenu hero */}
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          {/* Logo au centre du hero */}
          <img
            src="/modest-pearl-logo.png"
            alt="Modest Pearl"
            className="w-36 h-36 mx-auto mb-6 object-contain"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />

          <p
            className="text-sm font-medium tracking-[0.3em] uppercase mb-4"
            style={{ color: '#C9A84C' }}
          >
            Dakar · Sénégal
          </p>

          <h1
            className="font-heading text-4xl md:text-6xl font-bold mb-4 leading-tight"
            style={{ color: '#3D1A47' }}
          >
            L'Élégance à<br />Votre Image
          </h1>

          <div
            className="w-16 h-px mx-auto mb-4"
            style={{ backgroundColor: '#C9A84C' }}
          />

          <p
            className="text-base md:text-lg max-w-md mx-auto mb-8 font-body"
            style={{ color: '#6B5A7A' }}
          >
            Abayas, jilbabs &amp; ensembles coordonnés — confectionnés avec soin
          </p>

          <Link
            to="/catalogue"
            className="inline-block px-10 py-3.5 rounded-full font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: '#3D1A47',
              color: '#F5F0E8',
              letterSpacing: '0.15em',
            }}
          >
            Découvrir la collection
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ color: '#C9A84C' }}>
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* Nos Collections */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#C9A84C' }}>Notre boutique</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">Nos Collections</h2>
          <div className="w-12 h-px mx-auto mt-3" style={{ backgroundColor: '#C9A84C' }} />
        </div>

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
                    <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#C9A84C', color: '#3D1A47' }}>
                      Nouveau
                    </span>
                  )}
                  {totalStock === 0 && (
                    <span className="absolute top-3 right-3 bg-muted text-muted-foreground text-xs font-bold px-3 py-1 rounded-full">
                      Rupture de stock
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="font-bold mb-3 text-sm" style={{ color: '#C9A84C' }}>{formatCFA(product.price)}</p>
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
                    className="block w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-noor"
                    style={{ backgroundColor: '#3D1A47', color: '#F5F0E8' }}
                    onMouseEnter={e => {
                      (e.target as HTMLElement).style.backgroundColor = '#C9A84C';
                      (e.target as HTMLElement).style.color = '#3D1A47';
                    }}
                    onMouseLeave={e => {
                      (e.target as HTMLElement).style.backgroundColor = '#3D1A47';
                      (e.target as HTMLElement).style.color = '#F5F0E8';
                    }}
                  >
                    Voir le produit
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/catalogue"
            className="inline-block border-2 px-8 py-3 rounded-full font-semibold text-sm tracking-wider transition-noor hover:bg-primary hover:text-primary-foreground"
            style={{ borderColor: '#3D1A47', color: '#3D1A47' }}
          >
            Voir tout le catalogue
          </Link>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 border-y border-border" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <TrustIcon type="delivery" />
              <p className="font-semibold text-sm">Livraison à Dakar</p>
              <p className="text-xs text-muted-foreground">Dakar, banlieue et environs</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <TrustIcon type="payment" />
              <p className="font-semibold text-sm">Paiement Wave / OM</p>
              <p className="text-xs text-muted-foreground">Paiement mobile sécurisé</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <TrustIcon type="return" />
              <p className="font-semibold text-sm">Retour sous 48h</p>
              <p className="text-xs text-muted-foreground">Satisfaction garantie</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
