

// import { betterAuth } from "better-auth";
// import Database from "better-sqlite3";
// import path from "path";

// const dbPath = path.join(process.cwd(), "sqlite.db");

// export const auth = betterAuth({
//   database: new Database(dbPath),
//   secret: process.env.BETTER_AUTH_SECRET || "random_long_secret_key_here_at_least_32_characters",
//   baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
//   emailAndPassword: {
//     enabled: true,
//   },
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     },
//     github: {
//       clientId: process.env.GITHUB_CLIENT_ID || "",
//       clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
//     },
//   },
// });
// import { betterAuth } from "better-auth";
// import Database from "better-sqlite3";
// import path from "path";

// const dbPath = path.join(process.cwd(), "sqlite.db");

// export const auth = betterAuth({
//   database: new Database(dbPath),
//   secret: process.env.BETTER_AUTH_SECRET || "random_long_secret_key_here_at_least_32_characters",
//   baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://assignment-7-fzq3.vercel.app",
//   emailAndPassword: {
//     enabled: true,
//   },
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     },
//     github: {
//       clientId: process.env.GITHUB_CLIENT_ID || "",
//       clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
//     },
//   },
// });

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@/lib/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),

  secret: process.env.BETTER_AUTH_SECRET!,

  baseURL:
    process.env.BETTER_AUTH_URL ||
    "http://localhost:3000",

  trustedOrigins: [
    "http://localhost:3000",
    "https://assignment-7-fzq3.vercel.app",
    "https://reliable-gelato-2931c9.netlify.app",
  ],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),

    ...(process.env.GITHUB_CLIENT_ID &&
    process.env.GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          },
        }
      : {}),
  },
});