import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useCartStore } from "@/stores/useCartStore";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import Confetti from "react-confetti";

export const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const clearCart = useCartStore((state) => state.clearCart);
  const { user } = useUser();

  const [orderId, setOrderId] = useState<string | null>(null);
  const executedRef = useRef(false);

  useEffect(() => {
    if (!user || !sessionId || executedRef.current) return;

    const handleCheckoutSuccess = async () => {
      try {
        const result = await axiosInstance.post("/payments/checkout-success", {
          sessionId,
        });
        setOrderId(result.data.order);
        await clearCart(user.id);
        executedRef.current = true;
      } catch (error) {
        console.error("Checkout success error:", error);
      }
    };

    handleCheckoutSuccess();
  }, [user, clearCart, sessionId]);

  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={300}
      />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-zinc-800 text-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center border border-zinc-700"
        >
          <CheckCircle className="mx-auto text-green-400 w-16 h-16 mb-4" />
          <h1 className="text-3xl font-extrabold mb-2">Payment Successful</h1>

          {orderId && (
            <p className="text-sm text-zinc-400 mb-2">
              Order ID: <span className="font-mono">{orderId}</span>
            </p>
          )}

          <p className="text-zinc-300 mb-6">Thank you for your purchase 🎉</p>

          <button
            onClick={() => (window.location.href = "/products")}
            className="bg-green-500 hover:bg-green-600 transition-colors text-white font-semibold px-6 py-2 rounded-lg cursor-pointer"
          >
            Back to Shop
          </button>
        </motion.div>
      </div>
    </>
  );
};
