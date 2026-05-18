"use client";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function GirisPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  // Zaten giriş yapmışsa hesabıma yönlendir
  useEffect(() => {
    if (session) router.push("/hesabim");
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setYukleniyor(true);
    setHata("");

    const result = await signIn("credentials", {
      email,
      password: sifre,
      redirect: false,
    });

    if (result?.error) {
      setHata("E-posta veya şifre hatalı.");
      setYukleniyor(false);
    } else {
      router.push("/hesabim");
    }
  };

  if (status === "loading") {
    return <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 animate-pulse">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md bg-zinc-900/40 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
        <h1 className="text-3xl font-black text-white text-center mb-10 uppercase tracking-tighter">
          GİRİŞ <span className="text-yellow-500">YAP</span>
        </h1>

        {hata && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl mb-4 text-center">
            {hata}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="E-posta"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/60 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-yellow-500 transition-all text-sm"
          />
          <input
            type="password"
            placeholder="Şifre"
            required
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            className="w-full bg-black/60 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-yellow-500 transition-all text-sm"
          />
          <button
            type="submit"
            disabled={yukleniyor}
            className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-yellow-500 transition-all uppercase mt-4 active:scale-95 disabled:opacity-50"
          >
            {yukleniyor ? "Giriş yapılıyor..." : "GİRİŞ YAP"}
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
          Hesabın yok mu?
          <Link href="/kayit" className="text-white hover:text-yellow-500 font-bold transition-all ml-1 underline underline-offset-4">
            Kayıt Ol
          </Link>
        </p>
      </div>
    </div>
  );
}