import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const err = await signIn(email, password);
    if (err) {
      setError('Email ou mot de passe incorrect');
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold mb-1">✦ Modest Pearl</h1>
          <p className="text-sm text-muted-foreground">Espace administrateur</p>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-warm-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="admin@modestpearl.sn"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-accent outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-accent outline-none"
              />
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-accent hover:text-accent-foreground transition-noor min-h-[48px] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> Connexion...</>
              ) : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
