import { urunler } from "./urunler";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      {/* Başlık Bölümü */}
      <div className="flex flex-col items-center justify-center mb-16">
        <h1 className="text-6xl font-bold mb-4 tracking-tighter">
          YILDIRIM <span className="text-yellow-400">AVİZE</span>
        </h1>
        <p className="text-xl text-gray-400 text-center max-w-2xl">
          Aydınlık bir gelecek için modern tasarımlar.
        </p>
      </div>

      {/* Ürünler Listesi (Grid Yapısı) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {urunler.map((urun) => (
          <div key={urun.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-yellow-400 transition group">
            {/* Ürün Resmi */}
            <div className="h-64 overflow-hidden bg-white">
              <img 
                src={urun.resim} 
                alt={urun.isim} 
                className="w-full h-full object-contain group-hover:scale-110 transition duration-500"
              />
            </div>
            
            {/* Ürün Bilgileri */}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{urun.isim}</h2>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {urun.aciklama}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-yellow-400">{urun.fiyat}</span>
                <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-yellow-400 transition">
                  Sepete Ekle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}