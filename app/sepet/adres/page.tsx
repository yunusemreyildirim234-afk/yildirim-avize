"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "@/app/actions"; // Server Action importu

export default function AdresPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Kayıt sırasında butonu kilitlemek için
  
  const [formData, setFormData] = useState({
    adSoyad: "",
    telefon: "",
    sehir: "",
    ilce: "",
    adresDetay: "",
    siparisNotu: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDevamEt = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Form verilerini Server Action'a gönderiyoruz
      const result = await createOrder(formData);
      
      if (result.success) {
        // SQL'e kayıt başarılıysa yönlendir
        router.push("/sepet/adres/odeme");
      } else {
        alert("Sipariş kaydedilirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Adım Göstergesi */}
        <div className="flex items-center justify-center gap-4 mb-12 text-xs font-bold uppercase tracking-widest text-zinc-500">
          <span className="text-yellow-500 border-b-2 border-yellow-500 pb-1">1. Adres Bilgileri</span>
          <span>→</span>
          <span className="opacity-50">2. Ödeme Yöntemi</span>
          <span>→</span>
          <span className="opacity-50">3. Onay</span>
        </div>

        <h1 className="text-3xl font-black mb-8 border-l-4 border-yellow-500 pl-4 uppercase">
          Kargo <span className="text-yellow-500">Adresi</span>
        </h1>

        <form onSubmit={handleDevamEt} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-900/40 p-8 md:p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
          <div className="space-y-2 col-span-2 md:col-span-1">
            <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">Ad Soyad</label>
            <input required name="adSoyad" onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-yellow-500 transition-all text-sm" placeholder="Müşteri adı" />
          </div>
          <div className="space-y-2 col-span-2 md:col-span-1">
            <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">Telefon</label>
            <input required name="telefon" type="tel" onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-yellow-500 transition-all text-sm" placeholder="Telefon" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">Şehir</label>
            <input required name="sehir" onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-yellow-500 transition-all text-sm" placeholder="Şehir" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">İlçe</label>
            <input required name="ilce" onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-yellow-500 transition-all text-sm" placeholder="İlçe" />
          </div>
          <div className="space-y-2 col-span-2">
            <label className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">Tam Adres</label>
            <textarea required name="adresDetay" onChange={handleChange} rows={3} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-yellow-500 transition-all text-sm resize-none" placeholder="Adres detayları"></textarea>
          </div>

          <div className="space-y-2 col-span-2">
            <label className="text-[10px] uppercase text-yellow-500 font-bold tracking-widest">Sipariş Notu (Opsiyonel)</label>
            <textarea name="siparisNotu" onChange={handleChange} rows={2} className="w-full bg-black/20 border border-yellow-500/10 p-4 rounded-xl outline-none focus:border-yellow-500 transition-all text-sm resize-none italic" placeholder="Örn: Kristal taşlar yedekli gelsin vb."></textarea>
          </div>

          <div className="col-span-2 pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-white text-black font-black py-4 rounded-xl hover:bg-yellow-400 transition-all uppercase shadow-lg active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? "Kaydediliyor..." : "Ödeme Adımına Geç →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}