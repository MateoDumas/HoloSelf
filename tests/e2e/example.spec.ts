import { test, expect } from '@playwright/test'

test('flujo principal: home → producto → carrito', async ({ page }) => {
  await page.goto('/')

  const firstProductTitle = await page
    .locator('a[href^="/product/"] h3')
    .first()
    .innerText()

  await page.getByRole('link', { name: firstProductTitle }).first().click()

  await expect(page).toHaveURL(/\/product\/.+/)

  const addToCartButton = page.getByRole('button', {
    name: /Add to Cart|Agregar/,
  })
  await addToCartButton.click()

  await page
    .getByRole('button', {
      name: /Shopping cart|Carrito de compras/i,
    })
    .click()

  await expect(
    page.getByRole('heading', {
      name: /Shopping Cart|Carrito de Compras/i,
    }),
  ).toBeVisible()

  await expect(page.getByText(firstProductTitle)).toBeVisible()
})
