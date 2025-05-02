import {
  SignedOut,
  SignedIn,
  SignOutButton,
  useAuth,
  useUser,
} from "@clerk/clerk-react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { SignInOAuthButton } from "./SignInOAuthButton";

export const Navbar = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 bg-zinc-900 shadow-md h-25">
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
        <Link to={`/cart/${user?.id}`}>
          <ShoppingCart />
        </Link>
      ) : (
        <SignInOAuthButton />
      )}
    </nav>
  );
};
