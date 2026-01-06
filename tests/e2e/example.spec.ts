import { test, expect } from '@playwright/test'

test('debe cargar la página principal', async ({ page }) => {
  await page.goto('/')
  
  // Verificar que el título está presente
  await expect(page.locator('h1')).toContainText('HoloSelf')
  
  // Verificar que hay contenido del catálogo
  await expect(page.locator('text=Catálogo de Productos')).toBeVisible()
})

test('debe navegar a la página de producto', async ({ page }) => {
  await page.goto('/')
  
  // Esperar a que cargue el catálogo
  await page.waitForSelector('text=Catálogo de Productos', { timeout: 10000 })
  
  // Hacer clic en el primer producto (si existe)
  const firstProduct = page.locator('a[href^="/product/"]').first()
  if (await firstProduct.count() > 0) {
    await firstProduct.click()
    await expect(page).toHaveURL(/\/product\/.+/)
  }
})
