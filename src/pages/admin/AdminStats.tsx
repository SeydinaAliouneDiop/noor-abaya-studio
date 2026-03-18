import React from 'react';
import { useOrders } from '@/contexts/OrdersContext';
import { useProducts } from '@/contexts/ProductsContext';
import { formatCFA } from '@/lib/utils';
import { CATEGORIES } from '@/lib/types';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const COLORS_CHART = ['hsl(280, 42%, 18%)', 'hsl(43, 52%, 54%)', 'hsl(113, 16%, 61%)', 'hsl(0, 72%, 51%)'];

export default function AdminStats() {
  const { orders } = useOrders();
  const { products } = useProducts();

  const now = new Date();
  const thisMonth = orders.filter(o => {
    const d = new Date(o.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() && o.status !== 'annulee';
  });
  const monthRevenue = thisMonth.reduce((s, o) => s + o.total, 0);

  // Sales by category
  const categoryData = CATEGORIES.map(cat => {
    const catProducts = products.filter(p => p.category === cat);
    const revenue = orders
      .filter(o => o.status !== 'annulee')
      .reduce((s, o) => s + o.items.filter(i => catProducts.some(p => p.id === i.productId)).reduce((s2, i) => s2 + i.price * i.quantity, 0), 0);
    return { name: cat.replace('Abaya ', ''), value: revenue };
  }).filter(d => d.value > 0);

  // Revenue last 30 days
  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const dayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === d.toDateString() && o.status !== 'annulee');
    return { name: `${d.getDate()}/${d.getMonth() + 1}`, revenus: dayOrders.reduce((s, o) => s + o.total, 0) };
  });

  // Top 5 products
  const productSales = new Map<string, { name: string; image: string; units: number; revenue: number }>();
  orders.filter(o => o.status !== 'annulee').forEach(o => {
    o.items.forEach(item => {
      const existing = productSales.get(item.productId) || { name: item.name, image: item.image, units: 0, revenue: 0 };
      existing.units += item.quantity;
      existing.revenue += item.price * item.quantity;
      productSales.set(item.productId, existing);
    });
  });
  const top5 = Array.from(productSales.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  // Payment methods
  const waveOrders = orders.filter(o => o.paymentMethod === 'wave' && o.status !== 'annulee');
  const omOrders = orders.filter(o => o.paymentMethod === 'orange_money' && o.status !== 'annulee');
  const paymentData = [
    { name: 'Wave', value: waveOrders.length },
    { name: 'Orange Money', value: omOrders.length },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">Statistiques</h1>

      {/* Monthly revenue */}
      <div className="bg-card rounded-xl p-6 shadow-warm mb-8 text-center">
        <p className="text-sm text-muted-foreground mb-1">Revenus totaux ce mois</p>
        <p className="font-heading text-3xl font-bold text-primary">{formatCFA(monthRevenue)}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pie chart */}
        <div className="bg-card rounded-xl p-5 shadow-warm">
          <h3 className="font-heading text-lg font-semibold mb-4">Ventes par catégorie</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name }) => name}>
                  {categoryData.map((_, i) => <Cell key={i} fill={COLORS_CHART[i % COLORS_CHART.length]} />)}
                </Pie>
                <Tooltip formatter={(value: number) => formatCFA(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment split */}
        <div className="bg-card rounded-xl p-5 shadow-warm">
          <h3 className="font-heading text-lg font-semibold mb-4">Moyen de paiement préféré</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Line chart */}
      <div className="bg-card rounded-xl p-5 shadow-warm mb-8">
        <h3 className="font-heading text-lg font-semibold mb-4">Revenus des 30 derniers jours</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={last30}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={4} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: number) => formatCFA(value)} />
              <Line type="monotone" dataKey="revenus" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top 5 */}
      <div className="bg-card rounded-xl p-5 shadow-warm">
        <h3 className="font-heading text-lg font-semibold mb-4">Top 5 meilleures ventes</h3>
        <div className="space-y-3">
          {top5.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="font-heading text-lg font-bold text-accent w-6">#{i + 1}</span>
              <img src={item.image} alt={item.name} className="w-10 h-12 rounded object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.units} vendu{item.units > 1 ? 's' : ''}</p>
              </div>
              <p className="font-bold text-sm">{formatCFA(item.revenue)}</p>
            </div>
          ))}
          {top5.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">Pas encore de ventes</p>}
        </div>
      </div>
    </div>
  );
}
