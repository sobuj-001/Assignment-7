"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    } else if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session, isPending, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authClient.updateUser({
        name: name,
      }, {
        onSuccess: () => {
          router.push("/profile");
          router.refresh();
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <div className="text-center py-20">লোড হচ্ছে...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F4F7F4] py-10 px-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">প্রোফাইল আপডেট করুন</h1>
          <p className="text-sm text-gray-600">আপনার নতুন নাম নিচের বক্সে লিখুন</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">নাম (Name)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "আপডেট হচ্ছে..." : "Update Information"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              বাতিল
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}