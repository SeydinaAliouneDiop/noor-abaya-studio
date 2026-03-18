import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package, Warehouse, BarChart3, LogOut } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/admin', icon: LayoutDashboard, label: 'Tableau de bord', end: true },
  { to: '/admin/commandes', icon: ShoppingBag, label: 'Commandes' },
  { to: '/admin/produits', icon: Package, label: 'Produits' },
  { to: '/admin/stock', icon: Warehouse, label: 'Stock' },
  { to: '/admin/stats', icon: BarChart3, label: 'Statistiques' },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'hsl(var(--noor-admin-bg))' }}>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-56 flex-col border-r border-border bg-card z-40">
        <div className="p-5 border-b border-border">
          <h1 className="font-heading text-xl font-bold">Noor Admin</h1>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-noor ${isActive ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-muted'}`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-noor w-full">
            <LogOut className="h-4 w-4" />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="md:ml-56 min-h-screen pb-20 md:pb-0">
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex z-40">
        {NAV_ITEMS.map(item => {
          const isActive = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-noor min-h-[56px] ${isActive ? 'text-accent' : 'text-muted-foreground'}`}
            >
              <item.icon className="h-5 w-5" />
              <span className="truncate">{item.label.split(' ')[0]}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
