import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function PublicHeader() {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-noor">
          <img
            src="/modest-pearl-logo.png"
            alt="Modest Pearl"
            className="h-10 w-10 object-contain"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="hidden sm:block">
            <span className="font-heading text-lg font-bold text-foreground tracking-wide block leading-tight">
              Modest Pearl
            </span>
            <span className="text-xs tracking-widest" style={{ color: '#C9A84C' }}>
              Elegance in Modesty
            </span>
          </div>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={({ isActive }) => `text-sm font-medium transition-noor ${isActive ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'}`}>
            Accueil
          </NavLink>
          <NavLink to="/catalogue" className={({ isActive }) => `text-sm font-medium transition-noor ${isActive ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'}`}>
            Catalogue
          </NavLink>
          <NavLink to="/suivi" className={({ isActive }) => `text-sm font-medium transition-noor ${isActive ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'}`}>
            Suivi commande
          </NavLink>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link to="/panier" className="relative p-2 hover:bg-muted rounded-lg transition-noor">
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span
                className="absolute -top-1 -right-1 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                style={{ backgroundColor: '#C9A84C', color: '#3D1A47' }}
              >
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-noor"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block text-sm font-medium py-2 text-foreground/70 hover:text-foreground">Accueil</Link>
          <Link to="/catalogue" onClick={() => setMobileOpen(false)} className="block text-sm font-medium py-2 text-foreground/70 hover:text-foreground">Catalogue</Link>
          <Link to="/suivi" onClick={() => setMobileOpen(false)} className="block text-sm font-medium py-2 text-foreground/70 hover:text-foreground">Suivi commande</Link>
        </div>
      )}
    </header>
  );
}
