import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import api from "../services/api";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  id_restaurante: number;
}

interface CartItem extends Produto {
  quantidade: number;
}

interface CartContextType {
  cart: CartItem[];
  adicionarProduto: (produto: Produto) => void;
  removerProduto: (id: number) => void;
  limparCarrinho: () => void;
  finalizarCompra: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const adicionarProduto = (produto: Produto) => {
    setCart((prev) => {
      const existente = prev.find((p) => p.id === produto.id);
      if (existente) {
        return prev.map((p) =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removerProduto = (id: number) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, quantidade: p.quantidade - 1 } : p
        )
        .filter((p) => p.quantidade > 0)
    );
  };

  const limparCarrinho = () => setCart([]);

  const finalizarCompra = async () => {
    try {
      const userId = Number(localStorage.getItem("id"));
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        console.error("Usuário não autenticado.");
        return;
      }

      const pedido = {
        userId,
        addressId: 1, // mock
        paymentId: 1, // mock
        items: cart.map((p) => ({
          productId: p.id,
          quantity: p.quantidade,
        })),
      };

      await api.post("/order", pedido, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      limparCarrinho();
      console.log("Compra finalizada com sucesso!");
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, adicionarProduto, removerProduto, limparCarrinho, finalizarCompra }}>
      {children}
    </CartContext.Provider>
  );
};