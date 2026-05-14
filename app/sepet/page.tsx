"use client";
import { useCart } from "@/context/CartContext";

export default function Sepet() {
  const { cart } = useCart();
  const toplam = cart.reduce((acc: number, item: any) => acc + parseInt(item.fiyat.replace(/\D/g,'')), 0);

  return (
    <div className="p-20 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-10">Sepetiniz</h1>
      {cart.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            {cart.map((item: any, i: number) => (
              <div key={i} className="flex justify-between bg-white/5 p-4 rounded-xl">
                <span>{item.isim}</span>
                <span className="text-yellow-500">{item.fiyat}</span>
              </div>
            ))}
            <div className="text-2xl font-bold border-t pt-4">Toplam: {toplam.toLocaleString()} TL</div>
          </div>

          <div className="bg-zinc-900 p-6 rounded-2xl border border-yellow-500/20">
            <h2 className="font-bold mb-4">Ödeme: Havale / EFT</h2>
            <p className="text-xs text-zinc-400 mb-4 italic">Kuveyt Türk hesabımıza ödeme yaptıktan sonra siparişiniz onaylanacaktır.</p>
            <div className="bg-black p-4 rounded-lg text-sm space-y-2 border border-white/5">
              <p><strong>Alıcı:</strong> YUNUS EMRE YILDIRIM</p>
              <p className="text-[11px]"><strong>IBAN:</strong> TR57 0020 5000 0981 4891 2000 01</p>
            </div>
            <button className="w-full bg-yellow-500 text-black font-black py-4 rounded-xl mt-6">SİPARİŞİ ONAYLA</button>
          </div>
        </div>
      )}
    </div>
  );
}