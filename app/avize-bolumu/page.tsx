"use client";
import { useCart } from "@/context/CartContext";
import { urunler } from "../urunler";

export default function AvizeBolumu() {
  const { addToCart } = useCart();

  return (
    <div className="p-8 pt-32 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-white">Avize Bölümü</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {urunler.map((avize) => (
            <div key={avize.id} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all group">
              <div className="h-64 overflow-hidden bg-white/5">
                <img
                  src={avize.resim}
                  alt={avize.isim}
                  className="w-full h-full object-contain group-hover:scale-105 transition duration-700 p-4"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-white">{avize.isim}</h2>
                <p className="text-zinc-400 text-sm my-2">{avize.aciklama}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-extrabold text-yellow-500">{avize.fiyat}</span>
                  <button
                    onClick={() => addToCart(avize)}
                    className="bg-white text-black px-4 py-2 rounded-xl font-black text-xs hover:bg-yellow-500 transition-all uppercase"
                  >
                    Sepete Ekle
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