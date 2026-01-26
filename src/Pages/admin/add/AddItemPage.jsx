import { useState } from "react";
import { CloudUpload, Plus, X } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { createFood } from "@/services/food.service";

const AddItemPage = () => {
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "Salad",
      price: "",
      rating: "",
      reviews: "",
      calories: "",
      prepTime: "",
      isVegan: false,
      ingredients: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const { onChange: onImageChange, ...imageRegister } = register("image");

  const onSubmit = async (data) => {
    try {
      const imageFile = data.image?.[0] || null;
      const finalData = { ...data, image: imageFile };

      const res = await createFood(finalData);

      if (res.success) {
        alert("Food added successfully!");
        reset();
        setPreview(null);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Food creation failed!");
    }
  };

  const imageFile = watch("image")?.[0];
  if (imageFile && !preview) setPreview(URL.createObjectURL(imageFile));

  return (
    <div className=" mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl border p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          🍽️ Add New Food Item
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700"
        >
          {/* IMAGE */}
          <div className="md:col-span-2">
            <label className="font-semibold mb-2 block">Product Image</label>
            <label
              htmlFor="image"
              className="h-44 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="h-full object-cover rounded-xl"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <CloudUpload size={34} />
                  <span className="text-sm mt-1">Click to upload image</span>
                </div>
              )}

              <input
                id="image"
                type="file"
                hidden
                accept="image/*"
                {...imageRegister}
                onChange={(e) => {
                  onImageChange(e);
                  const file = e.target.files[0];
                  if (file) setPreview(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>

          {/* NAME */}
          <div>
            <label className="font-semibold">Product Name</label>
            <input
              {...register("name", { required: "Required" })}
              className="input"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* CATEGORY */}
          <div>
            <label className="font-semibold">Category</label>
            <select {...register("category")} className="input">
              {[
                "Salad",
                "Rolls",
                "Deserts",
                "Sandwich",
                "Cake",
                "Pure Veg",
                "Pasta",
                "Noodles",
              ].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="font-semibold">Description</label>
            <textarea
              rows={3}
              {...register("description", { required: true })}
              className="input resize-none"
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="font-semibold">Price</label>
            <input type="number" {...register("price")} className="input" />
          </div>

          {/* PREP TIME */}
          <div>
            <label className="font-semibold">Prep Time</label>
            <input {...register("prepTime")} className="input" />
          </div>

          {/* RATING */}
          <div>
            <label className="font-semibold">Rating</label>
            <input
              type="number"
              step="0.1"
              {...register("rating")}
              className="input"
            />
          </div>

          {/* REVIEWS */}
          <div>
            <label className="font-semibold">Reviews</label>
            <input type="number" {...register("reviews")} className="input" />
          </div>

          {/* CALORIES */}
          <div>
            <label className="font-semibold">Calories</label>
            <input {...register("calories")} className="input" />
          </div>

          {/* VEGAN */}
          <div className="flex items-center gap-3 mt-6">
            <input
              type="checkbox"
              {...register("isVegan")}
              className="accent-orange-500 scale-110"
            />
            <span className="font-semibold">Vegan Product</span>
          </div>

          {/* INGREDIENTS */}
          <div className="md:col-span-2">
            <p className="font-semibold mb-2">Ingredients</p>

            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input
                    {...register(`ingredients.${index}.name`)}
                    className="input flex-1"
                    placeholder="Ingredient name"
                  />
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500"
                    >
                      <X />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => append({ name: "" })}
              className="flex items-center gap-1 text-sm text-orange-600 mt-2"
            >
              <Plus size={16} /> Add Ingredient
            </button>
          </div>

          {/* SUBMIT */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold transition"
            >
              {isSubmitting ? "Adding..." : "ADD PRODUCT"}
            </button>
          </div>
        </form>
      </div>

      {/* input utility */}
      <style>{`
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          outline: none;
        }
        .input:focus {
          border-color: #fb923c;
          box-shadow: 0 0 0 2px rgba(251,146,60,.2);
        }
      `}</style>
    </div>
  );
};

export default AddItemPage;
