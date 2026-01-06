# HoloSelf - Catálogo 3D/AR

Catálogo interactivo de productos en 3D con soporte para Realidad Aumentada (AR) usando React, Three.js y WebXR.

## 🚀 Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Vite
- **3D/WebGL**: Three.js + @react-three/fiber + @react-three/drei
- **AR**: 
  - WebXR API para experiencias inmersivas
  - `<model-viewer>` de Google para AR nativa en iOS/Android
  - AR Quick Look (iOS) y Scene Viewer (Android)
- **State Management**: Zustand + React Query (TanStack Query)
- **Styling**: Tailwind CSS
- **Routing**: React Router v6

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

## 🔧 Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://api.nucamp.co
VITE_CDN_URL=https://cdn.nucamp.co
```

## 📁 Estructura del Proyecto

```
src/
├── assets/           # Modelos y texturas (desarrollo)
├── components/       # Componentes React
│   ├── Viewer/      # Visor 3D (Canvas, Scene, ModelInstance)
│   ├── ARButton/    # Botón para activar AR
│   ├── Catalog/     # Lista y tarjetas de productos
│   └── UI/          # Componentes UI reutilizables
├── hooks/           # Custom hooks (useModels, useXR)
├── libs/            # Utilidades (gltfUtils, arHelpers)
├── pages/           # Páginas de la aplicación
├── styles/          # Estilos globales
└── routes/          # Configuración de rutas
```

## 🎨 Características

- ✅ Visualización 3D de modelos GLTF/GLB
- ✅ Soporte para compresión Draco
- ✅ AR nativa en iOS (AR Quick Look)
- ✅ AR nativa en Android (Scene Viewer)
- ✅ WebXR para experiencias AR inmersivas
- ✅ Catálogo con paginación
- ✅ Detalles de producto con visor 3D interactivo
- ✅ Optimización para móviles
- ✅ Lazy loading de modelos

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests E2E
npm run test:e2e
```

## 📱 Compatibilidad AR

- **iOS**: AR Quick Look (Safari)
- **Android**: Scene Viewer (Chrome)
- **WebXR**: Navegadores compatibles (Chrome, Edge, Firefox Reality)
- **Fallback**: `<model-viewer>` para navegadores sin soporte AR

## 🚢 Deployment

### GitHub Pages (Recomendado)

El proyecto está configurado para GitHub Pages. Ver [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) para instrucciones detalladas.

**Pasos rápidos:**

1. **Actualiza el base path en `vite.config.ts`:**
   - Cambia `'/HoloSelf/'` por el nombre de tu repositorio

2. **Habilita GitHub Pages:**
   - Ve a Settings → Pages en tu repositorio
   - Source: **GitHub Actions**

3. **Haz push a main:**
   ```bash
   git push origin main
   ```

4. **Tu sitio estará en:**
   `https://TU_USUARIO.github.io/NOMBRE_REPO/`

### Otras plataformas:

Ver [DEPLOY.md](./DEPLOY.md) para Vercel, Netlify, Cloudflare Pages, etc.

### Variables de Entorno en Producción:
```env
VITE_API_URL=https://api.nucamp.co
VITE_CDN_URL=https://cdn.nucamp.co
VITE_USE_MOCK=false
```

**Importante:** Configura estas variables en GitHub Secrets (Settings → Secrets and variables → Actions) si usas GitHub Pages.

## 📄 Licencia

MIT
