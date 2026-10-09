"use client";

import { bazarData } from "@/data/bazarData";
import { useParams, notFound } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";

function CategoryContent() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [sortOrder, setSortOrder] = useState("default");

  const { categories, products } = bazarData;

  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    notFound();
  }

  const filteredProducts = products.filter(
    (product) => product.category === category.slug
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low-high") {
      return a.today - b.today;
    } else if (sortOrder === "high-low") {
      return b.today - a.today;
    }
    return 0;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-emerald-50 flex items-center justify-center text-3xl">
          {category.icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{category.nameBn}</h1>
          <p className="text-sm text-gray-500">
            {filteredProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <span className="text-sm text-gray-600">
          মোট {filteredProducts.length}টি পণ্য দেখানো হচ্ছে
        </span>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span>সাজান:</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 focus:outline-none cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">কম দাম থেকে বেশি</option>
            <option value="high-low">বেশি দাম থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-3 block transition hover:shadow-md hover:border-emerald-100 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{product.categoryIcon}</span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-md ${
                  product.change.dir === "up"
                    ? "text-red-500 bg-red-50"
                    : product.change.dir === "down"
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-gray-500 bg-gray-50"
                }`}
              >
                {product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "●"}{" "}
                {Math.abs(product.change.pct)}%
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">{product.nameBn}</h3>
              <p className="text-xs text-gray-400">
                প্রতি {product.unit === "kg" ? "কেজি" : "লিটার"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">আজকের দাম</p>
              <p className="text-lg font-bold text-gray-900">
                {product.today} টাকা
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-[#F4F7F4] py-8 px-4">
      <Suspense fallback={<div className="text-center py-20 text-gray-500">লোড হচ্ছে...</div>}>
        <CategoryContent />
      </Suspense>
    </div>
  );
}