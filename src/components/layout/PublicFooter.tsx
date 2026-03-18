import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-xl font-bold mb-3">Noor</h3>
            <p className="text-sm opacity-80">Boutique d'abayas premium basée au Sénégal. Élégance, modestie et fierté africaine.</p>
          </div>
          <div>
            <h4 className="font-heading text-lg font-semibold mb-3">Contact</h4>
            <p className="text-sm opacity-80 mb-1">📷 @noor_boutique_sn</p>
            <p className="text-sm opacity-80">📍 Dakar, Sénégal</p>
          </div>
          <div>
            <h4 className="font-heading text-lg font-semibold mb-3">Commandez par WhatsApp</h4>
            <a
              href="https://wa.me/221770000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-noor"
              style={{ backgroundColor: '#25D366', color: 'white' }}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-primary-foreground/20 text-center text-sm opacity-60">
          Fait avec soin au Sénégal 🇸🇳 — © {new Date().getFullYear()} Noor
        </div>
      </div>
    </footer>
  );
}
