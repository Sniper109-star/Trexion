import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { currentUserProfile } from "@/lib/mock-data";
import { IdentityNFT } from "@/components/nft/IdentityNFT";
import { NFTBadge } from "@/components/nft/NFTBadge";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Next-Gen Web3 Networking
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Your Identity,{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Onchain
              </span>
            </h1>
            <p className="text-neutral-400 text-lg max-w-xl">
              TREXION Identity NFTs are soulbound profiles that represent who you are in the ecosystem.
              Connect with startups, creators, communities, and investors through verifiable onchain
              credentials.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/nft/mint"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-neutral-900 font-medium hover:bg-neutral-200 transition-colors"
              >
                Mint Your NFT
              </Link>
              <Link
                href="/matching"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-neutral-800 text-white font-medium hover:bg-neutral-700 transition-colors border border-neutral-700"
              >
                Find Matches
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <IdentityNFT profile={currentUserProfile} />
          </div>
        </div>

        <section className="mt-24">
          <h2 className="text-2xl font-bold text-white mb-8">NFT Types</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { type: "startup", description: "Industry, funding stage, community size, objectives", color: "blue" },
              { type: "creator", description: "Social accounts, niche, audience size, engagement", color: "purple" },
              { type: "community", description: "Members, topics, region, activity", color: "green" },
              { type: "service_provider", description: "Skills, portfolio, reviews, verified status", color: "yellow" },
              { type: "investor", description: "Interests, ticket size, sector focus", color: "pink" },
            ].map((item) => (
              <div key={item.type} className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
                <div className="flex items-center mb-3">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs bg-${item.color}-500/20 text-${item.color}-400 border-${item.color}-500/30 capitalize`}>
                    {item.type.replace("_", " ")}
                  </span>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
