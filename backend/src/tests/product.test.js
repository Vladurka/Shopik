const request = require("supertest");
const app = require("../index");

describe("Product API", () => {
  describe("GET /products", () => {
    it("should return a list of products", async () => {
      const response = await request(app).get("/api/products");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /products/:id", () => {
    it("should return a single product", async () => {
      const response = await request(app).get(
        "/api/products/682aff43f079b4a5479e8a08"
      );
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });
    it("should return a 404 error if the product is not found", async () => {
      const response = await request(app).get("/products/999");
      expect(response.status).toBe(404);
    });
  });

  describe("GET products/filters", () => {
    it("should return a list of filters", async () => {
      const response = await request(app).get("/api/products/filters");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});
