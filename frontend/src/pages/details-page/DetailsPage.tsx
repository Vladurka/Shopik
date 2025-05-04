import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductStore } from "@/stores/useProductStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useAuth, useUser } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useReviewStore } from "@/stores/useReviewsStore";
import { ReviewOutput } from "@/types";
import { useCartStore } from "@/stores/useCartStore";
import { motion } from "framer-motion";

export const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState("");

  const { user } = useUser();
  const { isSignedIn } = useAuth();

  const fetchProduct = useProductStore((state) => state.fetchProduct);
  const currentProduct = useProductStore((state) => state.currentProduct);

  const submitReview = useReviewStore((state) => state.addReview);

  const addToCart = useCartStore((state) => state.addItem);
  const checkItem = useCartStore((state) => state.checkItem);
  const isAdded = useCartStore((state) => state.isAdded);

  useEffect(() => {
    if (id) fetchProduct(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, fetchProduct]);

  useEffect(() => {
    if (user?.id && currentProduct?._id) {
      checkItem(user.id, currentProduct._id);
    }
  }, [user?.id, currentProduct?._id, checkItem]);

  if (!currentProduct) {
    return <div className="p-4 text-center">Product not found.</div>;
  }

  const handleAddToCart = async () => {
    if (!user) return;
    await addToCart(user.id, currentProduct._id);
    await checkItem(user.id, currentProduct._id);
  };

  const handleAddReview = async () => {
    if (!user?.id || !currentProduct?._id || !message.trim()) return;

    await submitReview({
      message,
      productId: currentProduct._id,
      senderId: user.id,
    });

    setMessage("");
    await fetchProduct(currentProduct._id);
  };

  const {
    name,
    price,
    imageUrl,
    description,
    brand,
    quantity,
    rating,
    reviews,
  } = currentProduct;

  return (
    <>
      <Navbar />
      <motion.div
        className="min-h-screen py-40"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <div className="max-w-5xl mx-auto bg-zinc-900 rounded-xl shadow-md overflow-hidden md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="w-full h-150 object-contain rounded-md bg-zinc-950"
              src={imageUrl}
              alt={name}
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="uppercase tracking-wide text-sm font-semibold">
              {brand}
            </div>
            <h1 className="block mt-1 text-4xl leading-tight font-bold">
              {name}
            </h1>
            <p className="mt-2">{description}</p>

            <div className="mt-4 text-2xl font-semibold">${price}</div>

            <ul className="mt-4 space-y-1">
              <li>
                <strong>{quantity > 0 ? "In stock:" : "Out of stock!"}</strong>
                {quantity > 0 && ` ${quantity}`}
              </li>
              {rating !== undefined && (
                <li>
                  <strong>Rating: </strong>
                  {rating}
                </li>
              )}
            </ul>

            <Button
              className="mt-4 w-1/2 cursor-pointer"
              disabled={quantity <= 0 || !isSignedIn || !user || isAdded}
              onClick={handleAddToCart}
            >
              {isAdded ? "In The Cart" : "Add to cart"}{" "}
              <ShoppingCart className="ml-2" />
            </Button>

            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">Reviews</h2>
              <ScrollArea className="bg-zinc-800 rounded-lg p-4 h-28">
                <div className="space-y-2">
                  {reviews && reviews.length > 0 ? (
                    reviews.map((review: ReviewOutput) => (
                      <div
                        key={review._id}
                        className="border border-white rounded-lg p-2 space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <img
                            src={review.sender.imageUrl}
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="font-bold mt-0.5">
                            {review.sender.fullName}
                          </span>
                        </div>
                        <p className="text-sm text-white">{review.message}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-white text-sm italic opacity-60">
                      No reviews yet
                    </p>
                  )}
                </div>
              </ScrollArea>

              <div className="mt-4">
                <input
                  type="text"
                  maxLength={50}
                  placeholder="Write your review..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border rounded-lg bg-zinc-700 text-white"
                />
                <button
                  onClick={handleAddReview}
                  className="mt-2 px-4 py-2 bg-zinc-600 rounded-lg text-white font-bold hover:bg-zinc-700 cursor-pointer"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
