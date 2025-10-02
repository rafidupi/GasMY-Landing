# 🚀 Quick Start - GasMy Landing

## Instalación Rápida (3 pasos)

### 1️⃣ Instalar dependencias
```bash
npm install
```

### 2️⃣ Crear archivo de variables de entorno
```bash
Copy-Item .env.example .env.local
```

### 3️⃣ Ejecutar
```bash
npm run dev
```

Abre http://localhost:3000 ✨

## 📝 Comandos Útiles

```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run start    # Ejecutar producción
npm run lint     # Verificar código
```

## 🔧 Variables de Entorno (Opcional)

Edita `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX           # Google Analytics
NEXT_PUBLIC_PIXEL_ID=123456789           # Meta Pixel
NEXT_PUBLIC_FORM_ENDPOINT=https://...   # Webhook para leads
```

## 📂 Archivos Principales

```
app/
  page.tsx              → Página principal con todas las secciones
  layout.tsx            → Layout + SEO metadata
  components/           → Todos los componentes UI
  api/lead/route.ts     → Endpoint para formularios

lib/
  calc.ts              → Lógica calculadora
  validation.ts        → Validación formularios
  analytics.ts         → Google Analytics + Meta Pixel
```

## 🎨 Componentes Disponibles

- `<Hero />` - Encabezado principal
- `<Calculator />` - Calculadora de costos
- `<HowItWorks />` - 3 pasos
- `<Features />` - Diferenciadores
- `<Pricing />` - Planes (Persona + Flotas)
- `<Testimonials />` - Testimonios
- `<Roadmap />` - Próximas features
- `<FAQ />` - Preguntas frecuentes
- `<Footer />` - Pie de página

Más componentes base:
- `<Button />`, `<Input />`, `<Select />`
- `<Card />`, `<Badge />`, `<Container />`, `<Section />`

## 🔌 API Endpoint

**POST /api/lead**

Ejemplo:
```json
{
  "type": "beta",
  "email": "usuario@email.com",
  "tipoUsuario": "particular"
}
```

## ✅ Verificación Rápida

Después de `npm run dev`:

1. ✓ Ver Hero en http://localhost:3000
2. ✓ Scroll a Calculadora y probar
3. ✓ Click "Únete a la beta" → Ver modal
4. ✓ Reducir ventana → Ver responsive

## 🚢 Deploy

### Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```

### Otros
- Netlify: Build command `npm run build`
- AWS Amplify, Railway, etc.

## 📚 Más Info

- `README.md` - Documentación completa
- `INSTALACION.md` - Guía detallada paso a paso
- `ENTREGABLES.md` - Resumen del proyecto

## 🆘 Problemas?

1. Verificar Node.js 18+: `node --version`
2. Borrar node_modules y reinstalar
3. Revisar INSTALACION.md
4. Contacto: hola@gasmy.org

---

**¡Listo en 3 minutos!** 🎉
