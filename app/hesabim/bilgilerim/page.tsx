"use client";
import { useSession } from "next-auth/react";

export default function HesapBilgileri() {
  const { data: session } = useSession();

  const formatTarih = (dateStr: string | null | undefined) => {
    if (!dateStr) return "Bilinmiyor";
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      day: "numeric", month: "long", year: "numeric"
    });
  };

  return (
    <div className="p-10 pt-32 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-black mb-8 uppercase tracking-widest border-l-4 border-yellow-500 pl-4">
        Hesap <span className="text-yellow-500">Bilgilerim</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-zinc-900/30 p-10 rounded-[2rem] border border-white/5 shadow-xl">
        <div className="space-y-2">
          <label className="text-zinc-500 text-xs uppercase tracking-widest">Ad Soyad</label>
          <p className="text-lg font-bold">{session?.user?.name ?? "—"}</p>
        </div>
        <div className="space-y-2">
          <label className="text-zinc-500 text-xs uppercase tracking-widest">E-posta Adresi</label>
          <p className="text-lg font-bold">{session?.user?.email ?? "—"}</p>
        </div>
        <div className="space-y-2">
          <label className="text-zinc-500 text-xs uppercase tracking-widest">Giriş Yöntemi</label>
          <p className="text-sm text-zinc-400 font-medium">
            {session?.user?.image ? "Google ile Giriş" : "E-posta & Şifre"}
          </p>
        </div>
        <div className="flex items-end">
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl text-xs font-bold transition-all border border-white/10">
            Şifre Değiştir
          </button>
        </div>
      </div>
    </div>
  );
}