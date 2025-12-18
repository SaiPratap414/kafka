# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # Kafka Guide (Beginner → Intermediate)

  A clean, self-explanatory single-page site that explains Apache Kafka from beginner to intermediate level using an e-commerce example, then maps the same concepts to the Smart Advisor domain (email deliveries, analytics, reports).

  ## Tech

  - React + TypeScript (Vite)
  - Tailwind CSS (Tailwind v4 via `@tailwindcss/vite`)

  ## Run locally

  ```bash
  npm install
  npm run dev
  ```

  Then open the local URL printed by Vite (usually `http://localhost:5173/`).

  ## Production build

  ```bash
  npm run build
  npm run preview
  ```
```
