"use client";
import { useState } from "react";

export default function Siparislerim() {
  // İptal edilen siparişlerin ID'lerini tutan state
  const [iptalEdilenler, setIptalEdilenler] = useState<string[]>([]);

  const [siparisler] = useState([
    {
      id: "ORD-9821",
      tarih: "14 Mayıs 2026",
      toplam: "14.099 TL",
      durum: "Havale Bekliyor",
      urun: "Kontes 6'lı Eskitme Avize - Üçgen Sarkıt Taşlı",
      resim: "/avize1.jpg"
    }
    // ... diğer siparişler
  ]);

  const iptalTalebiGonder = (id: string) => {
    if (iptalEdilenler.includes(id)) {
      alert("Bu sipariş için zaten bir iptal talebi gönderildi.");
      return;
    }

    const onay = confirm(`${id} numaralı siparişiniz için iptal talebi oluşturulsun mu?`);
    if (onay) {
      setIptalEdilenler((prev) => [...prev, id]);
      alert("İptal talebiniz Yunus Emre Yıldırım'a iletildi.");
    }
  };

  return (
    <div className="p-10 pt-32 min-h-screen bg-black">
      <div className="max-w-5xl mx-auto text-white">
        <h1 className="text-4xl font-black mb-10">Sipariş <span className="text-yellow-500">Geçmişim</span></h1>
        
        <div className="space-y-6">
          {siparisler.map((siparis) => {
            const isIptalGonderildi = iptalEdilenler.includes(siparis.id);
            return (
              <div key={siparis.id} className="bg-zinc-900/40 p-8 rounded-[2rem] border border-white/10 flex flex-col md:flex-row items-center gap-8">
                <img src={siparis.resim} className="w-32 h-32 object-contain bg-white rounded-2xl p-2" />
                <div className="flex-grow">
                  <h3 className="text-lg font-bold">{siparis.urun}</h3>
                  <p className="text-yellow-500 font-black">{siparis.toplam}</p>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <div className="bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase">
                    {isIptalGonderildi ? "İPTAL TALEBİ ALINDI" : siparis.durum}
                  </div>
                  
                  <button 
                    onClick={() => iptalTalebiGonder(siparis.id)}
                    className={`text-[10px] px-4 py-2 rounded-lg font-black uppercase transition-all ${
                      isIptalGonderildi 
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700" 
                      : "text-red-500 border border-red-500/20 hover:border-red-500"
                    }`}
                  >
                    {isIptalGonderildi ? "Talebiniz Gönderildi" : "İptal Talebi Gönder"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}