# Active Context: Next.js Starter Template

## Current State

**Template Status**: ✅ TREXION NFT Integration Complete

The template has been expanded into a TREXION Identity NFT application with five NFT types, an AI matching engine, and mint UI.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] NFT Identity types and models (startup, creator, community, service_provider, investor)
- [x] Identity NFT component with soulbound profile display
- [x] Type-specific NFT detail components
- [x] AI Matching Engine with scoring and ranked results
- [x] Mint NFT page with dynamic form per user type
- [x] Profile and About pages
- [x] Header navigation

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page with NFT overview | ✅ Ready |
| `src/app/layout.tsx` | Root layout + header | ✅ Ready |
| `src/app/nft/profile/page.tsx` | User profile NFT display | ✅ Ready |
| `src/app/nft/mint/page.tsx` | Mint new identity NFT | ✅ Ready |
| `src/app/matching/page.tsx` | AI matching results | ✅ Ready |
| `src/app/about/page.tsx` | About TREXION NFTs | ✅ Ready |
| `src/lib/nft-types.ts` | TypeScript types | ✅ Ready |
| `src/lib/mock-data.ts` | Mock profiles | ✅ Ready |
| `src/lib/matching.ts` | Scoring logic | ✅ Ready |
| `src/components/nft/` | NFT UI components | ✅ Ready |
| `src/components/matching/` | Matching engine UI | ✅ Ready |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## Current Focus

The application is ready for user testing. Next steps:

1. Connect real wallet (Web3/Ethers/Viem)
2. Deploy smart contract for soulbound NFTs
3. Add pagination and filtering to matching
4. Add testing setup

## Quick Start Guide

### To add a new page:

Create a file at `src/app/[route]/page.tsx`:
```tsx
export default function NewPage() {
  return <div>New page content</div>;
}
```

### To add components:

Create `src/components/` directory and add components:
```tsx
// src/components/ui/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="px-4 py-2 bg-blue-600 text-white rounded">{children}</button>;
}
```

### To add a database:

Follow `.kilocode/recipes/add-database.md`

### To add API routes:

Create `src/app/api/[route]/route.ts`:
```tsx
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}
```

## Available Recipes

| Recipe | File | Use Case |
|--------|------|----------|
| Add Database | `.kilocode/recipes/add-database.md` | Data persistence with Drizzle + SQLite |

## Pending Improvements

- [ ] Add real wallet adapter (Phantom/Solflare integration)
- [ ] Host TREXION metadata JSON for NFT URIs
- [ ] Add testing setup recipe

## Session History

| Date | Changes |
|------|---------|
| 2026-06-25 | TREXION NFT integration: types, components, matching engine, mint UI, pages |
| 2026-06-25 | Added Solana devnet NFT minting via @solana/kit and @metaplex-foundation/mpl-token-metadata-kit |
