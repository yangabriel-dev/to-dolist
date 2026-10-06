import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'playwright-report', 'test-results']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // Regras duras: o CI barra o PR. Veja CLAUDE.md.
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.name='useEffect']",
          message: 'Sem useEffect. Calcule durante a renderizacao, use handlers de evento ou ref callback. Veja CLAUDE.md.',
        },
        {
          selector: "CallExpression[callee.object.name='React'][callee.property.name='useEffect']",
          message: 'Sem useEffect. Veja CLAUDE.md.',
        },
        {
          selector: "CallExpression[callee.name='useLayoutEffect']",
          message: 'Sem useLayoutEffect. Veja CLAUDE.md.',
        },
      ],
      'no-console': 'error',
      eqeqeq: ['error', 'always'],
    },
  },
  {
    files: ['src/components/**/*.{js,jsx}'],
    rules: {
      // Grafo de imports: componentes nao importam App nem main (so o contrario).
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['**/App', '**/App.jsx', '**/main', '**/main.jsx'], message: 'Componentes nao importam App/main. A dependencia vai de App para os componentes.' },
          ],
        },
      ],
    },
  },
  {
    files: ['tests/**/*.js', 'playwright.config.js'],
    languageOptions: { globals: globals.node },
    rules: { 'no-restricted-syntax': 'off' },
  },
])
