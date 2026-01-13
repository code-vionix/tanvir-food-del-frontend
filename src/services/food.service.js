import API from "./api";

// Admin
export const createFood = async (foodData) => {
  const formData = new FormData();

  for (let key in foodData) {
    if (key === "image" && foodData.image) {
      formData.append("image", foodData.image);
    } else if (key === "ingredients") {
      formData.append("ingredients", JSON.stringify(foodData.ingredients));
    } else {
      formData.append(key, foodData[key]);
    }
  }

  const res = await API.post("/food", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

// Public
export const getAllFoods = async () => {
  const res = await API.get("/food");
  return res.data;
};

export const getSingleFood = async (id) => {
  const res = await API.get(`/food/${id}`);
  return res.data;
};
export const deleteFood = async (id) => {
  const res = await API.delete(`/food/${id}`);
  return res.data;
};
