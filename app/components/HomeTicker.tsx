
"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { bazarData } from "@/data/bazarData";

function TickerContent() {
  const pathname = usePathname();
  const { products } = bazarData;

  if (pathname !== "/") {
    return null;
  }

  return (
    <div className="overflow-hidden border-t border-[#eef1ef] bg-[#fafcfb]">
      <div className="ticker flex w-max">
        {[...products, ...products].map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex shrink-0 items-center gap-2 px-5 py-2 text-xs"
          >
            <span>{product.categoryIcon}</span>

            <span className="font-medium text-gray-700">
              {product.nameBn}
            </span>

            <span className="text-gray-500">
              ৳{product.today}/
              {product.unit === "kg" ? "কেজি" : "লিটার"}
            </span>

            <span
              className={
                product.change.dir === "up"
                  ? "font-semibold text-red-500"
                  : product.change.dir === "down"
                    ? "font-semibold text-green-600"
                    : "font-semibold text-gray-500"
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
        ))}
      </div>
    </div>
  );
}

export default function HomeTicker() {
  return (
    <Suspense fallback={null}>
      <TickerContent />
    </Suspense>
  );
}

