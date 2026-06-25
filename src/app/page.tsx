import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { currentUserProfile } from "@/lib/mock-data";
import { IdentityNFT } from "@/components/nft/IdentityNFT";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header />
      <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs sm:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Next-Gen Web3 Networking
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Your Identity,{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Onchain
              </span>
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg max-w-xl leading-relaxed">
              TREXION Identity NFTs are soulbound profiles that represent who you are in the ecosystem.
              Connect with startups, creators, communities, and investors through verifiable onchain
              credentials.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/nft/mint"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-neutral-900 font-semibold hover:bg-neutral-200 transition-colors min-h-[48px]"
              >
                Mint Your NFT
              </Link>
              <Link
                href="/matching"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-neutral-800 text-white font-semibold hover:bg-neutral-700 transition-colors border border-neutral-700 min-h-[48px]"
              >
                Find Matches
              </Link>
            </div>
          </div>

          <div className="flex justify-center order-1 lg:order-2">
            <div className="w-full max-w-sm sm:max-w-md">
              <IdentityNFT profile={currentUserProfile} />
            </div>
          </div>
        </div>

        <section className="mt-16 sm:mt-24">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">NFT Types</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {[
              { type: "startup", description: "Industry, funding stage, community size, objectives", colorClass: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
              { type: "creator", description: "Social accounts, niche, audience size, engagement", colorClass: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
              { type: "community", description: "Members, topics, region, activity", colorClass: "bg-green-500/20 text-green-400 border-green-500/30" },
              { type: "service_provider", description: "Skills, portfolio, reviews, verified status", colorClass: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
              { type: "investor", description: "Interests, ticket size, sector focus", colorClass: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
            ].map((item) => (
              <div key={item.type} className="p-4 sm:p-5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
                <div className="flex items-center mb-3">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs capitalize ${item.colorClass}`}>
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
