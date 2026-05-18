"use client";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

export default function HesabimPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-500 animate-pulse text-sm">Yükleniyor...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-black text-white">Giriş Yapman Gerekiyor</h1>
          <p className="text-zinc-500 text-sm">Bu sayfayı görmek için hesabına giriş yap.</p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <Link href="/giris" className="w-full bg-white text-black font-black py-3 rounded-xl hover:bg-yellow-500 transition-all uppercase text-sm text-center">
              Giriş Yap
            </Link>
            <Link href="/kayit" className="w-full bg-zinc-900 text-white font-bold py-3 rounded-xl hover:bg-zinc-800 transition-all text-sm text-center border border-white/10">
              Kayıt Ol
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-2 uppercase tracking-widest">
          Hoş geldin, <span className="text-yellow-500">{session.user?.name?.split(" ")[0]}</span>
        </h1>
        <p className="text-zinc-500 text-sm mb-12">{session.user?.email}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/siparislerim" className="bg-zinc-900/50 border border-white/10 rounded-[2rem] p-8 hover:border-yellow-500/50 transition-all group">
            <div className="text-3xl mb-4">📦</div>
            <h3 className="font-black text-lg mb-1">Siparişlerim</h3>
            <p className="text-zinc-500 text-xs">Geçmiş ve aktif siparişlerin</p>
          </Link>

          <Link href="/hesabim/bilgilerim" className="bg-zinc-900/50 border border-white/10 rounded-[2rem] p-8 hover:border-yellow-500/50 transition-all group">
            <div className="text-3xl mb-4">👤</div>
            <h3 className="font-black text-lg mb-1">Hesap Bilgilerim</h3>
            <p className="text-zinc-500 text-xs">Ad, e-posta bilgilerini gör</p>
          </Link>

          <Link href="/sepet" className="bg-zinc-900/50 border border-white/10 rounded-[2rem] p-8 hover:border-yellow-500/50 transition-all group">
            <div className="text-3xl mb-4">🛒</div>
            <h3 className="font-black text-lg mb-1">Sepetim</h3>
            <p className="text-zinc-500 text-xs">Sepetindeki ürünleri görüntüle</p>
          </Link>
        </div>
      </div>
    </div>
  );
}