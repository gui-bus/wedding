"use client";
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
export function clientAuth() {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!apiKey || !authDomain || !projectId)
    throw new Error("Configure o Firebase seguindo docs/COMO-USAR.md.");
  const app =
    getApps().find((a) => a.name === "wedding-client") ??
    initializeApp({ apiKey, authDomain, projectId }, "wedding-client");
  return getAuth(app);
}
