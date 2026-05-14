export default function YedekParca() {
  return (
    <div className="max-w-4xl mx-auto p-10 text-center mt-20 bg-black/40 rounded-3xl border border-zinc-800">
      <h1 className="text-3xl font-bold mb-6">Yedek Parça & Kristal Cam</h1>
      <p className="text-zinc-300 text-lg mb-8">
        İmalattan her türlü <strong>kristal avize taşı</strong> ve <strong>avize camı</strong> satışımız mevcuttur. 
        Özel renk ve formdaki taş siparişleriniz için lütfen teknik destek hattımızla iletişime geçiniz.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-zinc-900 rounded-xl">Kristal Taş İmalatı</div>
        <div className="p-4 bg-zinc-900 rounded-xl">Özel Renk Seçenekleri</div>
        <div className="p-4 bg-zinc-900 rounded-xl">Avize Cam Çeşitleri</div>
        <div className="p-4 bg-zinc-900 rounded-xl">Teknik Aksesuarlar</div>
      </div>
      <a href="https://wa.me/905372114223" className="btn btn-success mt-10">WhatsApp ile Parça Sor</a>
    </div>
  );
}