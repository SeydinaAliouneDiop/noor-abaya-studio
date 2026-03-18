import React from 'react';
import { useOrders } from '@/contexts/OrdersContext';
import { useProducts } from '@/contexts/ProductsContext';
import { formatCFA } from '@/lib/utils';
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/types';
import { TrendingUp, Clock, AlertTriangle, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { orders } = useOrders();
  const { products } = useProducts();

  const today = new Date().toDateString();
  const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === today);
  const todayRevenue = todayOrders.reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'en_attente');
  const outOfStock = products.filter(p => p.variants.some(v => v.stock === 0));

  const dayLabels = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === d.toDateString());
    return { name: dayLabels[d.getDay()], ventes: dayOrders.reduce((s, o) => s + o.total, 0) };
  });

  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">Tableau de bord</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-xl p-4 shadow-warm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium">Commandes aujourd'hui</span>
            <TrendingUp className="h-4 w-4 text-secondary" />
          </div>
          <p className="font-heading text-2xl font-bold">{todayOrders.length}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-warm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium">Revenus du jour</span>
            <TrendingUp className="h-4 w-4 text-accent" />
          </div>
          <p className="font-heading text-2xl font-bold">{formatCFA(todayRevenue)}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-warm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium">En attente</span>
            <Clock className={`h-4 w-4 ${pendingOrders.length > 5 ? 'text-orange-500' : 'text-muted-foreground'}`} />
          </div>
          <p className="font-heading text-2xl font-bold">{pendingOrders.length}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-warm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium">Ruptures de stock</span>
            <AlertTriangle className={`h-4 w-4 ${outOfStock.length > 0 ? 'text-destructive' : 'text-muted-foreground'}`} />
          </div>
          <p className="font-heading text-2xl font-bold">{outOfStock.length}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-card rounded-xl p-5 shadow-warm mb-8">
        <h3 className="font-heading text-lg font-semibold mb-4">Ventes des 7 derniers jours</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={last7Days}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: number) => formatCFA(value)} />
              <Bar dataKey="ventes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-xl p-5 shadow-warm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg font-semibold">Commandes récentes</h3>
          <Link to="/admin/commandes" className="text-sm text-accent hover:underline">Voir tout</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-medium text-muted-foreground">Réf</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Client</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Montant</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(o => (
                <tr key={o.id} className="border-b border-border/50">
                  <td className="py-2.5 font-medium">{o.ref}</td>
                  <td className="py-2.5">{o.customerFirstName} {o.customerLastName}</td>
                  <td className="py-2.5">{formatCFA(o.total)}</td>
                  <td className="py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[o.status]}`}>
                      {STATUS_LABELS[o.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
