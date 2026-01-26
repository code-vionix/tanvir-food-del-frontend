export const getDynamicCategories = (
  products = [],
  menu_list = [],
  defaultImage = null,
) => {
  // ১. প্রোডাক্ট থেকে ইউনিক ক্যাটাগরি বের করা
  const categories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  // ২. প্রতিটি ক্যাটাগরিতে শুধু menu_list থেকে ইমেজ ম্যাপ
  return categories.map((cat) => {
    const menu = menu_list.find(
      (m) => m.menu_name.toLowerCase() === cat.toLowerCase(),
    );

    return {
      category: cat,
      image: menu?.menu_image || defaultImage,
    };
  });
};
