-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "musteriAd" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "sehir" TEXT NOT NULL,
    "ilce" TEXT NOT NULL,
    "adresDetay" TEXT NOT NULL,
    "siparisNotu" TEXT,
    "toplamFiyat" DOUBLE PRECISION NOT NULL,
    "durum" TEXT NOT NULL DEFAULT 'Beklemede',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
