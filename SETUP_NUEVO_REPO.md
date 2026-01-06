# 🚀 Guía para Crear el Nuevo Repositorio

## Paso 1: Crear el Repositorio en GitHub

1. Ve a: https://github.com/new
2. **Repository name:** `HoloSelf` (o el nombre que prefieras)
3. **Description:** "Catálogo 3D/AR con React, Three.js y WebXR"
4. **Visibility:** Public (necesario para GitHub Pages gratuito)
5. **NO marques** "Add a README file" (ya tenemos uno)
6. **NO marques** "Add .gitignore" (ya tenemos uno)
7. **NO marques** "Choose a license"
8. Click en **"Create repository"**

## Paso 2: Subir el Código

Una vez creado el repositorio, GitHub te dará una URL. Ejecuta estos comandos:

```bash
# Si ya tienes git inicializado (que sí tienes)
git remote remove origin  # Si existe
git remote add origin https://github.com/TU_USUARIO/HoloSelf.git
git branch -M main
git push -u origin main
```

**Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub**

## Paso 3: Habilitar GitHub Pages

1. Ve a: `https://github.com/TU_USUARIO/HoloSelf/settings/pages`
2. En **Source**, selecciona: **GitHub Actions**
3. Guarda los cambios

## Paso 4: Verificar el Deploy

1. Ve a la pestaña **Actions** en tu repositorio
2. Verás el workflow "Deploy to GitHub Pages" ejecutándose
3. Espera 2-3 minutos
4. Tu sitio estará en: `https://TU_USUARIO.github.io/HoloSelf/`

## ✅ Listo!

Una vez completado, tu aplicación estará disponible en GitHub Pages.
