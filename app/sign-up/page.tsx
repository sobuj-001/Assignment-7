"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/profile",
      });

      console.log("Auth Result:", result);

      if (result.error) {
        setError(result.error.message || "সাইন আপ করতে সমস্যা হয়েছে");
      } else {
        router.push("/profile");
        router.refresh();
      }
    } catch (err: any) {
      console.error("Catch Error:", err);
      setError(err?.message || "কোথাও কোনো ত্রুটি ঘটেছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/profile",
      });
    } catch (err) {
      console.error("Google Sign-in Error:", err);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/profile",
      });
    } catch (err) {
      console.error("GitHub Sign-in Error:", err);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f5f8f5] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[#dce7de] bg-white p-8 shadow-sm">
        <h1 className="text-center text-2xl font-bold text-[#172019]">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="mt-2 text-center text-xs text-gray-500">
          বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-xs text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700">নাম</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="যেমন: রহিম উদ্দিন"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#172019] focus:border-[#079447] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700">ইমেল</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#172019] focus:border-[#079447] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-[#172019] focus:border-[#079447] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#079447] py-3 text-sm font-semibold text-white transition hover:bg-[#057b3b] disabled:opacity-50"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="my-6 relative flex items-center justify-center">
          <div className="w-full border-t border-gray-200"></div>
          <span className="absolute bg-white px-3 text-xs text-gray-400">অথবা</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <span>Google দিয়ে চালিয়ে যান</span>
          </button>
          <button
            type="button"
            onClick={handleGithubSignIn}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/sign-in" className="text-[#079447] font-semibold hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}

