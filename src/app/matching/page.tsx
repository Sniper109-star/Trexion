import { Header } from "@/components/layout/Header";
import { AIMatchingEngine } from "@/components/matching/AIMatchingEngine";

export default function MatchingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header />
      <main className="px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mb-5 sm:mb-6 lg:mb-8 text-center">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">AI Matching Engine</h1>
          <p className="text-neutral-400 mt-2 text-sm sm:text-base max-w-2xl mx-auto">
            The AI searches NFT profiles, activity data, reputation scores, and interests to return
            ranked matches tailored to your query.
          </p>
        </div>
        <AIMatchingEngine />
      </main>
    </div>
  );
}
