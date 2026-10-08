// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { bazarData } from "@/data/bazarData";

// export default function Navbar() {
//   const pathname = usePathname();
//   const { categories, products } = bazarData;

//   return (
//     <header className="border-b border-[#e5e9e6] bg-white">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
//         <Link href="/" className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#079447] text-xl">
//             🛒
//           </div>

//           <div>
//             <h1 className="text-lg font-extrabold leading-tight text-[#172019]">
//               বাজার দর
//             </h1>

//             <p className="text-[10px] text-gray-500">
//               চট্টগ্রাম, ৮ অক্টোবর, ২০২৬
//             </p>
//           </div>
//         </Link>

//         <div className="flex items-center gap-2">
//           <Link
//             href="/sign-in"
//             className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
//           >
//             সাইন ইন
//           </Link>

//           <Link
//             href="/sign-up"
//             className="rounded-lg bg-[#079447] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#057b3b]"
//           >
//             সাইন আপ
//           </Link>
//         </div>
//       </div>

//       <div className="border-t border-[#eef1ef]">
//         <nav className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2">
//           {categories.map((category) => {
//             const active = pathname === `/category/${category.slug}`;

//             return (
//               <Link
//                 key={category.id}
//                 href={`/category/${category.slug}`}
//                 className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition ${
//                   active
//                     ? "bg-[#e8f7ee] text-[#079447]"
//                     : "text-gray-600 hover:bg-gray-100 hover:text-[#079447]"
//                 }`}
//               >
//                 <span>{category.icon}</span>
//                 <span>{category.nameBn}</span>
//               </Link>
//             );
//           })}
//         </nav>
//       </div>

//       <div className="overflow-hidden border-t border-[#eef1ef] bg-[#fafcfb]">
//         <div className="price-ticker flex min-w-max gap-10 px-4 py-2">
//           {[...products, ...products].map((product, index) => (
//             <div
//               key={`${product.id}-${index}`}
//               className="flex items-center gap-2 text-xs"
//             >
//               <span>{product.categoryIcon}</span>

//               <span className="font-medium text-gray-700">
//                 {product.nameBn}
//               </span>

//               <span className="text-gray-500">
//                 ৳{product.today}/
//                 {product.unit === "kg" ? "কেজি" : "লিটার"}
//               </span>

//               <span
//                 className={
//                   product.change.dir === "up"
//                     ? "font-semibold text-red-500"
//                     : product.change.dir === "down"
//                       ? "font-semibold text-green-600"
//                       : "font-semibold text-gray-500"
//                 }
//               >
//                 {product.change.dir === "up"
//                   ? "▲"
//                   : product.change.dir === "down"
//                     ? "▼"
//                     : "●"}{" "}
//                 {Math.abs(product.change.pct)}%
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </header>
//   );
// }
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bazarData } from "@/data/bazarData";

export default function Navbar() {
  const pathname = usePathname();
  const { categories, products } = bazarData;

  return (
    <header className="border-b border-[#e5e9e6] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#079447] text-xl">
            🛒
          </div>

          <div>
            <h1 className="text-lg font-extrabold leading-tight text-[#172019]">
              বাজার দর
            </h1>

            <p className="text-[10px] text-gray-500">
              চট্টগ্রাম, ৮ অক্টোবর, ২০২৬
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="rounded-lg bg-[#079447] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#057b3b]"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      <div className="border-t border-[#eef1ef]">
        <nav className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2">
          {categories.map((category) => {
            const active = pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition ${
                  active
                    ? "bg-[#e8f7ee] text-[#079447]"
                    : "text-gray-600 hover:bg-gray-100 hover:text-[#079447]"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>

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
                ৳{product.today}/{product.unit === "kg" ? "কেজি" : "লিটার"}
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
    </header>
  );
}
