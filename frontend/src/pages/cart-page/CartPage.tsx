import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCartStore } from "@/stores/useCartStore";
import { CartItem } from "@/types";
import { Navbar } from "@/components/Navbar";
import { Minus, Plus, Loader2 } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

export const CartPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getCart, addItem, deleteItem, cart, isLoading } = useCartStore();

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    if (id) getCart(id);
  }, [id, getCart]);

  useEffect(() => {
    if (cart?.items?.length) {
      const price = cart.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      const quantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

      setTotalPrice(price);
      setTotalQuantity(quantity);
    } else {
      setTotalPrice(0);
      setTotalQuantity(0);
    }
  }, [cart]);

  const handleAdd = async (productId: string) => {
    if (!id) return;
    await addItem(id, productId);
    await getCart(id);
  };

  const handleRemove = async (productId: string) => {
    if (!id) return;
    await deleteItem(id, productId);
    await getCart(id);
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const res = await axiosInstance.post("/payments/create-checkout-session", {
      products: cart?.items,
      clerkId: id,
    });
    const session = res.data;
    const result = await stripe?.redirectToCheckout({ sessionId: session.id });

    if (result?.error) {
      console.log(result.error.message);
    }
  };

  if (!id) return null;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  if (!cart) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto mt-28 space-y-10">
        <h1 className="text-4xl font-bold text-center text-white">Your Cart</h1>

        {Array.isArray(cart.items) && cart.items.length > 0 ? (
          <>
            <div className="space-y-6">
              {cart.items.map((item: CartItem) => (
                <motion.div
                  key={item.product._id}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
                  className="flex flex-col md:flex-row items-center gap-6 border border-zinc-700 rounded-xl p-4 bg-zinc-900 shadow-lg"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-32 h-32 rounded-md object-cover"
                  />

                  <div className="flex-1 text-white w-full md:w-auto">
                    <div className="text-sm text-zinc-400">
                      {item.product.brand}
                    </div>
                    <div className="text-lg font-semibold">
                      {item.product.name}
                    </div>
                    <div className="mt-1">
                      <span className="font-medium">Price:</span> $
                      {item.product.price}
                    </div>
                    <div className="mt-1">
                      <span className="font-medium">Total:</span> $
                      {(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-white">
                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="p-2 bg-zinc-700 rounded-full hover:bg-zinc-600 transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-2 text-lg">{item.quantity}</span>
                    <button
                      onClick={() => handleAdd(item.product._id)}
                      className="p-2 bg-zinc-700 rounded-full hover:bg-zinc-600 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex flex-col md:flex-row justify-between items-center text-white text-xl font-bold pt-6 border-t border-zinc-700"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <div>Total Items: {totalQuantity}</div>
              <div>Total Price: ${totalPrice.toFixed(2)}</div>
            </motion.div>
            <div className="flex justify-center gap-20">
              <Link to="/products">
                <button className="px-6 py-3 bg-zinc-700 text-white font-semibold rounded-lg hover:bg-zinc-600 transition-colors duration-300 cursor-pointer">
                  Continue Shopping
                </button>
              </Link>
              <button
                className="px-6 py-3 bg-zinc-700 text-white font-semibold rounded-lg hover:bg-zinc-600 transition-colors duration-300 cursor-pointer"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-white text-xl mt-16">
            Your cart is empty 😔
            <div className="mt-4">
              <Link to="/products">
                <button className="px-6 py-3 bg-zinc-700 text-white font-semibold rounded-lg hover:bg-zinc-600 transition-colors duration-300 cursor-pointer">
                  Back To The Shop
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
