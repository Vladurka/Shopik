import { Navbar } from "@/components/Navbar";

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
      <div className="grid grid-cols-3 gap-4 p-4 pt-28">
        {images.map((item, index) => (
          <div
            key={index}
            className="relative w-full h-80 rounded overflow-hidden group"
          >
            <img
              src={item.bg}
              alt={item.text}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/60"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-2xl font-bold transform transition-transform duration-300 hover:scale-110 cursor-pointer">
                {item.text}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
