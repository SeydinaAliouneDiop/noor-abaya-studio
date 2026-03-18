import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrdersContext';
import { formatCFA, generateOrderRef } from '@/lib/utils';
import { QUARTIERS } from '@/lib/types';
import { Check, PartyPopper } from 'lucide-react';

type Step = 1 | 2 | 3;

export default function CheckoutPage() {
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [quartier, setQuartier] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'wave' | 'orange_money' | ''>('');
  const [orderRef, setOrderRef] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (items.length === 0 && !confirmed) {
    navigate('/panier');
    return null;
  }

  const canGoStep2 = firstName && lastName && phone && address && quartier;
  const canGoStep3 = paymentMethod !== '';

  const handleConfirm = () => {
    const ref = generateOrderRef();
    const order = {
      id: crypto.randomUUID(),
      ref,
      customerFirstName: firstName,
      customerLastName: lastName,
      phone,
      address,
      quartier,
      paymentMethod: paymentMethod as 'wave' | 'orange_money',
      items: items.map(i => ({ productId: i.productId, name: i.name, image: i.image, size: i.size, color: i.color, quantity: i.quantity, price: i.price })),
      subtotal,
      deliveryFee,
      total,
      status: 'en_attente' as const,
      statusHistory: [{ status: 'en_attente' as const, date: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
    };
    addOrder(order);
    clearCart();
    setOrderRef(ref);
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-lg">
        <div className="bg-card rounded-xl p-8 shadow-warm-lg">
          <PartyPopper className="h-12 w-12 mx-auto text-accent mb-4" />
          <h1 className="font-heading text-2xl font-bold mb-2">Commande reçue !</h1>
          <p className="text-muted-foreground mb-4">Vous recevrez un message WhatsApp de confirmation sous peu.</p>
          <div className="bg-muted rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">Référence de commande</p>
            <p className="font-heading text-xl font-bold text-accent">{orderRef}</p>
          </div>
          <button onClick={() => navigate('/')} className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:bg-accent hover:text-accent-foreground transition-noor">
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="font-heading text-3xl font-bold mb-8">Commande</h1>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map(s => (
          <React.Fragment key={s}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-noor ${step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              {step > s ? <Check className="h-4 w-4" /> : s}
            </div>
            {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? 'bg-primary' : 'bg-muted'}`} />}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-semibold">Informations de livraison</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Prénom</label>
              <input value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-accent outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Nom</label>
              <input value={lastName} onChange={e => setLastName(e.target.value)} className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-accent outline-none" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Téléphone</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+221 XX XXX XX XX" className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-accent outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Adresse de livraison</label>
            <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="Ex: Pikine, rue 10, villa 4" rows={3} className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-accent outline-none resize-none" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Quartier / Zone</label>
            <select value={quartier} onChange={e => setQuartier(e.target.value)} className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-accent outline-none">
              <option value="">Sélectionnez</option>
              {QUARTIERS.map(q => <option key={q} value={q}>{q}</option>)}
            </select>
          </div>
          <button disabled={!canGoStep2} onClick={() => setStep(2)} className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-accent hover:text-accent-foreground transition-noor disabled:opacity-50 min-h-[48px]">
            Continuer
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-semibold">Méthode de paiement</h2>
          <button
            onClick={() => setPaymentMethod('wave')}
            className={`w-full p-5 rounded-xl border-2 text-left transition-noor ${paymentMethod === 'wave' ? 'border-accent bg-accent/5' : 'border-border'}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: '#1DC0E8' }}>W</div>
              <span className="font-semibold">Wave</span>
            </div>
            <p className="text-xs text-muted-foreground">Après confirmation, envoyez le montant au numéro Wave de la boutique. Votre commande sera validée dès réception.</p>
          </button>
          <button
            onClick={() => setPaymentMethod('orange_money')}
            className={`w-full p-5 rounded-xl border-2 text-left transition-noor ${paymentMethod === 'orange_money' ? 'border-accent bg-accent/5' : 'border-border'}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: '#FF6600' }}>OM</div>
              <span className="font-semibold">Orange Money</span>
            </div>
            <p className="text-xs text-muted-foreground">Après confirmation, envoyez le montant au numéro Orange Money de la boutique. Votre commande sera validée dès réception.</p>
          </button>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 border border-border py-3 rounded-lg font-semibold text-sm hover:bg-muted transition-noor min-h-[48px]">Retour</button>
            <button disabled={!canGoStep3} onClick={() => setStep(3)} className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-accent hover:text-accent-foreground transition-noor disabled:opacity-50 min-h-[48px]">Continuer</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-semibold">Confirmation</h2>
          <div className="bg-card rounded-lg p-5 shadow-warm space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Client</span><span className="font-medium">{firstName} {lastName}</span>
              <span className="text-muted-foreground">Téléphone</span><span className="font-medium">{phone}</span>
              <span className="text-muted-foreground">Adresse</span><span className="font-medium">{address}</span>
              <span className="text-muted-foreground">Quartier</span><span className="font-medium">{quartier}</span>
              <span className="text-muted-foreground">Paiement</span><span className="font-medium">{paymentMethod === 'wave' ? 'Wave' : 'Orange Money'}</span>
            </div>
            <div className="border-t border-border pt-3 space-y-1">
              {items.map(i => (
                <div key={`${i.productId}-${i.size}-${i.color}`} className="flex justify-between text-sm">
                  <span>{i.name} ({i.size}, {i.color}) x{i.quantity}</span>
                  <span>{formatCFA(i.price * i.quantity)}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold">
                <span>Total</span><span className="text-accent">{formatCFA(total)}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 border border-border py-3 rounded-lg font-semibold text-sm hover:bg-muted transition-noor min-h-[48px]">Retour</button>
            <button onClick={handleConfirm} className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-accent hover:text-accent-foreground transition-noor min-h-[48px]">
              Je confirme ma commande
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
