import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { cartApi } from "../store/api/cartApi.js";
import { getCartTotals } from "../utils/formatters.js";
import { normalizeProduct } from "../utils/productMapper.js";
import { useAuth } from "./useAuth.jsx";

const CartContext = createContext(null);
const STORAGE_KEY = "electrohub-cart";

function readLocalCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function mapApiCart(items) {
  return items.map((item) => ({
    ...normalizeProduct(item.product),
    quantity: item.quantity,
    backendItemId: item.id,
  }));
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState(readLocalCart);
  const [syncError, setSyncError] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!user) return;
    cartApi
      .list()
      .then((data) => {
        setItems(mapApiCart(data.items || []));
        setSyncError("");
      })
      .catch((err) => setSyncError(err.message));
  }, [user]);

  async function refreshCart() {
    if (!user) return;
    const data = await cartApi.list();
    setItems(mapApiCart(data.items || []));
  }

  async function addToCart(product, quantity = 1) {
    const normalized = normalizeProduct(product);
    setItems((current) => {
      const existing = current.find((item) => item.id === normalized.id);
      if (existing) {
        return current.map((item) =>
          item.id === normalized.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...current, { ...normalized, quantity }];
    });

    if (!user) return;
    try {
      await cartApi.add({ product_id: normalized.id, quantity });
      await refreshCart();
      setSyncError("");
    } catch (err) {
      setSyncError(err.message);
    }
  }

  async function updateQuantity(productId, quantity) {
    const nextQuantity = Math.max(1, quantity);
    const currentItem = items.find((item) => item.id === productId);
    setItems((current) => current.map((item) => (item.id === productId ? { ...item, quantity: nextQuantity } : item)));

    if (!user || !currentItem?.backendItemId) return;
    try {
      await cartApi.update(currentItem.backendItemId, { quantity: nextQuantity });
      setSyncError("");
    } catch (err) {
      setSyncError(err.message);
    }
  }

  async function removeFromCart(productId) {
    const currentItem = items.find((item) => item.id === productId);
    setItems((current) => current.filter((item) => item.id !== productId));

    if (!user || !currentItem?.backendItemId) return;
    try {
      await cartApi.remove(currentItem.backendItemId);
      setSyncError("");
    } catch (err) {
      setSyncError(err.message);
    }
  }

  function clearCart() {
    setItems([]);
  }

  const totals = useMemo(() => getCartTotals(items), [items]);
  const value = useMemo(
    () => ({ items, totals, syncError, addToCart, updateQuantity, removeFromCart, clearCart, refreshCart }),
    [items, totals, syncError]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
