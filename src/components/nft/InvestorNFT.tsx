import type { InvestorNFTProfile } from "@/lib/nft-types";

interface InvestorNFTProps {
  profile: InvestorNFTProfile;
}

export function InvestorNFT({ profile }: InvestorNFTProps) {
  return (
    <div className="border-t border-neutral-800 pt-4 mt-4 space-y-3 text-sm">
      <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
        Investor Details
      </h3>
      <div>
        <span className="text-neutral-400 block mb-1">Interests</span>
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded-full bg-neutral-800 text-xs text-white"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <span className="text-neutral-400">Ticket Size</span>
        <span className="text-white">
          ${profile.ticketSize.min.toLocaleString()} - ${profile.ticketSize.max.toLocaleString()}
        </span>
      </div>
      <div>
        <span className="text-neutral-400 block mb-1">Sector Focus</span>
        <div className="flex flex-wrap gap-2">
          {profile.sectorFocus.map((sector, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded-full bg-neutral-800 text-xs text-white"
            >
              {sector}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
