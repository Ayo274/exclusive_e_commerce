export const mockProducts = Array.from({ length: 12 }).map((_, index) => ({
  _id: `prod_${index}`,
  title: `Product ${index + 1} - Premium Edition`,
  price: 120 + index * 10,
  originalPrice: 160 + index * 10,
  discount: 30,
  isNew: index % 3 === 0,
  rating: 4.5,
  reviews: 88 + index,
  image: `https://via.placeholder.com/190x180?text=Product+${index + 1}`,
}));
