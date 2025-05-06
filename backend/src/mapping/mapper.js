export const mapProduct = (product) => {
  return {
    name: product.name,
    price: Number(product.price),
    imageUrl: product.imageUrl,
    description: product.description,
    category: product.category,
    brand: product.brand,
    color: product.color,
    size: product.size,
    gender: product.gender,
    tag: product.tag || "",
    quantity: Number(product.quantity),
    rating: Number(product.rating) || 0,
  };
};
