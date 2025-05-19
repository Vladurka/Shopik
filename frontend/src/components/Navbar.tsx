import { SignOutButton, useAuth, UserButton } from "@clerk/clerk-react";
import {
  HistoryIcon,
  LayoutDashboard,
  Menu,
  ShoppingCart,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SignInOAuthButton } from "./SignInOAuthButton";
import { motion } from "framer-motion";
import { useAdminStore } from "@/stores/useAdminStore";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Navbar = () => {
  const { isSignedIn } = useAuth();
  const { isAdmin } = useAdminStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(location.search);

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    navigate(`/products?${params.toString()}`);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 bg-zinc-900 shadow-md h-20 px-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative flex justify-between items-center h-full">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-40 lg:w-40"
            />
          </Link>
          <UserButton />
        </div>

        <Link
          to="/products"
          className="absolute left-1/2 transform -translate-x-1/2 font-bold text-xl text-white transition-transform duration-300 hover:scale-110 hover:text-blue-300 cursor-pointer"
        >
          Discover The Shop!
        </Link>

        <div className="hidden md:flex items-center gap-6 text-white">
          {isSignedIn ? (
            <>
              {isAdmin && (
                <Link to="/dashboard">
                  <button className="flex items-center gap-2 px-4 py-2 bg-zinc-500 text-white font-semibold rounded-lg hover:bg-zinc-600 transition">
                    Dashboard
                    <LayoutDashboard size={18} />
                  </button>
                </Link>
              )}
              <form className="my-4" onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border border-zinc-600 rounded-lg px-4 py-2 w-full"
                />
              </form>
              <Link to="/cart">
                <ShoppingCart />
              </Link>
              <Link to={"/history"}>
                <HistoryIcon />
              </Link>
            </>
          ) : (
            <SignInOAuthButton />
          )}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-zinc-800 p-4 rounded-lg text-center text-white">
          {isSignedIn ? (
            <>
              {isAdmin && (
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                Cart
              </Link>
              <Link to="/history" onClick={() => setIsMobileMenuOpen(false)}>
                History
              </Link>
              <SignOutButton />
            </>
          ) : (
            <SignInOAuthButton />
          )}
        </div>
      )}
    </motion.nav>
  );
};
