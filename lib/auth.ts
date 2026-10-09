

import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "sqlite.db");

export const auth = betterAuth({
  database: new Database(dbPath),
  secret: process.env.BETTER_AUTH_SECRET || "random_long_secret_key_here_at_least_32_characters",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
});