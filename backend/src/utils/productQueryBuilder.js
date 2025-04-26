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
    limit = 10,
  } = query;

  const filter = {};

  if (category) filter.category = category;
  if (brand) filter.brand = brand;
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
  if (size) filter.size = size;
  if (color) filter.color = color;
  if (gender) filter.gender = gender;
  if (tag) filter.tag = tag;
  if (minRating) filter.rating = { $gte: Number(minRating) };

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
