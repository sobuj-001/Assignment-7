"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          setLoading(false);
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          setLoading(false);
          alert(ctx.error.message || "সাইন ইন করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
        },
      }
    );
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">সাইন ইন করুন</h2>
          <p className="text-xs text-gray-500">আপনার অ্যাকাউন্টে প্রবেশ করুন।</p>
        </div>

        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">ইমেল</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sobujchandra777@gmail.com"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#079447]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#079447]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#079447] hover:bg-[#057b3b] text-white py-2.5 rounded-xl font-semibold transition cursor-pointer text-sm shadow-sm disabled:opacity-50"
          >
            {loading ? "লগইন হচ্ছে..." : "সাইন ইন"}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <span className="bg-white px-3 text-xs text-gray-400 relative z-10">অথবা</span>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            className="flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            <span>Google</span> দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            className="flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            <span>GitHub</span> দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="text-xs text-center text-gray-500 mt-6">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/sign-up" className="text-[#079447] font-semibold hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
}
