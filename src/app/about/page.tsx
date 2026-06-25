import { Header } from "@/components/layout/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-6">About TREXION Identity NFTs</h1>
        <div className="prose prose-invert space-y-6 text-neutral-300">
          <p>
            TREXION Identity NFTs are soulbound, non-transferable tokens that serve as verifiable
            onchain profiles for every member of the ecosystem. Unlike traditional NFTs that can be
            bought and sold, Identity NFTs are bound to a single wallet address and represent who
            you are.
          </p>

          <h2 className="text-2xl font-bold text-white">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Connect your wallet to TREXION.</li>
            <li>Complete your profile with details relevant to your user type.</li>
            <li>Mint your non-transferable Identity NFT.</li>
            <li>Your NFT becomes your onchain identity, visible to all ecosystem participants.</li>
            <li>Use the AI Matching Engine to discover and connect with other verified members.</li>
          </ol>

          <h2 className="text-2xl font-bold text-white">NFT Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                type: "Startup",
                fields: "Industry, funding stage, community size, website, objectives",
              },
              {
                type: "Creator",
                fields: "Social accounts, niche, audience size, engagement",
              },
              {
                type: "Community",
                fields: "Members, topics, region, activity level",
              },
              {
                type: "Service Provider",
                fields: "Skills, portfolio, reviews, verified status",
              },
              {
                type: "Investor",
                fields: "Interests, ticket size, sector focus",
              },
            ].map((item) => (
              <div key={item.type} className="p-4 rounded-lg bg-neutral-900 border border-neutral-800">
                <h3 className="font-semibold text-white">{item.type} NFT</h3>
                <p className="text-sm text-neutral-400 mt-1">Stores: {item.fields}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white">AI Matching Engine</h2>
          <p>
            The AI Matching Engine scans all minted Identity NFTs, activity logs, reputation scores,
            and interests to find the most relevant matches for your query. Whether you are a
            startup looking for creators in gaming, or an investor seeking high-community
            opportunities, the engine ranks and returns the best fits.
          </p>

          <h2 className="text-2xl font-bold text-white">Onchain Profiles</h2>
          <p>
            Because your details are stored onchain, they are immutable, verifiable, and portable.
            You control your data, and your reputation grows with every interaction and endorsement
            within the TREXION ecosystem.
          </p>
        </div>
      </main>
    </div>
  );
}
