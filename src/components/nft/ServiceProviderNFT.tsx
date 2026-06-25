import type { ServiceProviderNFTProfile } from "@/lib/nft-types";

interface ServiceProviderNFTProps {
  profile: ServiceProviderNFTProfile;
}

export function ServiceProviderNFT({ profile }: ServiceProviderNFTProps) {
  return (
    <div className="border-t border-neutral-800 pt-4 mt-4 space-y-3 text-sm">
      <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
        Service Provider Details
      </h3>
      <div>
        <span className="text-neutral-400 block mb-1">Skills</span>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded-full bg-neutral-800 text-xs text-white"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div>
        <span className="text-neutral-400 block mb-1">Portfolio</span>
        <ul className="space-y-1">
          {profile.portfolio.map((item, i) => (
            <li key={i}>
              <a
                href={item.url}
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <span className="text-neutral-400 block mb-1">Reviews ({profile.reviews.length})</span>
        <ul className="space-y-2">
          {profile.reviews.map((review, i) => (
            <li key={i} className="bg-neutral-800 rounded p-2">
              <div className="flex items-center justify-between">
                <span className="text-white text-xs">{review.from}</span>
                <span className="text-yellow-400 text-xs">
                  {"★".repeat(review.rating)}
                </span>
              </div>
              <p className="text-neutral-400 text-xs mt-1">{review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-0">
        <span className="text-neutral-400">Verified</span>
        <span className={profile.verified ? "text-green-400" : "text-red-400"}>
          {profile.verified ? "Yes" : "No"}
        </span>
      </div>
    </div>
  );
}
