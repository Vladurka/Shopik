import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProductStore } from "@/stores/useProductStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

export const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const currentProduct = useProductStore((state) => state.currentProduct);
  const fetchProduct = useProductStore((state) => state.fetchProduct);
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id, fetchProduct]);

  if (!currentProduct) {
    return <div className="p-4 text-center">Product not found.</div>;
  }

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
      <div className="min-h-screen py-40">
        <div className="max-w-5xl mx-auto bg-zinc-900 rounded-xl shadow-md overflow-hidden md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-96 w-full object-cover md:h-full md:w-96"
              src={imageUrl}
              alt={name}
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="uppercase tracking-wide text-sm font-semibold">
              {brand}
            </div>
            <h1 className="block mt-1 text-4xl leading-tight font-bold ">
              {name}
            </h1>
            <p className="mt-2">{description}</p>

            <div className="mt-4">
              <p className="text-2xl font-semibold">${price}</p>
            </div>

            <ul className="mt-4 space-y-1">
              <li>
                <strong>{quantity > 0 ? "In stock:" : "Out of stock !"}</strong>
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
              className="mt-4 w-1/2"
              disabled={quantity <= 0 || !isSignedIn}
            >
              Add to cart <ShoppingCart />
            </Button>

            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">Reviews</h2>
              <div className=" bg-zinc-800 rounded-lg p-4 space-y-2">
                <div className="border border-white rounded-lg p-2">
                  <div className="inline-flex gap-2">
                    <img
                      src={user?.imageUrl}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-bold mt-1">{user?.firstName}</span>
                  </div>
                  <p className="mt-2">Very good product!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
