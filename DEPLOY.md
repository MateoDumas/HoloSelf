# Guía de Despliegue - HoloSelf

Esta guía te ayudará a desplegar tu aplicación HoloSelf en diferentes plataformas.

## 📦 Preparación

Antes de desplegar, asegúrate de:

1. **Hacer commit de tus cambios:**
```bash
git add .
git commit -m "Preparar para despliegue"
git push origin main
```

2. **Verificar que el build funciona localmente:**
```bash
npm run build
npm run preview
```

## 🚀 Opción 1: Vercel (Recomendado)

Vercel es ideal para aplicaciones React/Vite con despliegue automático desde GitHub.

### Pasos:

1. **Instalar Vercel CLI (opcional):**
```bash
npm i -g vercel
```

2. **Desplegar desde la CLI:**
```bash
vercel
```

3. **O usar la interfaz web:**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Vite
   - Configura las variables de entorno (ver abajo)

### Variables de Entorno en Vercel:
- `VITE_API_URL`: URL de tu API (ej: `https://api.nucamp.co`)
- `VITE_CDN_URL`: URL del CDN (ej: `https://cdn.nucamp.co`)
- `VITE_USE_MOCK`: `false` (para producción)

### Configuración automática:
Vercel detectará automáticamente:
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

## 🌐 Opción 2: Netlify

Netlify también ofrece despliegue automático desde GitHub.

### Pasos:

1. **Crear archivo `netlify.toml` en la raíz:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. **Desplegar:**
   - Ve a [netlify.com](https://netlify.com)
   - Conecta tu repositorio
   - Netlify usará el archivo `netlify.toml` automáticamente

### Variables de Entorno en Netlify:
En el dashboard de Netlify, ve a:
- Site settings → Environment variables
- Agrega las mismas variables que en Vercel

---

## ⚡ Opción 3: Cloudflare Pages

Cloudflare Pages es gratuito y rápido.

### Pasos:

1. **Desplegar desde la CLI:**
```bash
npm i -g wrangler
wrangler pages deploy dist
```

2. **O usar la interfaz web:**
   - Ve a [dash.cloudflare.com](https://dash.cloudflare.com)
   - Pages → Create a project
   - Conecta tu repositorio
   - Build settings:
     - Framework preset: Vite
     - Build command: `npm run build`
     - Build output directory: `dist`

### Variables de Entorno en Cloudflare:
En el dashboard de Cloudflare Pages:
- Settings → Environment variables
- Agrega las variables con el prefijo `VITE_`

---

## 🔧 Opción 4: GitHub Pages

Para desplegar en GitHub Pages necesitas configurar GitHub Actions.

### Pasos:

1. **Crear workflow de GitHub Actions:**
El archivo `.github/workflows/deploy.yml` ya está creado, pero necesitas configurarlo.

2. **Configurar en GitHub:**
   - Ve a Settings → Pages
   - Source: GitHub Actions

3. **Actualizar `vite.config.ts` para GitHub Pages:**
```typescript
export default defineConfig({
  base: '/HoloSelf/', // Reemplaza con el nombre de tu repo
  // ... resto de la configuración
})
```

---

## 📝 Variables de Entorno para Producción

En todas las plataformas, configura estas variables:

```env
VITE_API_URL=https://api.nucamp.co
VITE_CDN_URL=https://cdn.nucamp.co
VITE_USE_MOCK=false
```

**Importante:** 
- En producción, `VITE_USE_MOCK` debe ser `false`
- Las variables deben tener el prefijo `VITE_` para que Vite las incluya en el build
- Después de agregar variables, necesitas hacer un nuevo deploy

---

## ✅ Verificación Post-Despliegue

Después de desplegar, verifica:

1. ✅ La aplicación carga correctamente
2. ✅ Los modelos 3D se cargan (si usas CDN)
3. ✅ El AR funciona en dispositivos móviles
4. ✅ Las rutas funcionan (prueba `/product/1`)
5. ✅ No hay errores en la consola del navegador

---

## 🔄 Despliegue Continuo (CI/CD)

Si conectas tu repositorio a Vercel/Netlify/Cloudflare, cada push a `main` desplegará automáticamente.

Para branches de desarrollo:
- Vercel: Crea preview deployments automáticamente
- Netlify: Configura branch deploys en settings
- Cloudflare: Similar configuración

---

## 🐛 Troubleshooting

### Build falla:
- Verifica que todas las dependencias estén en `package.json`
- Ejecuta `npm run build` localmente para ver errores

### Variables de entorno no funcionan:
- Asegúrate de que tengan el prefijo `VITE_`
- Reinicia el build después de agregar variables

### Rutas no funcionan (404):
- Configura redirects para SPA (ver Netlify config arriba)
- En Vercel, esto se hace automáticamente

### Modelos 3D no cargan:
- Verifica CORS en tu CDN
- Asegúrate de que las URLs sean HTTPS en producción

---

## 📚 Recursos

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
