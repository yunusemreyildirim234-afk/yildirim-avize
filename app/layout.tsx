import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { CartProvider } from '@/context/CartContext'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${inter.className} min-h-screen text-white bg-black overflow-x-hidden flex flex-col`}>
        <CartProvider>
          <div className="flex-grow flex relative">
            
            {/* 1. SOL TARAF: LOGO VE ALT MENÜ OKU (Mobil Uyumlu) */}
            <aside className="fixed top-0 left-0 h-full z-[100] flex flex-col items-start p-6 group">
              <div className="flex flex-col items-center">
                <Link href="/" className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10 hover:border-yellow-500/50 transition-all duration-300 shadow-2xl mb-2">
                  <img src="/avizelogo.png" alt="Yıldırım Avize" className="w-20 h-auto" />
                </Link>
                
                {/* Sol Menü İçin Aşağı Ok (Mobilde görünür, desktopta hover tetikler) */}
                <div className="text-zinc-500 animate-bounce cursor-pointer group-hover:rotate-180 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Sol Menü Navigasyonu */}
              <nav className="hidden group-hover:flex flex-col gap-4 bg-black/90 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-5 duration-500 w-64 mt-2">
                <Link href="/urunler" className="hover:text-yellow-400 transition-colors py-1 text-sm font-medium border-b border-white/5">Tüm Ürünler</Link>
                <Link href="/avize-bolumu" className="hover:text-yellow-400 transition-colors py-1 text-sm font-medium border-b border-white/5">Avize Bölümü</Link>
                <Link href="/yedek-parca" className="hover:text-yellow-400 transition-colors py-1 text-sm font-medium border-b border-white/5">Yedek Parça & Cam</Link>
                <Link href="/firsatlar" className="text-yellow-600 hover:text-yellow-400 font-bold py-1 text-sm border-b border-white/5">İndirimliler</Link>
                <Link href="/hakkimizda" className="hover:text-yellow-400 transition-colors py-1 text-sm font-medium border-b border-white/5">Hakkımızda</Link>
                <Link href="/iletisim" className="hover:text-yellow-400 transition-colors py-1 text-sm font-medium text-">İletişim</Link>
              </nav>
            </aside>

            {/* 2. SAĞ ÜST: HESABIM VE OK İKONU (Mobil Destekli) */}
            <header className="fixed top-0 right-0 p-8 z-[110]">
              <div className="relative group flex flex-col items-center">
                <div className="flex flex-col items-center gap-1 cursor-pointer">
                  <Link href="/hesabim" className="btn btn-ghost btn-circle bg-black/50 backdrop-blur-md hover:bg-white/10 border border-white/10 shadow-xl transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </Link>
                  {/* Sağ Menü İçerik Oku */}
                  <div className="text-zinc-500 group-hover:rotate-180 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* Köprü alan ve Dropdown Menü */}
                <div className="hidden group-hover:block pt-2"> 
                  <ul className="p-4 bg-black/95 border border-white/10 rounded-2xl w-56 shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <li className="text-zinc-500 text-[10px] uppercase tracking-widest border-b border-white/5 pb-2">Hesap İşlemleri</li>
                    <li><Link href="/hesabim" className="hover:text-white block text-xs transition-colors">Profil & Ayarlar</Link></li>
                    <li><Link href="/siparislerim" className="hover:text-white block text-xs transition-colors">Siparişlerim</Link></li>
                    <li><Link href="/sepet" className="text-yellow-500 font-bold block text-xs hover:text-yellow-400">Sepetim</Link></li>
                    <li className="pt-2 border-t border-white/5">
                      <Link href="https://wa.me/905372114223" className="bg-green-600 text-white p-2 rounded-lg block text-center font-bold text-[10px] hover:bg-green-700 transition-all">
                        TEKNİK DESTEK
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </header>

            <main className="flex-1 min-h-screen">
              {children}
            </main>
          </div>

          {/* 3. EN ALT: BİLGİLENDİRMELER */}
          <footer className="bg-black border-t border-white/5 p-8 relative z-[40] text-xs">
             <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
                <div className="flex-1">
                  <h4 className="text-white font-bold mb-3 tracking-widest uppercase">Yıldırım Avize</h4>
                  <p className="text-zinc-500 leading-relaxed text-[11px]">
                    Kristal ve modern avize imalatında yarım asırlık tecrübe. Her renk ve formda kristal taş imalatı ve satışı yapılır.
                  </p>
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="text-white font-bold mb-3 uppercase tracking-widest text-[10px]">İletişim & Konum</h4>
                  <p className="text-zinc-400">Beyoğlu, İstanbul</p>
                  <p className="text-zinc-400 font-bold text-">0537 211 42 23</p>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-zinc-600 italic">© 2026 Yunus Emre Yıldırım</p>
                  <p className="text-emerald-600/80 mt-2 font-bold underline decoration-emerald-500/20 underline-offset-4">Kuveyt Türk Havale Aktif</p>
                </div>
             </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}