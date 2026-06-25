import type { UserType } from "@/lib/nft-types";

interface NFTBadgeProps {
  userType: UserType;
  size?: "sm" | "md" | "lg";
}

const userTypeColors: Record<UserType, string> = {
  startup: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  creator: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  community: "bg-green-500/20 text-green-400 border-green-500/30",
  service_provider: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  investor: "bg-pink-500/20 text-pink-400 border-pink-500/30",
};

const userTypeLabels: Record<UserType, string> = {
  startup: "Startup",
  creator: "Creator",
  community: "Community",
  service_provider: "Service Provider",
  investor: "Investor",
};

export function NFTBadge({ userType, size = "md" }: NFTBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${sizeClasses[size]} ${userTypeColors[userType]}`}
    >
      {userTypeLabels[userType]}
    </span>
  );
}
