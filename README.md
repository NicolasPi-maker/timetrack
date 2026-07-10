# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Design chart

App theme is dark-only. Colors are defined as CSS variables in [`app/assets/css/main.css`](app/assets/css/main.css) and exposed as Tailwind classes via [`tailwind.config.ts`](tailwind.config.ts).

| Rôle | Variable | Valeur | Classes Tailwind |
|---|---|---|---|
| Fond app | `--color-bg` | `#1c1914` | `bg-bg` |
| Surface (cards/inputs) | `--color-surface` | `#24201a` | `bg-surface` |
| Bordure | `--color-border` | `#332d24` | `border-border` |
| Texte principal | `--color-text` | `#f2ede1` | `text-fg` |
| Texte facultatif | `--color-text-muted` | `#7a7367` | `text-muted` |
| Accent / état actif | `--color-accent` | `#ffb000` | `bg-accent`, `text-accent` |
| Progress bars / graphs | `--color-progress` | `#5eead4` | `bg-progress`, `text-progress` |

`surface` et `border` sont dérivées de `--color-bg` (pas de valeur imposée) — à ajuster si besoin.
