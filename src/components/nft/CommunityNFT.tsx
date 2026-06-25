import type { CommunityNFTProfile } from "@/lib/nft-types";

interface CommunityNFTProps {
  profile: CommunityNFTProfile;
}

export function CommunityNFT({ profile }: CommunityNFTProps) {
  return (
    <div className="border-t border-neutral-800 pt-4 mt-4 space-y-3 text-sm">
      <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
        Community Details
      </h3>
      <div className="flex justify-between">
        <span className="text-neutral-400">Members</span>
        <span className="text-white">{profile.members.toLocaleString()}</span>
      </div>
      <div>
        <span className="text-neutral-400 block mb-1">Topics</span>
        <div className="flex flex-wrap gap-2">
          {profile.topics.map((topic, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded-full bg-neutral-800 text-xs text-white"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <span className="text-neutral-400">Region</span>
        <span className="text-white">{profile.region}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-neutral-400">Activity</span>
        <span
          className={`capitalize ${
            profile.activity === "high"
              ? "text-green-400"
              : profile.activity === "medium"
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          {profile.activity}
        </span>
      </div>
    </div>
  );
}
