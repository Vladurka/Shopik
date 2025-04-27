import { SignedOut, SignedIn, SignOutButton } from "@clerk/clerk-react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { SignInOAuthButton } from "./SignInOAuthButton";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 bg-zinc-900 shadow-md h-25">
      <div className="flex items-center">
        <Link to="/">
          <img src="/images/logo.png" alt="Logo" className="h-40 w-40" />
        </Link>

        <SignedOut>
          <SignInOAuthButton />
        </SignedOut>

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
        className="font-bold text-xl text-white transform transition-transform duration-300 hover:scale-110 hover:text-blue-300 cursor-pointer"
      >
        Discover The Shop!
      </Link>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-8 pr-4 py-1 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <ShoppingCart className="text-white" />
        <Heart className="text-white" />
      </div>
    </nav>
  );
};
