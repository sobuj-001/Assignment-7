"use client";

import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState } from "react";
import { bazarData } from "@/data/bazarData";

function toBanglaNumber(value: number | string) {
  return String(value).replace(
    /\d/g,
    (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]
  );
}

function getUnitText(unit: string) {
  switch (unit) {
    case "kg":
      return "প্রতি কেজি";
    case "litre":
    case "liter":
      return "প্রতি লিটার";
    case "dozen":
      return "প্রতি ডজন";
    case "piece":
    case "pcs":
      return "প্রতি পিস";
    case "gram":
      return "প্রতি গ্রাম";
    case "packet":
      return "প্রতি প্যাকেট";
    default:
      return `প্রতি ${unit}`;
  }
}

function ProductCard({ product }: { product: any }) {
  const dir = product.change?.dir || "flat";
  const pct = Math.abs(product.change?.pct || 0);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block rounded-xl border border-[#e2e8e3] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f2f6f3] text-xl">
            {product.image || product.categoryIcon || "🛒"}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-[#172019]">
              {product.nameBn}
            </h3>

            <p className="text-[10px] text-gray-500">
              {getUnitText(product.unit)}
            </p>
          </div>
        </div>

        {dir === "up" && (
          <span className="shrink-0 rounded-full bg-[#fff1f1] px-2 py-1 text-[9px] font-bold text-red-500">
            ▲ {toBanglaNumber(pct.toFixed(1))}%
          </span>
        )}

        {dir === "down" && (
          <span className="shrink-0 rounded-full bg-[#effaf2] px-2 py-1 text-[9px] font-bold text-green-600">
            ▼ {toBanglaNumber(pct.toFixed(1))}%
          </span>
        )}

        {dir === "flat" && (
          <span className="shrink-0 rounded-full bg-[#f3f4f3] px-2 py-1 text-[9px] font-bold text-gray-500">
            — {toBanglaNumber(pct.toFixed(1))}%
          </span>
        )}
      </div>

      <div className="mt-3">
        <p className="text-[9px] text-gray-500">
          আজকের দাম
        </p>

        <p className="mt-0.5 text-sm font-extrabold text-[#172019]">
          {toBanglaNumber(product.today)}{" "}
          <span className="text-[9px] font-medium text-gray-500">
            টাকা
          </span>
        </p>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const { products } = bazarData;

  const [date, setDate] = useState("");
  const [dayName, setDayName] = useState("");

  useEffect(() => {
    const currentDate = new Date();

    setDate(
      currentDate.toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );

    setDayName(
      currentDate.toLocaleDateString("bn-BD", {
        weekday: "long",
      })
    );
  }, []);

  const risingProducts = [...products]
    .filter((product) => product.change?.dir === "up")
    .sort(
      (a, b) =>
        Math.abs(b.change.pct) - Math.abs(a.change.pct)
    )
    .slice(0, 6);

  const fallingProducts = [...products]
    .filter((product) => product.change?.dir === "down")
    .sort(
      (a, b) =>
        Math.abs(b.change.pct) - Math.abs(a.change.pct)
    )
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f5f8f5] text-[#172019]">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="relative overflow-hidden rounded-3xl border border-[#dce7de] bg-white">
          <div className="flex min-h-420px items-center px-6 py-12 md:px-12 lg:px-16">
            <div className="w-full md:w-1/2">
              <p className="text-sm font-semibold text-[#079447]">
                {dayName} • {date}
              </p>

              <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
                আজকের বাজারের দাম
                <br />
                এক নজরে
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 md:text-base">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর,
                সর্বনিম্ন-সর্বোচ্চ দাম এবং দামের পরিবর্তন এক নজরে দেখুন।
              </p>

              <a
                href="#সব-পণ্য"
                className="mt-7 inline-flex items-center rounded-xl bg-[#079447] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#057b3b]"
              >
                সব পণ্য দেখুন
                <span className="ml-2">↓</span>
              </a>
            </div>

            <div className="absolute bottom-0 right-0 hidden w-[45%] md:block lg:w-[40%]">
              <img
                src="/bazar-hero.png"
                alt="বাজারের সবজি"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-5">
        <div className="mb-4">
          <h2 className="text-base font-bold text-[#172019]">
            <span className="mr-1 text-red-500">▲</span>
            আজ দাম বেড়েছে
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {risingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-5">
        <div className="mb-4">
          <h2 className="text-base font-bold text-[#172019]">
            <span className="mr-1 text-green-600">▼</span>
            আজ দাম কমেছে
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fallingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <section
        id="সব-পণ্য"
        className="mx-auto max-w-7xl px-4 pb-12 pt-5"
      >
        <div className="mb-4">
          <h2 className="text-base font-bold text-[#172019]">
            সব পণ্য
          </h2>

          <p className="mt-1 text-[11px] text-gray-500">
            মোট ৩৩টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </main>
  );
}