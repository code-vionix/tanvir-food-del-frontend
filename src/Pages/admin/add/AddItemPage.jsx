import { CloudUpload, Plus, X } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";

const AddItemPage = () => {
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      ingredients: [{ name: "" }],
      isVegan: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit = (data) => {
    console.log("Submit Data:", data);
    alert("Item successfully added!");
    reset();
  };

  return (
    <div className="max-w-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 text-gray-600"
      >
        {/* Image Upload */}
        <div>
          <p className="mb-2">Upload Image</p>
          <label
            htmlFor="image"
            className="w-32 h-24 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50 rounded cursor-pointer"
          >
            <CloudUpload size={30} />
            <span className="text-xs mt-1">Upload</span>
            <input {...register("image")} type="file" id="image" hidden />
          </label>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-2">
          <p>Product name</p>
          <input
            {...register("name", { required: true })}
            className="p-2 border border-gray-400 rounded outline-orange-500"
            placeholder="Type here"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <p>Product description</p>
          <textarea
            {...register("description", { required: true })}
            className="p-2 border border-gray-400 rounded outline-orange-500"
            rows="4"
            placeholder="Write content here"
          />
        </div>

        {/* Category & Price */}
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <p>Product category</p>
            <select
              {...register("category")}
              className="p-2 border border-gray-400 rounded outline-orange-500 w-40"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <p>Product price</p>
            <input
              {...register("price", { required: true })}
              type="number"
              className="p-2 border border-gray-400 rounded outline-orange-500 w-32"
              placeholder="$20"
            />
          </div>
        </div>

        {/* Rating & Reviews */}
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <p>Rating</p>
            <input
              {...register("rating")}
              type="number"
              step="0.1"
              className="p-2 border border-gray-400 rounded outline-orange-500 w-32"
              placeholder="4.8"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p>Reviews</p>
            <input
              {...register("reviews")}
              type="number"
              className="p-2 border border-gray-400 rounded outline-orange-500 w-32"
              placeholder="124"
            />
          </div>
        </div>

        {/* Calories & Prep Time */}
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <p>Calories</p>
            <input
              {...register("calories")}
              className="p-2 border border-gray-400 rounded outline-orange-500 w-40"
              placeholder="420 kcal"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p>Prep Time</p>
            <input
              {...register("prepTime")}
              className="p-2 border border-gray-400 rounded outline-orange-500 w-40"
              placeholder="15-20 min"
            />
          </div>
        </div>

        {/* Vegan */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("isVegan")} />
          <p>Vegan Product</p>
        </div>

        {/* Ingredients */}
        <div className="flex flex-col gap-3">
          <p>Ingredients</p>

          {fields.map((item, index) => (
            <div key={item.id} className="flex gap-2 items-center">
              <input
                {...register(`ingredients.${index}.name`)}
                className="p-2 border border-gray-400 rounded outline-orange-500 flex-1"
                placeholder="Ingredient name"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500"
                >
                  <X size={18} />
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

        {/* Submit */}
        <button
          type="submit"
          className="bg-black text-white px-10 py-2 w-fit rounded hover:bg-gray-800 transition"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddItemPage;
