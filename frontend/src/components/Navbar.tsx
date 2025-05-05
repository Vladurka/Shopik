import { SignedIn, SignOutButton, useAuth } from "@clerk/clerk-react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { SignInOAuthButton } from "./SignInOAuthButton";
import { motion } from "framer-motion";

export const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 bg-zinc-900 shadow-md h-25"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center">
        <Link to="/">
          <img src="/images/logo.png" alt="Logo" className="h-40 w-40" />
        </Link>

        <SignedIn>
          <SignOutButton>
            <button className="px-4 py-2 bg-zinc-500 text-white font-semibold rounded-lg hover:bg-zinc-600 transition-colors duration-300">
              Sign out
            </button>
          </SignOutButton>
        </SignedIn>
      </div>

      <Link
        to="/products"
        className="font-bold text-xl text-white transform transition-transform duration-300 hover:scale-110 hover:text-blue-300 cursor-pointer mr-60"
      >
        Discover The Shop!
      </Link>

      {isSignedIn ? (
        <Link to={"/cart"}>
          <ShoppingCart />
        </Link>
      ) : (
        <SignInOAuthButton />
      )}
    </motion.nav>
  );
};
