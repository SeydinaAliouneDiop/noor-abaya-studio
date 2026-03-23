import React from 'react';

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function PublicFooter() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Branding */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-1">✦ Modest Pearl</h3>
            <p className="text-xs opacity-60 tracking-widest mb-3" style={{ color: '#C9A84C' }}>
              ELEGANCE IN MODESTY
            </p>
            <p className="text-sm opacity-75">
              Boutique de mode modeste premium basée au Sénégal. Abayas, jilbabs et ensembles coordonnés pour la femme élégante et couverte.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="https://instagram.com/modeste_pearl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm opacity-80 hover:opacity-100 transition-noor"
              >
                <InstagramIcon />
                @modeste_pearl
              </a>
              <a
                href="https://tiktok.com/@modest_pearll"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm opacity-80 hover:opacity-100 transition-noor"
              >
                <TikTokIcon />
                @modest_pearl
              </a>
              <div className="flex items-center gap-2.5 text-sm opacity-80">
                <LocationIcon />
                Dakar, Sénégal
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Commandez par WhatsApp</h4>
            <p className="text-sm opacity-70 mb-4">
              Vous préférez commander directement ? Contactez-nous sur WhatsApp !
            </p>
            <a
              href="https://wa.me/221771093557"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-noor hover:brightness-110"
              style={{ backgroundColor: '#25D366', color: 'white' }}
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-primary-foreground/20 text-center text-sm opacity-50">
          Fait avec soin au Sénégal 🇸🇳 — © {new Date().getFullYear()} Modest Pearl
        </div>
      </div>
    </footer>
  );
}
