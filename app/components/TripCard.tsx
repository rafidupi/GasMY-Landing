import { CheckCircle2 } from 'lucide-react';
import { Trip } from '@/hooks/useTrips';

const currency = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

const sourceLabel = (source?: Trip['source']) => {
  if (source === 'manual') return 'Manual';
  if (source === 'automatic') return 'Automatico';
  if (source === 'bluetooth-auto') return 'Auto (Bluetooth)';
  return 'Sin fuente';
};

export function TripCard({ trip }: { trip: Trip }) {
  const date = trip.date ? new Date(trip.date) : null;
  const totalCost = (trip.tripCost ?? 0) + (trip.tollCost ?? 0);
  const isAutoSaved = Boolean(trip.source && trip.source !== 'manual');

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-white shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">
            {date ? date.toLocaleDateString('es-CL') : 'Sin fecha'}
          </p>
          <p className="text-xs text-slate-300">
            {date
              ? date.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })
              : ''}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-emerald-400">{currency.format(totalCost)}</p>
          <p className="text-xs text-slate-300">{sourceLabel(trip.source)}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-slate-200">
        <span>{Number(trip.kilometersTrip ?? 0).toFixed(1)} km</span>
        <span>{trip.tagsPassed ?? 0} peajes</span>
      </div>
      {isAutoSaved && (
        <div className="mt-3 flex items-center gap-2 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4" />
          Auto guardado
        </div>
      )}
    </div>
  );
}
