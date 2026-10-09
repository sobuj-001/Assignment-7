
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { bazarData } from "@/data/bazarData";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const { categories } = bazarData;
  const { data: session } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getProfileImage = () => {
    if (session?.user?.image) {
      return session.user.image;
    }

    const userName = session?.user?.name?.toLowerCase() || "";

    const isFemale = [
      "fatema",
      "aisha",
      "nusrat",
      "sumi",
      "taslima",
      "anika",
    ].some((name) => userName.includes(name));

    if (isFemale) {
      return "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces";
    }

    return "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces";
  };

  return (
    <header className="border-b border-[#e5e9e6] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#079447] text-xl">
            🛒
          </div>

          <div>
            <h1 className="text-lg font-extrabold leading-tight text-[#172019]">
              বাজার দর
            </h1>

            <p className="text-[10px] text-gray-500">
              চট্টগ্রাম, ৮ অক্টোবর, ২০২৬
            </p>
          </div>
        </Link>

        <div className="relative" ref={dropdownRef}>
          {session ? (
            <div>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 transition hover:bg-gray-100"
              >
                <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#079447] text-xs font-bold text-white">
                  <img
                    src={getProfileImage()}
                    alt={session.user.name || "User"}
                    className="h-full w-full object-cover"
                  />
                </div>

                <span className="text-sm font-semibold text-[#172019]">
                  {session.user.name}
                </span>

                <svg
                  className={`h-4 w-4 text-gray-500 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-64 rounded-2xl border border-gray-100 bg-white py-3 shadow-lg">
                  <div className="border-b border-gray-100 px-4 pb-3">
                    <p className="text-sm font-bold text-gray-900">
                      {session.user.name}
                    </p>

                    <p className="truncate text-xs text-gray-400">
                      {session.user.email}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                    >
                      <span className="text-[#079447]">👤</span>
                      <span>আমার প্রোফাইল</span>
                    </Link>

                    <button
                      type="button"
                      onClick={async () => {
                        setIsOpen(false);
                        await authClient.signOut();
                      }}
                      className="flex w-full cursor-pointer items-center gap-2.5 px-4 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
                    >
                      <span>↪</span>
                      <span>সাইন আউট</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                সাইন ইন
              </Link>

              <Link
                href="/sign-up"
                className="rounded-lg bg-[#079447] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#057b3b]"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-[#eef1ef]">
        <nav className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-100 hover:text-[#079447]"
            >
              <span>{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

