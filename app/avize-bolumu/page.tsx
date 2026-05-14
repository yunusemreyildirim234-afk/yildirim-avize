export default function AvizeBolumu() {
  const avizeler = [
    { id: 1, isim: "Kontes 6'lı Eskitme Avize", fiyat: "14.099 TL", resim: "/avize1.jpg", detay: "Üçgen sarkıt taşlı, lüks tasarım." },
    { id: 2, isim: "Paraşüt Sarkıt 6'lı Avize", fiyat: "14.499 TL", resim: "/avize2.jpg", detay: "Zarif paraşüt detaylı, eskitme gövde." },
    { id: 3, isim: "12'li Kontes (8+4) Çift Katlı", fiyat: "29.299 TL", resim: "/avize3.jpg", detay: "Geniş mekanlar için kristal şaheser." }
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-white">Avize Bölümü</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {avizeler.map((avize) => (
          <div key={avize.id} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all">
            <img src={avize.resim} alt={avize.isim} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold text-white">{avize.isim}</h2>
              <p className="text-zinc-400 text-sm my-2">{avize.detay}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-extrabold text-yellow-500">{avize.fiyat}</span>
                <button className="btn btn-sm btn-primary">Sepete Ekle</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}