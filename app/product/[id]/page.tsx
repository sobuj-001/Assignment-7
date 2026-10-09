
"use client";

import { bazarData } from "@/data/bazarData";
import { useParams, notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function ProductDetailContent() {
  const params = useParams();
  const idParam = params?.id as string;

  const { products } = bazarData;
  
  const product = products.find(
    (p) => String(p.id) === idParam || p.slug === idParam
  );

  if (!product) {
    notFound();
  }

  const basePrice = product.today;

  const regionalMarkets = [
    { market: "মাট বাজার", division: "ময়মনসিংহ", minOffset: -4, maxOffset: 3, avgOffset: -1 },
    { market: "সদর বাজার", division: "রাজশাহী", minOffset: -3, maxOffset: 4, avgOffset: 0 },
    { market: "বাজারহাট", division: "খুলনা", minOffset: -3, maxOffset: 5, avgOffset: 0.5 },
    { market: "বাসারহাট বাজার", division: "রাজশাহী", minOffset: -3, maxOffset: 6, avgOffset: 1 },
    { market: "চৌর বাজার", division: "ময়মনসিংহ", minOffset: -3, maxOffset: 7, avgOffset: 1.5 },
    { market: "আমতলী বাজার", division: "চট্টগ্রাম", minOffset: -2, maxOffset: 7, avgOffset: 2 },
    { market: "ডরলগট বাজার", division: "খুলনা", minOffset: -1, maxOffset: 7, avgOffset: 2.5 },
    { market: "চৌরাস্তা বাজার", division: "সিলেট", minOffset: 0, maxOffset: 9, avgOffset: 4 },
    { market: "গ্রীন মার্কেট, মিরপুর", division: "ঢাকা", minOffset: 1, maxOffset: 9, avgOffset: 4.5 },
    { market: "চৌধগ্রাম বাজার", division: "চট্টগ্রাম", minOffset: 0, maxOffset: 7, avgOffset: 5 },
    { market: "আমবাজার", division: "সিলেট", minOffset: 1, maxOffset: 7, avgOffset: 5.5 },
    { market: "কারওয়ান বাজার", division: "ঢাকা", minOffset: -1, maxOffset: 7, avgOffset: 6 },
  ].map((item) => ({
    market: item.market,
    division: item.division,
    min: basePrice + item.minOffset,
    max: basePrice + item.maxOffset,
    avg: (basePrice + item.avgOffset).toFixed(1),
  }));

  const minPrice = Math.min(...regionalMarkets.map((m) => m.min));
  const maxPrice = Math.max(...regionalMarkets.map((m) => m.max));

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/" className="hover:underline">হোম</Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="hover:underline">ক্যাটাগরি</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{product.nameBn}</span>
      </div>

      
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-50 text-4xl border border-gray-100">
            {product.categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.nameBn}</h1>
            <p className="text-xs text-gray-400 mt-1">
              প্রতি {product.unit === "kg" ? "কেজি" : "লিটার"} • {product.category}
            </p>
            <p className="text-xs font-medium text-gray-600 mt-2">
              বাজারের বর্তমান অবস্থা স্থিতিশীল রয়েছে
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-[#fafcfb] border border-gray-100 p-4 text-right min-w-160px">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-2xl font-extrabold text-gray-900 mt-0.5">
            {product.today}
          </p>
          <p className="text-xs text-gray-500">টাকা / {product.unit === "kg" ? "কেজি" : "লিটার"}</p>
          <div className="mt-1 flex items-center justify-end gap-1">
            <span
              className={`text-xs font-semibold ${
                product.change.dir === "up" ? "text-red-500" : "text-emerald-600"
              }`}
            >
              {product.change.dir === "up" ? "▲" : "▼"} {Math.abs(product.change.pct)}%
            </span>
          </div>
        </div>
      </div>

    
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-gray-50/70 p-4 border border-gray-100">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="text-lg font-bold text-emerald-600 mt-1">{minPrice} টাকা</p>
            <p className="text-[11px] text-gray-500 mt-1">সবচেয়ে কম দামের বাজার</p>
          </div>

          <div className="rounded-xl bg-gray-50/70 p-4 border border-gray-100">
            <p className="text-xs text-gray-500">সর্বাধিক দাম</p>
            <p className="text-lg font-bold text-red-500 mt-1">{maxPrice} টাকা</p>
            <p className="text-[11px] text-gray-500 mt-1">সবচেয়ে বেশি দামের বাজার</p>
          </div>

          <div className="rounded-xl bg-gray-50/70 p-4 border border-gray-100">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{product.today} টাকা</p>
            <p className="text-[11px] text-gray-500 mt-1">প্রতি একক-এর হিসাব</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs text-gray-500">
                <th className="py-3 font-semibold">বাজার</th>
                <th className="py-3 font-semibold">বিভাগ</th>
                <th className="py-3 font-semibold">সর্বনিম্ন</th>
                <th className="py-3 font-semibold">সর্বাধিক</th>
                <th className="py-3 font-semibold">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-800">
              {regionalMarkets.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="py-3.5 font-medium text-gray-900">{row.market}</td>
                  <td className="py-3.5 text-gray-600">{row.division}</td>
                  <td className="py-3.5">{row.min} টাকা</td>
                  <td className="py-3.5">{row.max} টাকা</td>
                  <td className="py-3.5 font-semibold text-gray-900">{row.avg} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <div className="min-h-screen bg-[#F4F7F4] py-8 px-4">
      <Suspense fallback={<div className="text-center py-20 text-gray-500">লোড হচ্ছে...</div>}>
        <ProductDetailContent />
      </Suspense>
    </div>
  );
}