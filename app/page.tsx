import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { bazarData } from "@/data/bazarData";

export default function HomePage() {
  const { products } = bazarData;

  return (
    <main className="min-h-screen bg-[#f5f8f5] text-[#172019]">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="relative flex min-h-300px items-center overflow-hidden rounded-2xl border border-[#dce7de] bg-white px-6 py-10 shadow-sm md:min-h-360px  md:px-12">
          <div className="relative z-10 max-w-xl">
            <div className="mb-5 inline-flex rounded-full bg-[#079447] px-5 py-2 text-xs font-bold text-white">
              আজকের বাজার
            </div>

            <h2 className="max-w-lg text-3xl font-extrabold leading-tight tracking-tight text-[#202b23] md:text-5xl">
              আজকের বাজারের দাম এক নজরে
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-600 md:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর,
              সর্বনিম্ন-সর্বোচ্চ দাম এবং পরিবর্তন এক নজরে দেখুন।
            </p>

            <Link
              href="#prices"
              className="mt-6 inline-flex rounded-lg bg-[#079447] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#057b3b]"
            >
              সব দাম দেখুন
            </Link>
          </div>

          <div className="absolute bottom-2 right-4 hidden w-64 md:block lg:right-12 lg:w-80">
            <img
              src="/bazar-hero.png"
              alt="বাজারের সবজি"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </section>

      <section
        id="prices"
        className="mx-auto max-w-7xl px-4 pb-12"
      >
        <div className="mb-5">
          <p className="text-sm font-semibold text-[#079447]">
            বাজারদর
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            আজকের পণ্যের দাম
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">
                  {product.image}
                </span>

                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
                  {product.unit === "kg" ? "কেজি" : "লিটার"}
                </span>
              </div>

              <h3 className="mt-4 font-bold">
                {product.nameBn}
              </h3>

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
