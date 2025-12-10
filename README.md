# GasMy Landing Page

Landing page oficial de GasMy - Tu gasto en auto, ordenado y optimizado.

> Última actualización: Diciembre 2025

## 🚀 Stack Técnico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Componentes UI**: shadcn/ui + lucide-react
- **Analítica**: Google Analytics 4 + Meta Pixel

## 📋 Características

- ✅ Hero section con badges y CTAs
- ✅ Calculadora interactiva de costos
- ✅ Secciones: Cómo funciona, Features, Pricing, Testimonios, Roadmap, FAQ
- ✅ Formularios (Beta y Flotas) con validación
- ✅ API endpoint para leads
- ✅ Responsive design (mobile-first)
- ✅ SEO optimizado con metadata
- ✅ Analítica integrada
- ✅ Diseño iOS-style con paleta personalizada

## 🛠️ Instalación

### Prerequisitos

- Node.js 18+ instalado
- npm, yarn, o pnpm

### Pasos

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Configurar variables de entorno**

Copia el archivo `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PIXEL_ID=123456789
NEXT_PUBLIC_FORM_ENDPOINT=https://tu-webhook.com/lead
```

4. **Ejecutar en desarrollo**

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Build para Producción

```bash
npm run build
npm run start
```

## 📁 Estructura del Proyecto

```
/
├── app/
│   ├── api/
│   │   └── lead/
│   │       └── route.ts          # API endpoint para leads
│   ├── components/
│   │   ├── Badge.tsx
│   │   ├── BetaForm.tsx          # Modal formulario beta
│   │   ├── Button.tsx
│   │   ├── Calculator.tsx        # Calculadora de costos
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   ├── FAQ.tsx               # Accordion FAQ
│   │   ├── Features.tsx
│   │   ├── FlotaForm.tsx         # Modal formulario flotas
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Input.tsx
│   │   ├── Pricing.tsx
│   │   ├── Roadmap.tsx
│   │   ├── Section.tsx
│   │   ├── Select.tsx
│   │   └── Testimonials.tsx
│   ├── globals.css               # Estilos globales + variables CSS
│   ├── layout.tsx                # Layout con SEO metadata
│   └── page.tsx                  # Página principal
├── lib/
│   ├── analytics.ts              # Helpers GA4 + Meta Pixel
│   ├── calc.ts                   # Lógica calculadora
│   ├── utils.ts                  # Utilidades (cn)
│   └── validation.ts             # Validación formularios
├── public/
│   └── favicon.ico
├── .env.example                  # Template variables de entorno
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts            # Configuración Tailwind + paleta
└── tsconfig.json
```

## 🎨 Paleta de Colores

```css
--color-primary: #007AFF;     /* iOS Blue */
--color-success: #34C759;     /* Verde */
--bg-main: #FFFFFF;           /* Fondo principal */
--bg-card: #FFFFFF;           /* Fondo tarjetas */
--text-strong: #2C2E30;       /* Texto principal */
--text-mid: #6E757C;          /* Texto secundario */
--text-light: #9DA3AA;        /* Texto sutil */
--border-main: #A0AAB2;       /* Bordes */
--border-subtle: #E0E6ED;     /* Bordes sutiles */
--grad-start: #4F8EF7;        /* Gradiente inicio */
--grad-end: #64C6FF;          /* Gradiente fin */
```

## 🔌 API Endpoint

### POST /api/lead

Recibe leads de formularios (beta y flotas).

**Body de ejemplo:**

```json
{
  "type": "beta",
  "email": "usuario@email.com",
  "nombre": "Juan Pérez",
  "tipoUsuario": "particular",
  "comuna": "nunoa"
}
```

**Respuesta:**

```json
{
  "success": true,
  "message": "Lead received successfully"
}
```

Si `NEXT_PUBLIC_FORM_ENDPOINT` está configurado, el endpoint enviará automáticamente los datos a ese webhook.

## 📊 Analítica

El sitio incluye integración con:

- **Google Analytics 4**: Tracking de eventos (view_hero, click_cta_beta, calc_submitted, etc.)
- **Meta Pixel**: Tracking para Facebook Ads

Eventos disponibles:
- `view_hero`
- `click_cta_beta`
- `click_cta_calc`
- `calc_submitted`
- `lead_submitted`
- `pricing_view`

## 🎯 Lighthouse Scores

Objetivo: Performance/Accessibility/Best-Practices/SEO ≥ 90

## 📝 Criterios de Aceptación

- [x] Build corre sin errores
- [x] SSR funcional en Next.js
- [x] Calculadora calcula y formatea en CLP (formato es-CL)
- [x] Formularios validan y hacen POST a /api/lead
- [x] Eventos de analítica se disparan
- [x] Diseño responsive mobile-first
- [x] Código limpio y componentes reutilizables

## 🚢 Deploy

El proyecto está listo para desplegarse en:

- **Vercel** (recomendado para Next.js)
- **Netlify**
- **AWS Amplify**
- Cualquier plataforma con soporte para Next.js

### Vercel

```bash
npm install -g vercel
vercel
```

Configura las variables de entorno en el dashboard de Vercel.

## 📄 Licencia

© GasMy — Hecho en Chile con cariño por gente bacán.

## 🤝 Contribuir

Si encuentras bugs o tienes sugerencias, contáctanos en hola@gasmy.org
