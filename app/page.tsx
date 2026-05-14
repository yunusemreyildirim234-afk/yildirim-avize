"use client";

import { useCart } from "@/context/CartContext";
import { urunler } from "./urunler";

export default function Home() {
  const { addToCart } = useCart();

  return (
    <main className="relative min-h-[200vh]">
      
      {/* 1. SABİT ANA EKRAN GÖRSELİ */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/anaekran.jpg')",
          filter: "none" 
        }}
      />

      {/* 2. BOŞLUK KATMANI: İlk açılışta ekranın temiz kalmasını sağlar */}
      <div className="h-screen w-full relative z-10 pointer-events-none">
        {/* Kullanıcı burayı geçtiğinde ürünleri görecek */}
      </div>

      {/* 3. İÇERİK KATMANI: Kaydırdıkça ürünlerin geldiği alan */}
      <div className="relative z-20 bg-gradient-to-t from-black via-black/90 to-transparent pt-20">
        
        {/* Çok Satanlar Başlığı */}
        <div className="max-w-7xl mx-auto px-10 mb-12">
          <h2 className="text-4xl font-black text-white tracking-widest uppercase border-l-4 border-yellow-500 pl-4">
            Çok <span className="text-yellow-500">Satanlar</span>
          </h2>
          <p className="text-zinc-400 mt-2 text-sm italic">Yıldırım Avize'nin en çok tercih edilen kristal şaheserleri.</p>
        </div>

        {/* Ürünler Grid Yapısı */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10 pb-40">
          {urunler.slice(0, 3).map((urun) => (
            <div key={urun.id} className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-yellow-400 transition-all duration-500 group shadow-2xl">
              
              {/* Ürün Resmi */}
              <div className="h-80 overflow-hidden bg-white/5">
                <img 
                  src={urun.resim} 
                  alt={urun.isim} 
                  className="w-full h-full object-contain group-hover:scale-105 transition duration-700 p-4"
                />
              </div>
              
              {/* Ürün Bilgileri */}
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 text-white min-h-[3.5rem] leading-tight">
                  {urun.isim}
                </h3>
                <p className="text-zinc-400 text-xs mb-6 leading-relaxed line-clamp-3">
                  {urun.aciklama}
                </p>
                
                {/* Alt Kısım: Fiyat ve Ekle Butonu */}
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <span className="text-2xl font-black text-yellow-500 tracking-tighter">{urun.fiyat}</span>
                  <button 
                    onClick={() => addToCart(urun)}
                    className="bg-white text-black px-5 py-2.5 rounded-xl font-black text-xs hover:bg-yellow-400 transition-all transform active:scale-95 uppercase shadow-lg shadow-white/5"
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </main>
  );
}