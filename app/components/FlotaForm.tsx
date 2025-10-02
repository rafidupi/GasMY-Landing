'use client';

import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { validateFlotaForm, type FlotaFormData } from '@/lib/validation';
import { trackEvent } from '@/lib/analytics';
import { X } from 'lucide-react';

interface FlotaFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FlotaForm({ isOpen, onClose }: FlotaFormProps) {
  const [formData, setFormData] = useState<FlotaFormData>({
    empresa: '',
    rut: '',
    correo: '',
    numeroVehiculos: 1,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const validation = validateFlotaForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, type: 'flota' }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      setSuccess(true);
      trackEvent.leadSubmitted({ type: 'flota', vehiculos: formData.numeroVehiculos });

      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ empresa: '', rut: '', correo: '', numeroVehiculos: 1 });
      }, 3000);
    } catch (error) {
      setErrors(['Hubo un error al enviar el formulario. Por favor, intenta de nuevo.']);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-card rounded-ios-lg max-w-md w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-mid hover:text-text-strong"
        >
          <X className="w-6 h-6" />
        </button>

        {success ? (
          <div className="text-center space-y-4 py-8">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-text-strong">¡Gracias!</h3>
            <p className="text-text-mid">
              Nos contactaremos contigo pronto para cotizar tu plan de flotas.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-text-strong mb-2">
              Cotiza plan de flotas
            </h3>
            <p className="text-text-mid mb-6">
              Cuéntanos sobre tu empresa y te enviaremos una propuesta personalizada.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                label="Nombre de la empresa *"
                placeholder="Mi Empresa S.A."
                value={formData.empresa}
                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
              />

              <Input
                type="text"
                label="RUT *"
                placeholder="12.345.678-9"
                value={formData.rut}
                onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
              />

              <Input
                type="email"
                label="Correo electrónico *"
                placeholder="contacto@empresa.cl"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              />

              <Input
                type="number"
                label="Número de vehículos *"
                placeholder="10"
                value={formData.numeroVehiculos}
                onChange={(e) => setFormData({ ...formData, numeroVehiculos: parseInt(e.target.value) || 1 })}
                min="1"
              />

              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-ios p-3">
                  {errors.map((error, index) => (
                    <p key={index} className="text-sm text-red-600">
                      {error}
                    </p>
                  ))}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Solicitar cotización'}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
