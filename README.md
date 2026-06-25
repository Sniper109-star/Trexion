# TREXION Identity NFT Platform

TREXION is a Solana-powered platform where members receive soulbound (non-transferable) Identity NFTs. These NFTs serve as verifiable onchain profiles representing five user types: Startup, Creator, Community, Service Provider, and Investor. The platform includes an AI matching engine to connect members based on NFT metadata.

## Features

- **Identity NFT Minting** — Mint soulbound NFTs on Solana devnet via `@solana/kit` and Metaplex Token Metadata.
- **Five NFT Types** — Startup, Creator, Community, Service Provider, Investor.
- **AI Matching Engine** — Scores and ranks members by metadata alignment.
- **Next.js 16 + React 19** — Modern App Router server and client components.
- **Tailwind CSS v4** — Utility-first styling with `@tailwindcss/postcss`.
- **TypeScript** — Strict type checking across the whole codebase.
- **Bun** — Fast package manager and runtime.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.x | React framework with App Router |
| React | 19.x | UI library |
| TypeScript | 5.x | Type-safe JavaScript |
| Tailwind CSS | 4.x | Utility-first CSS |
| Solana Kit | 6.x | Solana SDK (`@solana/kit`) |
| Metaplex | 0.0.3 | NFT metadata (`@metaplex-foundation/mpl-token-metadata-kit`) |
| Bun | Latest | Package manager & runtime |

## Prerequisites

- [Bun](https://bun.sh) (v1.x)
- Node.js 20+ (recommended)

## Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun run dev
# Open http://localhost:3000
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun install` | Install dependencies |
| `bun dev` | Start development server |
| `bun build` | Production build |
| `bun start` | Start production server |
| `bun lint` | Run ESLint |
| `bun typecheck` | Run TypeScript type checking |

## Project Structure

```
.
├── .github/workflows/ci.yml
├── .kilocode/
│   └── rules/
│       ├── memory-bank/
│       │   ├── brief.md
│       │   ├── product.md
│       │   ├── architecture.md
│       │   ├── tech.md
│       │   └── context.md
│       └── add-database.md
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── about/
│   │   ├── matching/
│   │   ├── nft/
│   │   │   ├── mint/
│   │   │   └── profile/
│   ├── components/
│   │   ├── layout/
│   │   ├── matching/
│   │   └── nft/
│   └── lib/
│       ├── matching.ts
│       ├── mock-data.ts
│       ├── nft-types.ts
│       └── solana-nft.ts
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── bun.lock
```

## CI/CD

GitHub Actions workflow runs on every push and pull request to `main`:

- `bun install`
- `bun lint`
- `bun typecheck`
- `bun build`

## Deployment

Build the production bundle:

```bash
bun run build
bun run start
```

## What is TREXION?

TREXION is two things in one:

1. **A Next.js web application** — a Solana-powered platform where members receive soulbound (non-transferable) Identity NFTs and are matched through an AI matching engine.
2. **An AI coding agent** — an assistant that expands this repository by adding components, pages, dependencies, databases, and workflows based on user requests, using a memory bank and recipe system for context-aware development.

## AI Agent System

The AI agent uses a memory bank stored in `.kilocode/rules/memory-bank/` and config files in `.kilocode/` to understand project context, goals, and conventions. It can:

- Read the current project state and conventions before making changes.
- Update the memory bank after significant changes.
- Use recipes from `.kilocode/recipes/` to scaffold common features like databases.
- Maintain consistency with existing architecture, tech stack, and coding standards.

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `.kilocode/` | AI agent configuration, commands, agents, skills, and memory bank |
| `src/` | Next.js application source code |
| `.github/workflows/` | CI/CD pipelines |

## Contributing

1. Create a feature branch.
2. Make your changes.
3. Ensure `bun lint`, `bun typecheck`, and `bun build` pass.
4. Open a pull request to `main`.

## License

MIT
