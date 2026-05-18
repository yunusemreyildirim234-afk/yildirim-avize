"use client";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { registerUser } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function KayitPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({ adSoyad: "", email: "", sifre: "" });
  const [yukleniyor, setYukleniyor] = useState(false);

  useEffect(() => {
    if (session) router.push("/hesabim");
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sifre) { alert("Lütfen bir şifre belirleyin."); return; }

    setYukleniyor(true);
    const result = await registerUser(formData);

    if (result.success) {
      alert("Yıldırım Avize'ye Hoş Geldiniz! Şimdi giriş yapabilirsiniz.");
      router.push("/giris");
    } else {
      alert("Bir hata oluştu. Bu e-posta zaten kayıtlı olabilir.");
    }
    setYukleniyor(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md bg-zinc-900/40 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-black text-white text-center mb-10 uppercase tracking-tighter">
          KAYIT <span className="text-yellow-500">OL</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" placeholder="Ad Soyad" required
            className="w-full bg-black/60 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-yellow-500 transition-all text-sm"
            onChange={(e) => setFormData({ ...formData, adSoyad: e.target.value })}
          />
          <input
            type="email" placeholder="E-posta" required
            className="w-full bg-black/60 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-yellow-500 transition-all text-sm"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password" placeholder="Şifre" required
            className="w-full bg-black/60 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-yellow-500 transition-all text-sm"
            onChange={(e) => setFormData({ ...formData, sifre: e.target.value })}
          />
          <button
            type="submit" disabled={yukleniyor}
            className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-yellow-500 transition-all uppercase mt-4 active:scale-95 disabled:opacity-50"
          >
            {yukleniyor ? "Oluşturuluyor..." : "HESAP OLUŞTUR"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-900 px-2 text-zinc-500 italic">Veya</span>
          </div>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/hesabim" })}
          className="w-full bg-zinc-800 text-white font-bold py-4 rounded-2xl hover:bg-zinc-700 transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          <img src="https://authjs.dev/img/providers/google.svg" className="w-5 h-5" alt="Google" />
          Google ile Devam Et
        </button>

        <p className="text-center text-zinc-500 text-xs mt-8">
          Zaten üye misin?
          <Link href="/giris" className="text-white hover:text-yellow-500 font-bold transition-all ml-1 underline underline-offset-4">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}