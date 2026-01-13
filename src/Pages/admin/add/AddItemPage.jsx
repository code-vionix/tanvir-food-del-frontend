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

  // SUBMIT HANDLER
  const onSubmit = async (data) => {
    try {
      const imageFile = data.image?.[0] || null;
      const finalData = { ...data, image: imageFile };
      console.log(finalData);

      const res = await createFood(finalData);

      if (res.success) {
        alert("Food added successfully!");
        reset();
        setPreview(null);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Food creation failed!");
    }
  };

  // Image preview
  const imageFile = watch("image")?.[0];
  if (imageFile && !preview) setPreview(URL.createObjectURL(imageFile));

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 text-gray-700"
      >
        {/* IMAGE UPLOAD */}
        <div>
          <p className="mb-2 font-semibold">Upload Image</p>
          <label
            htmlFor="image"
            className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center">
                <CloudUpload size={28} className="text-gray-400" />
                <span className="text-xs text-gray-500 mt-1">Upload</span>
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
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Product Name</label>
          <input
            {...register("name", { required: "Product name required" })}
            className="p-2 border rounded outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Description</label>
          <textarea
            {...register("description", { required: "Description required" })}
            rows={4}
            className="p-2 border rounded outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* CATEGORY & PRICE */}
        <div className="flex gap-6 flex-wrap">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Category</label>
            <select
              {...register("category")}
              className="p-2 border rounded w-40"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Price</label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="p-2 border rounded w-32"
            />
          </div>
        </div>

        {/* RATING & REVIEWS */}
        <div className="flex gap-6 flex-wrap">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Rating</label>
            <input
              type="number"
              step="0.1"
              {...register("rating")}
              className="p-2 border rounded w-32"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Reviews</label>
            <input
              type="number"
              {...register("reviews")}
              className="p-2 border rounded w-32"
            />
          </div>
        </div>

        {/* CALORIES & PREP TIME */}
        <div className="flex gap-6 flex-wrap">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Calories</label>
            <input
              {...register("calories")}
              className="p-2 border rounded w-40"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Prep Time</label>
            <input
              {...register("prepTime")}
              className="p-2 border rounded w-40"
            />
          </div>
        </div>

        {/* VEGAN */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isVegan")}
            className="accent-orange-500"
          />
          <span className="font-semibold">Vegan Product</span>
        </div>

        {/* INGREDIENTS */}
        <div className="flex flex-col gap-3">
          <p className="font-semibold">Ingredients</p>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input
                {...register(`ingredients.${index}.name`)}
                className="p-2 border rounded flex-1"
                placeholder="Ingredient name"
              />
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ name: "" })}
            className="flex items-center gap-1 text-sm text-blue-600 w-fit"
          >
            <Plus size={16} /> Add Ingredient
          </button>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-600 text-white px-10 py-3 rounded-lg font-bold hover:bg-orange-700 disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "ADD PRODUCT"}
        </button>
      </form>
    </div>
  );
};

export default AddItemPage;
