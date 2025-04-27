export const buildProductQuery = (query) => {
  const {
    category,
    brand,
    minPrice,
    maxPrice,
    search,
    size,
    color,
    gender,
    tag,
    minRating,
    sort,
    page = 1,
    limit = 9,
  } = query;

  const filter = {};

  if (category) {
    filter.category = Array.isArray(category) ? { $in: category } : category;
  }
  if (brand) {
    filter.brand = Array.isArray(brand) ? { $in: brand } : brand;
  }
  if (size) {
    filter.size = Array.isArray(size) ? { $in: size } : size;
  }
  if (color) {
    filter.color = Array.isArray(color) ? { $in: color } : color;
  }
  if (gender) {
    filter.gender = Array.isArray(gender) ? { $in: gender } : gender;
  }
  if (tag) {
    filter.tag = Array.isArray(tag) ? { $in: tag } : tag;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (minRating) {
    filter.rating = { $gte: Number(minRating) };
  }

  const sortOption = {};
  if (sort === "asc") sortOption.price = 1;
  if (sort === "desc") sortOption.price = -1;

  const skip = (Number(page) - 1) * Number(limit);

  return {
    filter,
    sortOption,
    skip,
    limit: Number(limit),
    page: Number(page),
  };
};
