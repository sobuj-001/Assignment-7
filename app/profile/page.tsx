"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return <div className="text-center py-20">লোড হচ্ছে...</div>;
  }

  if (!session) {
    return null;
  }

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F7F4] py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
          <p className="text-sm text-gray-600">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden relative">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-emerald-600 text-white font-bold text-xl">
                  {session.user.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{session.user.name}</h2>
              <p className="text-sm text-gray-500">{session.user.email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            সাইন আউট
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold text-gray-900">তথ্য</h3>
            
            <Link
              href="/profile/update"
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              তথ্য আপডেট করুন
            </Link>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">নাম</label>
            <input
              type="text"
              readOnly
              value={session.user.name}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}