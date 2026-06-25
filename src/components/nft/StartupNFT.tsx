import type { StartupNFTProfile } from "@/lib/nft-types";

interface StartupNFTProps {
  profile: StartupNFTProfile;
}

export function StartupNFT({ profile }: StartupNFTProps) {
  return (
    <div className="border-t border-blue-800 pt-4 mt-4 space-y-3 text-sm">
      <h3 className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
        Startup Details
      </h3>
      <div className="flex justify-between">
        <span className="text-blue-200">Industry</span>
        <span className="text-white">{profile.industry}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-blue-200">Funding Stage</span>
        <span className="text-white">{profile.fundingStage}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-blue-200">Community Size</span>
        <span className="text-white">{profile.communitySize.toLocaleString()}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-0">
        <span className="text-blue-200">Website</span>
        <a
          href={profile.website}
          className="text-blue-400 hover:underline truncate max-w-[180px] sm:text-right"
          target="_blank"
          rel="noopener noreferrer"
        >
          {profile.website}
        </a>
      </div>
      <div>
        <span className="text-blue-200 block mb-1">Objectives</span>
        <ul className="list-disc list-inside text-white space-y-1">
          {profile.objectives.map((obj, i) => (
            <li key={i}>{obj}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
