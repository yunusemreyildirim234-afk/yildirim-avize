"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SepetPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  // Fiyatları sayıya çevirme fonksiyonu (Örn: "14.099 TL" -> 14099)
  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/\D/g, ""));
  };

  const araToplam = cart.reduce((acc: number, item: any) => acc + parsePrice(item.fiyat) * (item.quantity || 1), 0);
  const kargoUcreti = araToplam > 5000 || araToplam === 0 ? 0 : 150; // 5000 TL üzeri kargo bedava
  const genelToplam = araToplam + kargoUcreti;

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6 md:px-20 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black mb-10 tracking-widest border-l-4 border-yellow-500 pl-4 uppercase">
          Alışveriş <span className="text-yellow-500">Sepeti</span>
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/30 rounded-[2.5rem] border border-white/5">
            <p className="text-zinc-500 mb-6 text-lg">Sepetiniz şu anda boş.</p>
            <Link href="/urunler" className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-500 transition inline-block">
              Ürünleri İncele
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* 1. ÜRÜN LİSTESİ */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item: any) => (
                <div key={item.id} className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl">
                  <img src={item.resim} alt={item.isim} className="w-24 h-24 object-contain bg-white rounded-xl p-1" />
                  
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-lg font-bold mb-1 text-white">{item.isim}</h3>
                    <p className="text-yellow-500 font-black">{item.fiyat}</p>
                  </div>

                  {/* ADET KONTROLÜ (+ / -) */}
                  <div className="flex items-center gap-4 bg-black/50 p-2 rounded-xl border border-white/5">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)} 
                      className="w-8 h-8 flex items-center justify-center hover:text-yellow-500 font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="font-bold w-4 text-center">{item.quantity || 1}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)} 
                      className="w-8 h-8 flex items-center justify-center hover:text-yellow-500 font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* SİLME BUTONU */}
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="text-zinc-500 hover:text-red-500 transition-colors p-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* 2. SİPARİŞ ÖZETİ (SAĞ PANEL) */}
            <div className="bg-zinc-900/60 p-8 rounded-[2.5rem] border border-white/10 h-fit sticky top-32">
              <h2 className="text-xl font-bold mb-6 border-b border-white/5 pb-4 text-white">Sipariş Özeti</h2>
              
              <div className="space-y-4 text-sm text-zinc-400">
                <div className="flex justify-between">
                  <span>Ara Toplam</span>
                  <span className="text-white font-bold">{araToplam.toLocaleString()} TL</span>
                </div>
                <div className="flex justify-between">
                  <span>Kargo Ücreti</span>
                  <span className={kargoUcreti === 0 ? "text-green-500 font-bold" : "text-white"}>
                    {kargoUcreti === 0 ? "Ücretsiz" : `${kargoUcreti} TL`}
                  </span>
                </div>
                {kargoUcreti > 0 && (
                  <p className="text-[10px] text-yellow-500/70">5.000 TL üzeri kargo bedava!</p>
                )}
                <div className="border-t border-white/5 pt-4 flex justify-between text-xl font-black text-white">
                  <span>Toplam</span>
                  <span className="text-yellow-500">{genelToplam.toLocaleString()} TL</span>
                </div>
              </div>

              {/* SONRAKİ ADIMA GEÇİŞ */}
              <button 
                onClick={() => router.push("/sepet/adres")}
                className="w-full bg-yellow-500 text-black font-black py-4 rounded-xl mt-8 hover:bg-yellow-400 transition-all transform active:scale-95 uppercase shadow-lg"
              >
                Adres Bilgilerine Geç
              </button>
              
              <Link href="/urunler" className="block text-center mt-4 text-xs text-zinc-500 hover:text-white transition">
                ← Alışverişe Devam Et
              </Link>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}