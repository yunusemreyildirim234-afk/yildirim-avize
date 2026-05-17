"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function OdemePage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' veya 'havale'
  const [agreed, setAgreed] = useState(false);

  // Fiyat hesaplamaları
  const parsePrice = (priceStr: string) => parseInt(priceStr?.replace(/\D/g, "") || "0");
  const araToplam = cart.reduce((acc: number, item: any) => acc + parsePrice(item.fiyat) * (item.quantity || 1), 0);
  const kargoUcreti = araToplam > 5000 ? 0 : 150;
  const genelToplam = araToplam + kargoUcreti;

  const handleSiparisiTamamla = () => {
    if (!agreed) {
      alert("Lütfen mesafeli satış sözleşmesini onaylayın.");
      return;
    }
    
    // Gerçek PayTR entegrasyonunda burada backend'den token alınıp iFrame açılır.
    // Havale seçilirse direkt sipariş sonucuna gider.
    alert("Siparişiniz Yunus Emre Yıldırım'a iletildi! Yönlendiriliyorsunuz...");
    clearCart();
    router.push("/siparislerim");
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        
        {/* Adım Göstergesi */}
        <div className="flex items-center justify-center gap-4 mb-12 text-xs font-bold uppercase tracking-widest text-zinc-500">
          <span className="text-zinc-400">1. Adres Bilgileri</span>
          <span>→</span>
          <span className="text-yellow-500 border-b-2 border-yellow-500 pb-1">2. Ödeme Yöntemi</span>
          <span>→</span>
          <span>3. Onay</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* SOL TARAF: ÖDEME SEÇENEKLERİ */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Yöntem Seçici */}
            <div className="flex gap-4 p-2 bg-zinc-900/50 rounded-2xl border border-white/5">
              <button 
                onClick={() => setPaymentMethod("card")}
                className={`flex-1 py-4 rounded-xl font-bold text-xs uppercase tracking-tighter transition-all ${paymentMethod === 'card' ? 'bg-white text-black shadow-xl' : 'text-zinc-500 hover:text-white'}`}
              >
                Kredi Kartı / PayTR
              </button>
              <button 
                onClick={() => setPaymentMethod("havale")}
                className={`flex-1 py-4 rounded-xl font-bold text-xs uppercase tracking-tighter transition-all ${paymentMethod === 'havale' ? 'bg-white text-black shadow-xl' : 'text-zinc-500 hover:text-white'}`}
              >
                Havale / EFT
              </button>
            </div>

            {/* Kredi Kartı Ekranı */}
            {paymentMethod === "card" && (
              <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  Kredi Kartı Bilgileri
                </h3>
                {/* PayTR iFrame Gelecek Alan */}
                <div className="aspect-[16/9] bg-black/40 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-10">
                  <p className="text-zinc-500 text-sm mb-2 italic">PayTR Güvenli Ödeme Altyapısı Burada Yüklenecek.</p>
                  <p className="text-[10px] text-zinc-600 uppercase">SSL şifreleme aktif. Kart bilgileriniz kaydedilmez.</p>
                </div>
              </div>
            )}

            {/* Havale Ekranı */}
            {paymentMethod === "havale" && (
              <div className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md space-y-6">
                <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  Banka Hesap Bilgileri
                </h3>
                
                <div className="bg-black/50 p-6 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-zinc-500 text-xs">Banka</span>
                    <span className="font-bold">Kuveyt Türk</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-zinc-500 text-xs">Alıcı</span>
                    <span className="font-bold uppercase">Yunus Emre Yıldırım</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-zinc-500 text-xs">IBAN Numarası</span>
                    <span className="font-mono text-yellow-500 font-bold select-all tracking-wider text-sm md:text-base">
                      TR57 0020 5000 0981 4891 2000 01
                    </span>
                  </div>
                </div>

                <div className="bg-yellow-500/5 border border-yellow-500/20 p-4 rounded-xl italic text-[11px] text-yellow-500/80">
                  ⚠️ <strong>Önemli Hatırlatma:</strong> Lütfen havale açıklama kısmına <strong>Adınızı</strong> ve <strong>Sipariş Notunuzu</strong> yazmayı unutmayın. Ödemeniz onaylandığında siparişiniz imalata alınacaktır.
                </div>
              </div>
            )}
          </div>

          {/* SAĞ TARAF: ÖZET VE ONAY */}
          <div className="space-y-6">
            <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-white/10 sticky top-32">
              <h2 className="text-xl font-bold mb-6">Ödeme Özeti</h2>
              
              <div className="space-y-4 text-sm text-zinc-400 mb-8">
                <div className="flex justify-between">
                  <span>Toplam Ürün</span>
                  <span className="text-white">{araToplam.toLocaleString()} TL</span>
                </div>
                <div className="flex justify-between">
                  <span>Kargo</span>
                  <span className="text-white">{kargoUcreti === 0 ? "Ücretsiz" : `${kargoUcreti} TL`}</span>
                </div>
                <div className="border-t border-white/5 pt-4 flex justify-between text-2xl font-black text-yellow-500">
                  <span>Ödenecek</span>
                  <span>{genelToplam.toLocaleString()} TL</span>
                </div>
              </div>

              {/* YASAL METİNLER */}
              <div className="space-y-4 mb-8">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 accent-yellow-500" 
                  />
                  <span className="text-[10px] text-zinc-500 leading-tight group-hover:text-zinc-300 transition-colors">
                    <span className="text-white underline">Mesafeli Satış Sözleşmesi</span>'ni ve <span className="text-white underline">Ön Bilgilendirme Formu</span>'nu okudum, onaylıyorum.
                  </span>
                </label>
              </div>

              <button 
                onClick={handleSiparisiTamamla}
                className="w-full bg-yellow-500 text-black font-black py-4 rounded-xl hover:bg-yellow-400 transition-all uppercase shadow-lg active:scale-95"
              >
                Siparişi Onayla
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}