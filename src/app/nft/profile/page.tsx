import { Header } from "@/components/layout/Header";
import { currentUserProfile } from "@/lib/mock-data";
import { IdentityNFT } from "@/components/nft/IdentityNFT";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Your Identity NFT</h1>
          <p className="text-neutral-400 mt-2">
            This is your soulbound onchain profile. It cannot be transferred and represents your
            verified identity in the TREXION ecosystem.
          </p>
        </div>
        <div className="flex justify-center">
          <IdentityNFT profile={currentUserProfile} />
        </div>
      </main>
    </div>
  );
}
