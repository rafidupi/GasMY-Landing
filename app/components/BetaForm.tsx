'use client';

import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { validateBetaForm, type BetaFormData } from '@/lib/validation';
import { trackEvent } from '@/lib/analytics';
import { X } from 'lucide-react';

interface BetaFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const tipoUsuarioOptions = [
  { value: '', label: 'Selecciona una opción' },
  { value: 'particular', label: 'Particular' },
  { value: 'app', label: 'Conductor de app' },
  { value: 'pyme', label: 'PyME' },
  { value: 'papa-mama-taxi', label: 'Papá/Mamá taxi' },
  { value: 'estudiante', label: 'Estudiante' },
];

const comunaOptions = [
  { value: '', label: 'Selecciona tu comuna' },
  { value: 'santiago', label: 'Santiago Centro' },
  { value: 'providencia', label: 'Providencia' },
  { value: 'las-condes', label: 'Las Condes' },
  { value: 'nunoa', label: 'Ñuñoa' },
  { value: 'maipu', label: 'Maipú' },
  { value: 'la-florida', label: 'La Florida' },
  { value: 'pudahuel', label: 'Pudahuel' },
  { value: 'san-miguel', label: 'San Miguel' },
  { value: 'otra', label: 'Otra' },
];

const sistemaOperativoOptions = [
  { value: '', label: 'Selecciona tu sistema' },
  { value: 'ios', label: 'iOS' },
  { value: 'android', label: 'Android' },
];

export function BetaForm({ isOpen, onClose }: BetaFormProps) {
  const [formData, setFormData] = useState<BetaFormData>({
    email: '',
    nombre: '',
    tipoUsuario: '',
    comuna: '',
    sistemaOperativo: '',
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const validation = validateBetaForm(formData);
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
        body: JSON.stringify({ ...formData, type: 'beta' }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      setSuccess(true);
      trackEvent.leadSubmitted({ type: 'beta', tipoUsuario: formData.tipoUsuario });

      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ email: '', nombre: '', tipoUsuario: '', comuna: '', sistemaOperativo: '' });
      }, 3000);
    } catch (error) {
      setErrors(['Hubo un error al enviar el formulario. Por favor, intenta de nuevo.']);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000000] p-4">
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
              Te escribiremos cuando abramos más cupos de la beta en Santiago.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-text-strong mb-2">
              Únete a la beta
            </h3>
            <p className="text-text-mid mb-6">
              Completa el formulario y te contactaremos pronto.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                label="Correo electrónico *"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.find(e => e.includes('correo')) || ''}
              />

              <Input
                type="text"
                label="Nombre *"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                error={errors.find(e => e.includes('nombre')) || ''}
              />

              <Select
                label="Tipo de usuario *"
                options={tipoUsuarioOptions}
                value={formData.tipoUsuario}
                onChange={(e) => setFormData({ ...formData, tipoUsuario: e.target.value })}
                error={errors.find(e => e.includes('tipo de usuario')) || ''}
              />

              <Select
                label="Comuna *"
                options={comunaOptions}
                value={formData.comuna || ''}
                onChange={(e) => setFormData({ ...formData, comuna: e.target.value })}
                error={errors.find(e => e.includes('comuna')) || ''}
              />

              <Select
                label="Sistema operativo *"
                options={sistemaOperativoOptions}
                value={formData.sistemaOperativo || ''}
                onChange={(e) => setFormData({ ...formData, sistemaOperativo: e.target.value })}
                error={errors.find(e => e.includes('sistema')) || ''}
              />

              {errors.length > 0 && !errors.some(e => e.includes('correo') || e.includes('tipo')) && (
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
                {loading ? 'Enviando...' : 'Enviar solicitud'}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
