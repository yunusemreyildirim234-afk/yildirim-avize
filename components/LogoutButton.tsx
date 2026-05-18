"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/giris" })}
      className="text-red-500 hover:text-red-400 block text-xs py-1 w-full text-left font-bold transition-colors"
    >
      Çıkış Yap
    </button>
  );
}