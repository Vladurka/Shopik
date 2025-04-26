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
        category: "Shoes",
        brand: "Nike",
        color: "White",
        size: "42",
        gender: "Men",
        tag: "Featured",
        quantity: 100,
        rating: 4.5,
      },
      {
        name: "Adidas Ultraboost 21",
        price: 180,
        imageUrl:
          "https://img.eobuwie.cloud/eob_product_660w_880h(2/9/9/e/299ed1b3591c25ee9f49775a7585888a1f56221c_20_4067889687926_rz.jpg,webp)/bezecke-boty-adidas-ultraboost-5-id8812-cerna-0000303988647.webp",
        description: "High-performance running shoes with great support.",
        category: "Shoes",
        brand: "Adidas",
        color: "Black",
        size: "40",
        gender: "Women",
        tag: "New Arrival",
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
        tag: "Popular",
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
        tag: "Featured",
        quantity: 40,
        rating: 4.8,
      },
    ]);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
