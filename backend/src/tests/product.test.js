import request from "supertest";
import app from "../index.js";
import { connectDB } from "../lib/db.js";
import { jest } from "@jest/globals";
import mongoose from "mongoose";

jest.setTimeout(15000);

beforeAll(async () => {
  await connectDB();
});

describe("Product API", () => {
  describe("GET /products", () => {
    it("should return a list of products", async () => {
      const response = await request(app).get("/api/products");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.products)).toBe(true);
    });
  });

  describe("GET /products/:id", () => {
    let productId;

    beforeAll(async () => {
      const response = await request(app).get("/api/products");
      const products = response.body.products;
      productId = products[0]._id;
    });

    it("should return a single product", async () => {
      const response = await request(app).get(`/api/products/${productId}`);
      expect(response.status).toBe(200);
      expect(typeof response.body).toBe("object");
    });

    it("should return a 404 error if the product is not found", async () => {
      const response = await request(app).get("/api/products/999");
      expect(response.status).toBe(404);
    });
  });

  describe("GET /products/filters", () => {
    it("should return a list of filters", async () => {
      const response = await request(app).get("/api/products/filters");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("filters");

      const filters = response.body.filters;
      expect(filters).toHaveProperty("sizes");
      expect(Array.isArray(filters.sizes)).toBe(true);

      expect(filters).toHaveProperty("colors");
      expect(Array.isArray(filters.colors)).toBe(true);

      expect(filters).toHaveProperty("brands");
      expect(Array.isArray(filters.brands)).toBe(true);

      expect(filters).toHaveProperty("categories");
      expect(Array.isArray(filters.categories)).toBe(true);

      expect(filters).toHaveProperty("genders");
      expect(Array.isArray(filters.genders)).toBe(true);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
