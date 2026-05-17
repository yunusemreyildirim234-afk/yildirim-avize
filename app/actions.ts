"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function createOrder(formData: any) {
  try {
    const order = await prisma.order.create({
      data: {
        musteriAd: formData.adSoyad,
        telefon: formData.telefon,
        sehir: formData.sehir,
        ilce: formData.ilce,
        adresDetay: formData.adresDetay,
        siparisNotu: formData.siparisNotu || "",
        toplamFiyat: 1500.0, // Şimdilik elle yazdık, sonra sepetten çekeriz
        durum: "Beklemede"
      }
    })
    
    console.log("Sipariş başarıyla kaydedildi:", order.id)
    revalidatePath("/admin") // Admin sayfası yapınca orayı yenileyecek
    return { success: true, orderId: order.id }
  } catch (error) {
    console.error("Sipariş kaydedilirken hata oluştu:", error)
    return { success: false }
  }
}