# 🚀 Despliegue en GitHub Pages

Guía paso a paso para desplegar HoloSelf en GitHub Pages.

## 📋 Pasos para Desplegar

### 1. Preparar el Repositorio

Asegúrate de que tu código esté en GitHub:

```bash
# Si aún no tienes un repositorio
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/HoloSelf.git
git push -u origin main
```

### 2. Configurar el Base Path

**IMPORTANTE:** Necesitas actualizar el `base` en `vite.config.ts` con el nombre de tu repositorio.

1. Abre `vite.config.ts`
2. Busca la línea: `base: process.env.GITHUB_PAGES === 'true' ? '/HoloSelf/' : '/',`
3. Reemplaza `'HoloSelf'` con el nombre exacto de tu repositorio

**Ejemplo:**
- Si tu repo se llama `holoself` → `base: '/holoself/'`
- Si tu repo se llama `mi-catalogo-3d` → `base: '/mi-catalogo-3d/'`
- **El nombre debe coincidir exactamente** (respetando mayúsculas/minúsculas)

### 3. Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, busca **Pages**
4. En **Source**, selecciona: **GitHub Actions**
5. Guarda los cambios

### 4. Configurar Variables de Entorno (Opcional)

Si quieres usar tu API real en lugar de datos mock:

1. En tu repositorio, ve a **Settings** → **Secrets and variables** → **Actions**
2. Click en **New repository secret**
3. Agrega estos secrets (si los necesitas):
   - `VITE_API_URL` = `https://api.nucamp.co`
   - `VITE_CDN_URL` = `https://cdn.nucamp.co`

**Nota:** Si no configuras estos secrets, la app usará los valores por defecto o datos mock.

### 5. Hacer Push para Activar el Deploy

El workflow de GitHub Actions se activará automáticamente cuando hagas push a `main`:

```bash
git add .
git commit -m "Configure GitHub Pages"
git push origin main
```

### 6. Ver el Deploy

1. Ve a la pestaña **Actions** en tu repositorio
2. Verás el workflow "Deploy to GitHub Pages" ejecutándose
3. Espera a que termine (tarda 2-3 minutos)
4. Una vez completado, ve a **Settings** → **Pages**
5. Verás la URL de tu sitio: `https://TU_USUARIO.github.io/HoloSelf/`

## 🔧 Configuración Avanzada

### Cambiar el Nombre del Repositorio

Si cambias el nombre de tu repositorio después:

1. Actualiza `vite.config.ts` con el nuevo nombre
2. Actualiza `.github/workflows/deploy.yml` si es necesario
3. Haz push de los cambios

### Usar Dominio Personalizado

1. En **Settings** → **Pages**, agrega tu dominio personalizado
2. GitHub te dará instrucciones para configurar DNS
3. El workflow seguirá funcionando igual

### Deploy Manual

Si quieres hacer deploy manual sin hacer push:

1. Ve a la pestaña **Actions**
2. Selecciona el workflow "Deploy to GitHub Pages"
3. Click en **Run workflow**
4. Selecciona la rama (main)
5. Click en **Run workflow**

## ✅ Verificación

Después del deploy, verifica:

- ✅ La URL carga correctamente
- ✅ Los modelos 3D se cargan
- ✅ La navegación funciona (prueba `/product/1`)
- ✅ No hay errores 404

## 🐛 Troubleshooting

### Error 404 en las rutas

**Problema:** Las rutas como `/product/1` dan 404

**Solución:** 
- Verifica que el `base` en `vite.config.ts` coincida con el nombre de tu repo
- Asegúrate de que GitHub Pages esté configurado para usar **GitHub Actions**

### El sitio no se actualiza

**Problema:** Los cambios no aparecen después del deploy

**Solución:**
- Espera 2-3 minutos (el build toma tiempo)
- Verifica que el workflow en Actions haya terminado exitosamente
- Limpia la caché del navegador (Ctrl+Shift+R)

### Build falla en GitHub Actions

**Problema:** El workflow falla al hacer build

**Solución:**
- Verifica que `package.json` tenga todas las dependencias
- Revisa los logs en la pestaña Actions para ver el error específico
- Prueba hacer `npm run build` localmente primero

### Variables de entorno no funcionan

**Problema:** La app no usa las variables configuradas

**Solución:**
- Las variables deben tener el prefijo `VITE_`
- Configúralas en **Settings** → **Secrets and variables** → **Actions**
- Haz un nuevo deploy después de agregar secrets

## 📝 Notas Importantes

1. **HTTPS obligatorio:** GitHub Pages solo funciona con HTTPS, necesario para WebXR/AR
2. **Base path:** Debe coincidir exactamente con el nombre de tu repositorio
3. **Ramas:** Solo se despliega desde la rama `main` (puedes cambiar esto en el workflow)
4. **Límites:** GitHub Pages es gratuito pero tiene límites de ancho de banda

## 🔗 URLs Útiles

- Tu sitio: `https://TU_USUARIO.github.io/HoloSelf/`
- Actions: `https://github.com/TU_USUARIO/HoloSelf/actions`
- Settings: `https://github.com/TU_USUARIO/HoloSelf/settings/pages`

## 🎉 ¡Listo!

Una vez configurado, cada push a `main` desplegará automáticamente tu aplicación.
