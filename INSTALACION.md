# Guía de Instalación - GasMy Landing Page

## 📋 Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** versión 18.17 o superior
  - Descarga desde: https://nodejs.org/
  - Verifica la instalación: `node --version`

- **npm** (viene con Node.js) o **yarn** o **pnpm**
  - Verifica: `npm --version`

## 🚀 Instalación Paso a Paso

### 1. Preparar el Proyecto

Si aún no has descargado el proyecto, navega a la carpeta:

```bash
cd "c:\Users\rafaa\OneDrive\Desktop\GasMy Web"
```

### 2. Instalar Dependencias

Ejecuta uno de los siguientes comandos en PowerShell:

```powershell
npm install
```

O si prefieres yarn:
```powershell
yarn install
```

O con pnpm:
```powershell
pnpm install
```

Este comando instalará todas las dependencias necesarias:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react
- Y más...

**Nota**: La instalación puede tardar 2-5 minutos dependiendo de tu conexión.

### 3. Configurar Variables de Entorno

1. Copia el archivo de ejemplo:

```powershell
Copy-Item .env.example .env.local
```

2. Abre `.env.local` con tu editor de texto favorito y configura:

```env
# Google Analytics 4 (Opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Meta Pixel (Opcional)
NEXT_PUBLIC_PIXEL_ID=123456789

# Endpoint para enviar leads (Opcional)
# Puede ser un webhook de Mailchimp, Brevo, Zapier, etc.
NEXT_PUBLIC_FORM_ENDPOINT=https://hooks.zapier.com/hooks/catch/xxxxx
```

**Nota**: Puedes dejar estos campos vacíos para desarrollo local.

### 4. Ejecutar en Modo Desarrollo

```powershell
npm run dev
```

Deberías ver un mensaje como:

```
  ▲ Next.js 14.2.5
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

### 5. Abrir en el Navegador

Abre tu navegador favorito y ve a:

```
http://localhost:3000
```

¡Ya deberías ver la landing page de GasMy funcionando! 🎉

## 🛠️ Comandos Disponibles

```powershell
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Crea build optimizado para producción
npm run start        # Ejecuta el build de producción

# Linting
npm run lint         # Verifica errores de código
```

## 🧪 Verificar que Todo Funciona

1. **Hero Section**: Deberías ver el título "Tu gasto en auto, ordenado y optimizado"
2. **Calculadora**: Scroll down y prueba la calculadora de costos
3. **Formularios**: Click en "Únete a la beta" - debería abrir un modal
4. **Responsive**: Reduce el tamaño de la ventana para ver el diseño móvil

## 📦 Estructura de Archivos Importantes

```
GasMy Web/
├── app/
│   ├── page.tsx              # ← Página principal
│   ├── layout.tsx            # ← Layout con SEO
│   ├── globals.css           # ← Estilos globales
│   └── components/           # ← Todos los componentes
├── lib/
│   ├── calc.ts              # ← Lógica de calculadora
│   ├── validation.ts        # ← Validación de formularios
│   └── analytics.ts         # ← Tracking de eventos
├── .env.local               # ← Variables de entorno (crear)
└── package.json             # ← Dependencias del proyecto
```

## 🐛 Solución de Problemas

### Error: "comando no reconocido 'npm'"

**Solución**: Node.js no está instalado o no está en el PATH.
1. Descarga e instala Node.js desde https://nodejs.org/
2. Reinicia PowerShell
3. Verifica: `node --version`

### Error: "Cannot find module"

**Solución**: Las dependencias no están instaladas.
```powershell
rm -r node_modules
rm package-lock.json
npm install
```

### Error: "Port 3000 is already in use"

**Solución**: El puerto está ocupado.
```powershell
# Usa otro puerto
npm run dev -- -p 3001
```

O cierra la aplicación que está usando el puerto 3000.

### Errores de TypeScript en VS Code

**Solución**: Son esperados hasta que se instalen las dependencias.
Después de `npm install`, los errores deberían desaparecer.

## 🚢 Deploy a Producción

### Opción 1: Vercel (Recomendado)

1. Crea cuenta en https://vercel.com
2. Instala Vercel CLI:
```powershell
npm install -g vercel
```

3. Deploy:
```powershell
vercel
```

4. Sigue las instrucciones en pantalla

### Opción 2: Netlify

1. Crea cuenta en https://netlify.com
2. Arrastra la carpeta del proyecto a Netlify
3. Configura:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Opción 3: Build Manual

```powershell
npm run build
```

Los archivos estarán en `.next/` listos para servirse con cualquier servidor Node.js.

## 📞 Soporte

Si tienes problemas:
1. Revisa la sección de "Solución de Problemas" arriba
2. Contacta a: hola@gasmy.org
3. Verifica que Node.js 18+ esté instalado

## ✅ Checklist de Instalación

- [ ] Node.js 18+ instalado
- [ ] Dependencias instaladas (`npm install`)
- [ ] `.env.local` creado (opcional para dev)
- [ ] Servidor de desarrollo corriendo (`npm run dev`)
- [ ] Navegador abierto en http://localhost:3000
- [ ] Landing page visible y funcionando

¡Listo! Ya tienes GasMy corriendo localmente. 🚗💨
