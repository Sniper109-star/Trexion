"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/nft/profile", label: "Profile", icon: "🪪" },
  { href: "/nft/mint", label: "Mint", icon: "✨" },
  { href: "/matching", label: "Matches", icon: "🔍" },
  { href: "/about", label: "About", icon: "ℹ️" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <>
      <header className="md:hidden sticky top-0 z-50 border-b border-blue-800 bg-blue-950/90 backdrop-blur-md">
        <div className="flex items-center justify-between h-14 px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🦖</span>
            <span className="text-lg font-bold text-white tracking-tight">TREXION</span>
          </Link>
        </div>
      </header>

      <header className="hidden md:flex sticky top-0 z-50 border-b border-blue-800 bg-blue-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl">🦖</span>
              <span className="text-lg font-bold text-white tracking-tight">TREXION</span>
            </Link>

            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-blue-800 text-white"
                        : "text-blue-200 hover:text-white hover:bg-blue-800/50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-blue-800 bg-blue-950/95 backdrop-blur-md safe-area-pb">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-lg transition-colors min-w-[64px] ${
                  isActive
                    ? "text-amber-400"
                    : "text-blue-300 hover:text-blue-100"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
