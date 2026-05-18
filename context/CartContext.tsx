"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);
  const [yuklendi, setYuklendi] = useState(false);

  // Sayfa açılınca localStorage'dan yükle
  useEffect(() => {
    const saved = localStorage.getItem("yildirim-cart");
    if (saved) {
      try { setCart(JSON.parse(saved)); } catch {}
    }
    setYuklendi(true);
  }, []);

  // Sepet değişince localStorage'a kaydet
  useEffect(() => {
    if (yuklendi) {
      localStorage.setItem("yildirim-cart", JSON.stringify(cart));
    }
  }, [cart, yuklendi]);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, amount: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const newQty = (item.quantity || 1) + amount;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("yildirim-cart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);