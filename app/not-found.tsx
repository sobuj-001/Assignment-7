
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center bg-[#f5f8f5] px-4 py-12 text-center">
      <div className="max-w-md rounded-2xl border border-[#dce7de] bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold text-[#079447]">৪০৪</h1>
        <h2 className="mt-4 text-xl font-bold text-[#172019]">
          পেইজটি খুঁজে পাওয়া যায়নি
        </h2>
        <p className="mt-2 text-xs text-gray-500">
          আপনি যে পেজটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে অথবা লিংকটি সঠিক নয়।
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="inline-block rounded-lg bg-[#079447] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#057b3b]"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}