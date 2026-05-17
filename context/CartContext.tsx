"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);

  // 1. Ürün Silme Fonksiyonu
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  // 2. Adet Güncelleme Fonksiyonu (+ / -)
  const updateQuantity = (productId: number, amount: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          const newQuantity = (item.quantity || 1) + amount;
          // Adet 1'den az olamaz
          return { ...item, quantity: newQuantity < 1 ? 1 : newQuantity };
        }
        return item;
      })
    );
  };

  // Sepete Ekleme (Geliştirilmiş: Aynı ürün varsa adedi artırır)
  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Sepeti Tamamen Temizleme
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);