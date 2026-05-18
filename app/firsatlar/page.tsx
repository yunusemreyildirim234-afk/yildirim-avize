"use client";
import { useCart } from "@/context/CartContext";
import { urunler } from "../urunler";

export default function Firsatlar() {
  const { addToCart } = useCart();
  const firsatUrunleri = urunler.slice(0, 2);

  return (
    <div className="p-10 pt-32 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-widest">
          İndirimliler & <span className="text-yellow-500">Fırsatlar</span>
        </h1>
        <p className="text-zinc-500 mb-12 italic border-l-2 border-yellow-600 pl-4">
          Stoklarla sınırlı, kaçırılmayacak kristal avize fiyatları.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {firsatUrunleri.map((urun) => (
            <div key={urun.id} className="relative bg-zinc-900/50 backdrop-blur-xl border border-yellow-500/20 rounded-[2.5rem] overflow-hidden group shadow-2xl transition-all hover:border-yellow-500">
              <div className="absolute top-5 right-5 z-20 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-black animate-pulse">
                FIRSAT ÜRÜNÜ
              </div>
              <div className="h-80 overflow-hidden bg-white/5">
                <img src={urun.resim} alt={urun.isim} className="w-full h-full object-contain group-hover:scale-110 transition duration-700 p-6" />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-4">{urun.isim}</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-500 text-xs line-through">18.500 TL</p>
                    <p className="text-3xl font-black text-yellow-500 tracking-tighter">{urun.fiyat}</p>
                  </div>
                  <button
                    onClick={() => addToCart(urun)}
                    className="bg-white text-black px-6 py-3 rounded-2xl font-black text-xs hover:bg-yellow-500 transition-all uppercase"
                  >
                    Hemen Al
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}