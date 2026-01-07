import { useState } from "react";
import { CloudUpload, Plus, X } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";

const AddItemPage = () => {
  const [preview, setPreview] = useState(null);

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "TERW",
      description: "WT",
      category: "Salad",
      price: "434",
      rating: "4",
      reviews: "34",
      calories: "434",
      prepTime: "34",
      isVegan: false,
      ingredients: [{ name: "ertet" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  // ✅ SUBMIT HANDLER (React 18 safe)
  const onSubmit = (data) => {
    const imageFile = data.image?.[0] || null;

    const finalData = {
      ...data,
      image: imageFile,
    };

    console.log("========== FORM SUBMIT ==========");
    console.log(finalData);
    console.log("Image:", imageFile);
    console.log("Ingredients:", data.ingredients);
    console.log("Is Vegan:", data.isVegan);
    console.log("================================");

    // reset();
    setPreview(null);
  };

  // ✅ Proper image register handling
  const { onChange: onImageChange, ...imageRegister } = register("image");

  return (
    <div className="max-w-2xl p-4">
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
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
          </label>
        </div>

        {/* NAME */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Product Name</label>
          <input
            {...register("name", { required: true })}
            className="p-2 border rounded outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Description</label>
          <textarea
            {...register("description", { required: true })}
            rows={4}
            className="p-2 border rounded outline-none focus:ring-2 focus:ring-orange-500"
          />
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
          className="bg-orange-600 text-white px-10 py-3 rounded-lg font-bold hover:bg-orange-700 transition"
        >
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default AddItemPage;
