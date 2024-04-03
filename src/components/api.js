export const getProducts = async (limit = 0) => {
  const response = await fetch(`https://dummyjson.com/products?limit=${limit}`);
  const jsonData = await response.json();
  return jsonData.products;
};

export const filterProducts = async (searchTerm) => {
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${searchTerm}`
  );
  const jsonData = await response.json();
  return jsonData.products;
};

export const getCategories = async () => {
  const response = await fetch("https://dummyjson.com/products/categories");
  const jsonData = await response.json();
  return jsonData;
};

export const getProductsByCategory = async (category) => {
  const response = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  const jsonData = await response.json();
  return jsonData.products;
};
