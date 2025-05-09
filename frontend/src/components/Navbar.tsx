import { SignedIn, SignOutButton, useAuth } from "@clerk/clerk-react";
import { LayoutDashboard, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { SignInOAuthButton } from "./SignInOAuthButton";
import { motion } from "framer-motion";
import { useAdminStore } from "@/stores/useAdminStore";

export const Navbar = () => {
  const { isSignedIn } = useAuth();
  const { isAdmin } = useAdminStore();

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
            <button className="px-4 py-2 bg-zinc-500 text-white font-semibold rounded-lg hover:bg-zinc-600 transition-colors duration-300 cursor-pointer">
              Sign out
            </button>
          </SignOutButton>
        </SignedIn>
      </div>

      <Link
        to="/products"
        className="absolute left-1/2 transform -translate-x-1/2 font-bold text-xl text-white transition-transform duration-300 hover:scale-110 hover:text-blue-300 cursor-pointer"
      >
        Discover The Shop!
      </Link>
      {isSignedIn ? (
        <div className="flex items-center gap-10">
          {isAdmin && (
            <Link to={"/dashboard"}>
              <button className="flex items-center gap-3 px-4 py-2 bg-zinc-500 text-white font-semibold rounded-lg hover:bg-zinc-600 transition-colors duration-300 cursor-pointer">
                Dashboard
                <LayoutDashboard />
              </button>
            </Link>
          )}
          <Link to={"/cart"}>
            <ShoppingCart />
          </Link>
        </div>
      ) : (
        <SignInOAuthButton />
      )}
    </motion.nav>
  );
};
