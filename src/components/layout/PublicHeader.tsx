import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function PublicHeader() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-heading text-2xl font-bold text-foreground tracking-wide">
          Noor
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-noor">Accueil</Link>
          <Link to="/catalogue" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-noor">Catalogue</Link>
          <Link to="/suivi" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-noor">Suivi commande</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/panier" className="relative p-2 hover:bg-muted rounded-lg transition-noor">
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <Link to="/catalogue" className="md:hidden text-sm font-medium text-foreground/70">Catalogue</Link>
        </div>
      </div>
    </header>
  );
}
