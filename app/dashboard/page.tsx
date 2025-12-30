'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Info,
  LogOut,
  Play,
  Route,
  Settings,
  SlidersHorizontal,
  TimerReset,
  Users,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTrips } from '@/hooks/useTrips';

const currency = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

const formatDistance = (kilometers: number) => {
  if (kilometers < 1) {
    return `${Math.round(kilometers * 1000)} m`;
  }
  return `${kilometers.toFixed(1)} km`;
};

export default function DashboardPage() {
  const { user, loading: authLoading, signOutUser, isConfigured } = useAuth();
  const { trips, loading: tripsLoading, error } = useTrips();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user && isConfigured) {
      router.replace('/login');
    }
  }, [authLoading, user, router, isConfigured]);

  const stats = useMemo(() => {
    const latestTrip = trips[0];
    const tags = latestTrip?.tagsPassed ?? 0;
    const tollCost = latestTrip?.tollCost ?? 0;
    const liters = latestTrip?.litersUsed ?? 0;
    const fuelCost = latestTrip?.tripCost ?? 0;
    const distance = latestTrip?.kilometersTrip ?? 0;

    return {
      tags,
      tollCost,
      liters,
      fuelCost,
      distance,
      totalCost: tollCost + fuelCost,
    };
  }, [trips]);

  const topMetrics = [
    { label: 'TAG del viaje', value: stats.tags.toString() },
    { label: 'Costos TAG', value: currency.format(stats.tollCost) },
    { label: 'Litros usados', value: `${stats.liters.toFixed(1)} L` },
    { label: 'Costo combustible', value: currency.format(stats.fuelCost) },
  ];

  const handleSignOut = async () => {
    await signOutUser();
    router.replace('/login');
  };

  if (!isConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6 text-slate-900">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-semibold">Firebase no esta configurado</h1>
          <p className="mt-2 text-sm text-slate-500">
            Agrega las variables de entorno en .env.local para habilitar el login.
          </p>
        </div>
      </div>
    );
  }

  if (authLoading || tripsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900">
        Cargando dashboard...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-bg-main text-text-strong">
      <div className="absolute inset-0 aurora-bg opacity-70" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 pb-10 pt-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="gasmy."
              className="h-9 w-9 rounded-full bg-white/80 p-1 shadow-md object-contain"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-border-subtle bg-white/80 px-3 py-1 text-[10px] font-semibold text-text-mid shadow-sm">
              Gracias por ser de los primeros
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm transition hover:bg-slate-800"
              aria-label="Cerrar sesion"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <section className="mt-6 rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_25px_60px_rgba(28,10,232,0.12)] backdrop-blur max-w-full mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full border border-border-subtle bg-white/80 px-3 py-1 text-xs font-semibold text-text-mid">
              <span className="h-2 w-2 rounded-full bg-text-light" />
              Tracking Inactivo
            </div>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-white/80 text-text-mid"
              aria-label="Configurar tracking"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {topMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-border-subtle bg-white/70 px-4 py-3 shadow-sm"
              >
                <p className="text-lg font-semibold text-text-strong">{metric.value}</p>
                <p className="mt-1 text-xs text-text-mid">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-[#1C0AE8] px-4 py-3 text-white">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-white/70">
                  Distancia recorrida
                </p>
                <p className="mt-1 text-xl font-semibold">{formatDistance(stats.distance)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wide text-white/70">Costo total</p>
                <p className="mt-1 text-xl font-semibold">{currency.format(stats.totalCost)}</p>
              </div>
            </div>
          </div>

          {/* Mapa eliminado como solicitaste */}

          {error && <p className="mt-3 text-xs text-rose-600">Error al cargar viajes.</p>}
          {!error && trips.length === 0 && (
            <p className="mt-3 text-xs text-text-mid">Aun no hay viajes sincronizados.</p>
          )}
        </section>

        {/* Barra de acciones vacía, botón 'Iniciar' eliminado */}

        <div className="mt-4 rounded-full border border-white/70 bg-white/90 px-4 py-2 shadow-md shadow-blue-100/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full border border-border-subtle bg-white/80 px-3 py-1 text-xs font-semibold text-text-mid">
              <span className="h-2 w-2 rounded-full bg-success" />
              Automatico
            </div>
            <div className="flex items-center gap-3 text-text-mid">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-white/80"
                aria-label="Rutas"
              >
                <Route className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-white/80"
                aria-label="Historial"
              >
                <TimerReset className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-white/80"
                aria-label="Ajustes"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
