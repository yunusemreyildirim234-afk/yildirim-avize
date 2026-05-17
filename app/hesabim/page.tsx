"use client";
import { useState } from "react";

export default function HesabimGiris() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl">
        <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter text-center">
          {isLogin ? "Giriş Yap" : "Kayıt Ol"}
        </h2>
        
        <form className="space-y-4">
          {!isLogin && (
            <input type="text" placeholder="Ad Soyad" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-yellow-500 transition-all" />
          )}
          <input type="email" placeholder="E-posta" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-yellow-500 transition-all" />
          <input type="password" placeholder="Şifre" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-yellow-500 transition-all" />
          
          <button type="submit" className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-yellow-500 transition-all uppercase mt-4">
            {isLogin ? "Giriş Yap" : "Hesap Oluştur"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-zinc-500 text-sm hover:text-white transition-colors">
            {isLogin ? "Henüz hesabın yok mu? Kayıt Ol" : "Zaten üye misin? Giriş Yap"}
          </button>
        </div>
      </div>
    </div>
  );
}