export const buildProductQuery = (query) => {
  const { category, brand, search, size, color, gender, tag } = query;

  const filter = {};

  if (category)
    filter.category = Array.isArray(category) ? { $in: category } : category;
  if (brand) filter.brand = Array.isArray(brand) ? { $in: brand } : brand;
  if (size) filter.size = Array.isArray(size) ? { $in: size } : size;
  if (color) filter.color = Array.isArray(color) ? { $in: color } : color;
  if (gender) filter.gender = Array.isArray(gender) ? { $in: gender } : gender;
  if (tag) filter.tag = Array.isArray(tag) ? { $in: tag } : tag;

  let searchRegex = null;
  if (search && search.trim()) {
    searchRegex = new RegExp(search.trim(), "i");
  }

  return { filter, searchRegex };
};
