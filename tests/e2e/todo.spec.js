import { test, expect } from '@playwright/test'

const input = (page) => page.getByLabel('Nova tarefa')

async function add(page, text) {
  await input(page).fill(text)
  await page.getByRole('button', { name: /Adicionar/ }).click()
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
})

test('adiciona tarefa e mostra o contador', async ({ page }) => {
  await add(page, 'Estudar React')
  await expect(page.getByText('Estudar React')).toBeVisible()
  await expect(page.getByText('1 tarefa restante')).toBeVisible()
})

test('nao adiciona tarefa vazia', async ({ page }) => {
  await add(page, '   ')
  await expect(page.getByText('Página em branco')).toBeVisible()
})

test('conclui, filtra e limpa concluidas', async ({ page }) => {
  await add(page, 'A')
  await add(page, 'B')
  await page.getByRole('checkbox', { name: 'A' }).check()
  await expect(page.getByText('1 tarefa restante')).toBeVisible()

  await page.getByRole('button', { name: 'Ativas', exact: true }).click()
  await expect(page.getByText('B', { exact: true })).toBeVisible()
  await expect(page.getByText('A', { exact: true })).toHaveCount(0)

  await page.getByRole('button', { name: 'Concluídas', exact: true }).click()
  await expect(page.getByText('A', { exact: true })).toBeVisible()

  await page.getByRole('button', { name: 'Todas', exact: true }).click()
  await page.getByRole('button', { name: /Limpar concluídas/ }).click()
  await expect(page.getByText('A', { exact: true })).toHaveCount(0)
})

test('edita com Enter, cancela com Esc e devolve o foco ao botao editar', async ({ page }) => {
  await add(page, 'Original')
  await page.getByRole('button', { name: 'Editar "Original"' }).click()
  const edit = page.getByLabel('Editar tarefa')
  await edit.fill('Mudou')
  await edit.press('Enter')
  await expect(page.getByText('Mudou', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Editar "Mudou"' })).toBeFocused()

  await page.getByRole('button', { name: 'Editar "Mudou"' }).click()
  await page.getByLabel('Editar tarefa').fill('Nao salva')
  await page.getByLabel('Editar tarefa').press('Escape')
  await expect(page.getByText('Mudou', { exact: true })).toBeVisible()
})

test('edita com duplo clique', async ({ page }) => {
  await add(page, 'Duplo')
  await page.getByText('Duplo', { exact: true }).dblclick()
  await expect(page.getByLabel('Editar tarefa')).toBeVisible()
})

test('remove tarefa', async ({ page }) => {
  await add(page, 'Sair')
  await page.getByRole('button', { name: 'Remover "Sair"' }).click()
  await expect(page.getByText('Sair', { exact: true })).toHaveCount(0)
})

test('tarefas persistem depois de recarregar', async ({ page }) => {
  await add(page, 'Persistente')
  await page.reload()
  await expect(page.getByText('Persistente')).toBeVisible()
})

test('tema escolhido persiste', async ({ page }) => {
  await page.getByRole('button', { name: /Noite/ }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

test('sem erros no console', async ({ page }) => {
  const errors = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto('/')
  await add(page, 'Console')
  expect(errors).toEqual([])
})

test('remocao persiste depois de recarregar', async ({ page }) => {
  await add(page, 'Fica')
  await add(page, 'Some')
  await page.reload()
  await page.getByRole('button', { name: 'Remover "Some"' }).click()
  await page.reload()
  await expect(page.getByText('Some', { exact: true })).toHaveCount(0)
  await expect(page.getByText('Fica', { exact: true })).toBeVisible()
})

test('conclusao persiste depois de recarregar', async ({ page }) => {
  await add(page, 'Feita')
  await page.getByRole('checkbox', { name: 'Feita' }).check()
  await page.reload()
  await expect(page.getByRole('checkbox', { name: 'Feita' })).toBeChecked()
})
