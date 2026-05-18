export default function Iletisim() {
  return (
    <div className="p-8 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">İletişim & Mağaza Konumu</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* İletişim Bilgileri */}
        <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-semibold border-b border-zinc-700 pb-2 text-yellow-500">Mağaza Bilgileri</h2>
          <p><strong>Adres:</strong> Tevfikiye Han, İskender Cad, Nazlı Hanım Sk. No:6 D:11, 34420 Beyoğlu/İstanbul</p>
          <p><strong>Telefon:</strong> 0537 211 42 23</p>
          <p><strong>E-posta:</strong> yunusemreyildirim234@gmail.com</p>
          <div className="mt-4">
            <h3 className="font-bold mb-2">Çalışma Saatleri</h3>
            <p className="text-sm text-zinc-400">Pazartesi - Cuma: 09:00 - 18:00</p>
            <p className="text-sm text-zinc-400">Cumartesi-Pazar: Kapalı</p>
          </div>
        </div>

        {/* Canlı Harita (Iframe) */}
        <div className="w-full h-80 rounded-2xl overflow-hidden border-2 border-zinc-800 shadow-2xl">
          <iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.91!2d28.970431!3d41.0266295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9e42b1fb257%3A0x74694d3a7e3391c3!2zWcSxbGTEsXLEsW0gQXZpemU!5e0!3m2!1str!2str!4v1715610000000!5m2!1str!2str" 
  width="100%" 
  height="100%" 
  style={{ border: 0 }} 
  allowFullScreen={true} 
  loading="lazy" 
  referrerPolicy="no-referrer-when-downgrade">
</iframe>
        </div>
      </div>
    </div>
  );
}