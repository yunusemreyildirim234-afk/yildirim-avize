"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

export async function createOrder(formData: any, cartTotal: number) {
  try {
    const order = await db.order.create({
      data: {
        musteriAd: formData.adSoyad,
        telefon: formData.telefon,
        sehir: formData.sehir,
        ilce: formData.ilce,
        adresDetay: formData.adresDetay,
        siparisNotu: formData.siparisNotu || "",
        toplamFiyat: cartTotal,
        durum: "Beklemede"
      }
    });

    console.log("Yıldırım Avize - Yeni Sipariş:", order.id);
    revalidatePath("/siparislerim");
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Sipariş hatası:", error);
    return { success: false };
  }
}

export async function registerUser(formData: any) {
  const { adSoyad, email, sifre } = formData;

  try {
    const hashedPassword = await bcrypt.hash(sifre, 10);

    const user = await db.user.create({
      data: {
        name: adSoyad,
        email: email,
        password: hashedPassword,
      }
    });

    console.log("Yeni Üye Kaydı:", user.email);
    return { success: true };
  } catch (error) {
    console.error("Kayıt hatası:", error);
    return { success: false };
  }
}