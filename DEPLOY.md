# 🚀 Guía de Deploy a gasmy.org

## Opción 1: Deploy con Vercel (RECOMENDADO - Gratis)

### Paso 1: Preparar el proyecto

Ya está listo ✅

### Paso 2: Deploy a Vercel

```bash
# En la carpeta del proyecto:
vercel
```

Sigue las instrucciones:
- Login con tu cuenta
- Confirma el proyecto
- Espera el deploy (2-3 minutos)

### Paso 3: Conectar tu dominio gasmy.org

1. **En Vercel Dashboard:**
   - Ve a tu proyecto → Settings → Domains
   - Click "Add Domain"
   - Escribe: `gasmy.org`

2. **En tu proveedor de dominio (donde compraste gasmy.org):**
   
   Agrega estos registros DNS:

   **Para dominio principal (gasmy.org):**
   ```
   Tipo: A
   Nombre: @
   Valor: 76.76.21.21
   ```

   **Para www (www.gasmy.org):**
   ```
   Tipo: CNAME
   Nombre: www
   Valor: cname.vercel-dns.com
   ```

3. **Espera 10-60 minutos** para que se propague el DNS

4. **¡Listo!** Tu sitio estará en https://gasmy.org

---

## Opción 2: Deploy con Netlify (Alternativa)

### Paso 1: Crear cuenta
- Ve a: https://netlify.com
- Regístrate gratis

### Paso 2: Deploy manual
1. Build el proyecto:
   ```bash
   npm run build
   ```

2. En Netlify:
   - Click "Add new site" → "Deploy manually"
   - Arrastra la carpeta `.next` al área de drop

### Paso 3: Conectar dominio
1. Site settings → Domain management
2. Add custom domain → `gasmy.org`
3. Configurar DNS igual que Vercel

---

## Opción 3: GitHub + Vercel (Automático)

### Ventaja: Se actualiza automáticamente cuando haces cambios

1. **Crear repositorio en GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - GasMy landing"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/gasmy-landing.git
   git push -u origin main
   ```

2. **Conectar Vercel a GitHub:**
   - En Vercel → Add New Project
   - Import Git Repository
   - Selecciona tu repo
   - Deploy automático ✨

3. **Conectar dominio** (mismo proceso que Opción 1)

---

## Variables de Entorno en Producción

En Vercel/Netlify Dashboard:
- Settings → Environment Variables
- Agregar:
  ```
  NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
  NEXT_PUBLIC_PIXEL_ID=123456789
  NEXT_PUBLIC_FORM_ENDPOINT=tu-webhook-url
  ```

---

## Verificar que funcione

Después del deploy:
1. Visita https://gasmy.org
2. Prueba la calculadora
3. Prueba los formularios
4. Verifica responsive (móvil)

---

## Solución de Problemas

**"Domain not working"**
- Espera 1 hora para propagación DNS
- Verifica registros DNS en tu proveedor

**"Build failed"**
- Revisa logs en Vercel/Netlify
- Asegúrate que `.env.local` no esté en Git

**"Forms not submitting"**
- Configura `NEXT_PUBLIC_FORM_ENDPOINT` en variables de entorno

---

## Costos

- ✅ **Vercel FREE:** Perfecto para este proyecto
- ✅ **Netlify FREE:** También funciona bien
- ✅ **GitHub:** Gratis para repos públicos

**Total: $0 USD** 🎉

Solo pagas el dominio gasmy.org (ya lo tienes)
