"use client";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { useState, useEffect } from "react";
import { bazarData } from "@/data/bazarData";


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

  return (
    <main className="min-h-screen bg-[#f5f8f5] text-[#172019]">
      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="relative overflow-hidden rounded-3xl border border-[#dce7de] bg-white">
          <div className="flex min-h-420px items-center px-6 py-12 md:px-12 lg:px-16">
            <div className="w-full md:w-1/2">
              <p className="text-sm font-semibold text-[#079447]">
                {dayName} • {date}
              </p>

              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-[#172019] md:text-5xl lg:text-6xl">
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
                <span className="ml-2"></span>
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

      <section id="সব-পণ্য" className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mb-5">
          <p className="text-sm font-semibold text-[#079447]">বাজারদর</p>

          <h2 className="mt-1 text-2xl font-bold">আজকের পণ্যের দাম</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{product.image}</span>

                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
                  {product.unit === "kg" ? "কেজি" : "লিটার"}
                </span>
              </div>

              <h3 className="mt-4 font-bold">{product.nameBn}</h3>

              <div className="mt-2 flex items-end justify-between">
                <div>
                  <span className="text-2xl font-extrabold">
                    ৳{product.today}
                  </span>

                  <span className="ml-1 text-xs text-gray-500">
                    /{product.unit === "kg" ? "কেজি" : "লিটার"}
                  </span>
                </div>

                <span
                  className={
                    product.change.dir === "up"
                      ? "text-sm font-semibold text-red-500"
                      : product.change.dir === "down"
                        ? "text-sm font-semibold text-green-600"
                        : "text-sm font-semibold text-gray-500"
                  }
                >
                  {product.change.dir === "up"
                    ? "▲"
                    : product.change.dir === "down"
                      ? "▼"
                      : "●"}{" "}
                  {Math.abs(product.change.pct)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
