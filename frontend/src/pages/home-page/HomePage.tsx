import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const images = [
    { text: "New Collection", bg: "/images/new-collection.png" },
    { text: "Summer Style", bg: "/images/summer-style.png" },
    { text: "Casual Wear", bg: "/images/casual-wear.png" },
    { text: "Formal Looks", bg: "/images/formal-looks.png" },
    { text: "Street Fashion", bg: "/images/street-fashion.png" },
    { text: "Winter Collection", bg: "/images/winter-collection.png" },
  ];

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 pt-28">
        {images.map((item, index) => (
          <motion.div
            key={index}
            className="relative w-full h-80 rounded overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={item.bg}
              alt={item.text}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/60"></div>

            <Link to={`/products?tag=${item.text.replace(/\s+/g, "")}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-2xl font-bold transform transition-transform duration-300 group-hover:scale-110">
                  {item.text}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
};
