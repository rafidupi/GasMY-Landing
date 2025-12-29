'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/Button';
import { Input } from '@/app/components/Input';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { signInWithEmail, signInWithGoogle, user, loading, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [loading, user, router]);

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await signInWithEmail(email.trim(), password);
      router.replace('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesion.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setSubmitting(true);

    try {
      await signInWithGoogle();
      router.replace('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesion.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-main text-text-strong">
      <div className="absolute inset-0 aurora-bg opacity-70" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
        <div className="grid w-full gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center">
            <Link href="/" className="text-sm text-text-mid hover:text-text-strong">
              Volver al inicio
            </Link>
            <h1 className="mt-6 text-4xl font-semibold text-text-strong">
              Iniciar sesion en GasMy
            </h1>
            <p className="mt-4 text-text-mid">
              Accede con la misma cuenta del celular para ver tus viajes y gastos.
            </p>
            <div className="mt-8 grid gap-4 text-sm text-text-mid">
              <div className="rounded-2xl border border-border-subtle bg-white/70 p-4 shadow-sm">
                <p className="font-semibold text-text-strong">Historial y analiticas de viajes</p>
                <p className="mt-1 text-text-mid">Costo total, distancia y peajes.</p>
              </div>
              <div className="rounded-2xl border border-border-subtle bg-white/70 p-4 shadow-sm">
                <p className="font-semibold text-text-strong">Sincronizado con tu app</p>
                <p className="mt-1 text-text-mid">Los datos se actualizan en tiempo real.</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/70 bg-white/90 p-8 text-text-strong shadow-[0_25px_60px_rgba(28,10,232,0.15)] backdrop-blur">
            <h2 className="text-2xl font-semibold">Iniciar sesion</h2>
            <p className="mt-2 text-sm text-text-mid">
              Usa tu correo y contrasena o Google.
            </p>
              {!isConfigured && (
                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                  Firebase no esta configurado. Agrega tus variables en .env.local.
                </div>
              )}
              {error && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  {error}
                </div>
              )}
            <div className="mt-6 space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white text-text-strong"
                onClick={handleGoogle}
                disabled={submitting || loading || !isConfigured}
              >
                Continuar con Google
              </Button>
            </div>
            <div className="my-6 flex items-center gap-3 text-xs text-text-mid">
              <span className="h-px flex-1 bg-border-subtle" />
              o
              <span className="h-px flex-1 bg-border-subtle" />
            </div>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <Input
                label="Correo"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
              <Input
                label="Contrasena"
                type="password"
                placeholder="********"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={submitting || loading || !isConfigured}
              >
                {submitting ? 'Ingresando...' : 'Iniciar sesion'}
              </Button>
            </form>
            <p className="mt-6 text-xs text-text-mid">
              Al continuar aceptas los terminos y la politica de privacidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
