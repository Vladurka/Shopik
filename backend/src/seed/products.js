import mongoose from "mongoose";
import { config } from "dotenv";
import { Product } from "../models/product.model.js";

config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Product.deleteMany();

    await Product.insertMany([
      {
        name: "Nike Air Max 270",
        price: 150,
        imageUrl:
          "https://img01.ztat.net/article/spp-media-p1/49de00d062493d6abe74dcd3853d42f5/c97d9d3cf917411dafee5debcd54dc2f.jpg?imwidth=1800&filter=packshot",
        description: "Comfortable and stylish running shoes.",
        category: "Footwear",
        brand: "Nike",
        color: "Black",
        size: "42",
        gender: "Unisex",
        tag: "CasualWear",
        quantity: 100,
        rating: 4.5,
      },
      {
        name: "Adidas Ultraboost 21",
        price: 180,
        imageUrl:
          "https://img.eobuwie.cloud/eob_product_660w_880h(2/9/9/e/299ed1b3591c25ee9f49775a7585888a1f56221c_20_4067889687926_rz.jpg,webp)/bezecke-boty-adidas-ultraboost-5-id8812-cerna-0000303988647.webp",
        description: "High-performance running shoes with great support.",
        category: "Footwear",
        brand: "Adidas",
        color: "Black",
        size: "40",
        gender: "Unisex",
        tag: "SummerStyle",
        quantity: 50,
        rating: 4.7,
      },
      {
        name: "Puma Running Shorts",
        price: 35,
        imageUrl:
          "https://www.sporttown.cz/data/cache/thumb_680-680-12/products/63073/1702908793/523157-01-1702908793.jpg",
        description: "Lightweight and breathable running shorts.",
        category: "Clothing",
        brand: "Puma",
        color: "Black",
        size: "M",
        gender: "Men",
        tag: "SummerStyle",
        quantity: 75,
        rating: 4.2,
      },
      {
        name: "Nike Sports Bra",
        price: 50,
        imageUrl:
          "https://image.zoot.cz/cache2/fit/1908x2562/000/000/009/253/9253709.jpeg?_gl=1*dfsxf4*_up*MQ..*_gs*MQ..&gclid=Cj0KCQjwiLLABhCEARIsAJYS6unKIAUGA54jSCm2Czc4BfdzrzU-lMQt28YJMEibe8akcE4udVFuwYEaAgwyEALw_wcB&gbraid=0AAAAAC1-uJCdISxyx54Rio5uCAcKSUzqG",
        description: "Supportive sports bra designed for intense workouts.",
        category: "Clothing",
        brand: "Nike",
        color: "Black",
        size: "S",
        gender: "Women",
        tag: "NewCollection",
        quantity: 40,
        rating: 4.8,
      },
      {
        name: "Nike Sportswear Tech Fleece Hoodie",
        price: 120,
        imageUrl:
          "https://cdn.aboutstatic.com/file/images/d1a53888c71246ac972a9ece9e33117f.png?bg=F4F4F5&quality=75&trim=1&height=1280&width=960",
        description:
          "Warm and lightweight hoodie made from tech fleece fabric.",
        category: "Clothing",
        brand: "Nike",
        color: "Grey",
        size: "L",
        gender: "Men",
        tag: "CasualWear",
        quantity: 50,
        rating: 4.7,
      },
      {
        name: "Adidas Originals Women's 3-Stripes Leggings",
        price: 40,
        imageUrl:
          "https://img01.ztat.net/article/spp-media-p1/8f57f1c9df2a497da095102dd99ea8f9/f81f9f57d879418bbd3c9d632f83660d.jpg?imwidth=1800",
        description: "Classic high-rise leggings with 3-stripes styling.",
        category: "Clothing",
        brand: "Adidas",
        color: "Black",
        size: "S",
        gender: "Women",
        tag: "StreetFashion",
        quantity: 30,
        rating: 4.5,
      },
      {
        name: "The North Face 1996 Retro Nuptse Jacket",
        price: 320,
        imageUrl:
          "https://img01.ztat.net/article/spp-media-p1/d654c29e7bd64d458393f2eb1fb1c01f/601fdc8b923b426d860b1c93fe6daef5.jpg?imwidth=1800&filter=packshot",
        description:
          "Water-resistant down jacket inspired by the iconic 90's design.",
        category: "Clothing",
        brand: "The North Face",
        color: "Black",
        size: "M",
        gender: "Unisex",
        tag: "WinterCollection",
        quantity: 20,
        rating: 4.8,
      },
      {
        name: "Levi's Men's 511 Slim Fit Jeans",
        price: 70,
        imageUrl:
          "https://img01.ztat.net/article/spp-media-p1/4bdcb8be3e6844a08a8b8f2201aeff86/6d443369170847998fb41b58e552dbc8.jpg?imwidth=1800",
        description: "Modern slim jeans with room to move and stretch fabric.",
        category: "Clothing",
        brand: "Levi's",
        color: "Beige",
        size: "32x32",
        gender: "Men",
        tag: "CasualWear",
        quantity: 60,
        rating: 4.4,
      },
      {
        name: "Converse Chuck Taylor All Star",
        price: 65,
        imageUrl:
          "https://sizeer.cz/api/images/offer-525524920/seo/gallery/thumbnails/images/16/1669/mde00e90c3850fe886bdb7d3d463b8b63_313540_z_1.jpg",
        description: "Iconic high-top sneakers with a timeless design.",
        category: "Footwear",
        brand: "Converse",
        color: "Black",
        size: "43",
        gender: "Unisex",
        tag: "StreetFashion",
        quantity: 90,
        rating: 4.6,
      },
    ]);

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
