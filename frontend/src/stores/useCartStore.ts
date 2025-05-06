import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import { Cart } from "@/types";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";

export interface CartStore {
  cart: Cart | null;
  error: string | null;
  isAdded: boolean;
  isLoading: boolean;
  id: string;
  total: number;
  quantity: number;
  orderId: string;
  setId: (id: string) => void;
  getCart: () => Promise<void>;
  checkItem: (productId: string) => Promise<void>;
  addItem: (productId: string) => Promise<void>;
  deleteItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  checkOut: () => Promise<void>;
  checkOutSucceed: (sessionId: string) => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
  error: null,
  isAdded: false,
  isLoading: false,
  id: "",
  total: 0,
  quantity: 0,
  orderId: "",

  setId: (id: string) => set({ id }),

  getCart: async () => {
    set({ isLoading: true, error: null });
    const id = get().id;
    try {
      const { data } = await axiosInstance.get(`/cart/${id}`);
      set({
        cart: {
          id,
          items: data.cart,
        },
        total: data.cart.reduce(
          (acc: any, item: any) => acc + item.product.price * item.quantity,
          0
        ),
        quantity: data.cart.reduce(
          (acc: any, item: any) => acc + item.quantity,
          0
        ),
      });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  checkItem: async (productId: string) => {
    const id = get().id;
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.get(
        `/cart/isAdded/${id}/${productId}`
      );
      set({ isAdded: data.isAdded, error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (productId: string) => {
    const id = get().id;
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post("/cart", {
        id: id,
        productId: productId,
      });
      set({ isAdded: true });
      toast.success("Item added to cart");
    } catch (error: any) {
      set({ error: error.message });
      toast.error("Failed to add item to cart");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteItem: async (productId: string) => {
    const id = get().id;
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.patch("/cart", {
        id: id,
        productId: productId,
      });
      set({ cart: data.cart, error: null });
      toast.success("Item removed from cart");
    } catch (error: any) {
      set({ error: error.message });
      toast.error("Failed to remove item from cart");
    } finally {
      set({ isLoading: false });
    }
  },

  clearCart: async () => {
    const id = get().id;
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.delete(`/cart/${id}`);
      set({ cart: data.cart, error: null });
      toast.success("Cart cleared");
    } catch (error: any) {
      set({ error: error.message });
      toast.error("Failed to clear cart");
    } finally {
      set({ isLoading: false });
    }
  },
  checkOut: async () => {
    set({ isLoading: true, error: null });
    try {
      const stripePromise = loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!
      );

      const { cart, id } = get();

      const stripe = await stripePromise;
      const res = await axiosInstance.post(
        "/payments/create-checkout-session",
        {
          products: cart?.items,
          clerkId: id,
        }
      );
      const session = res.data;
      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });

      if (result?.error) {
        console.log(result.error.message);
      }
    } catch (error: any) {
      set({ error: error.message });
      toast.error("Failed to checkout. Check the quantity of items");
    } finally {
      set({ isLoading: false });
    }
  },

  checkOutSucceed: async (sessionId: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await axiosInstance.post("/payments/checkout-success", {
        sessionId,
      });
      set({ orderId: result.data.order });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
