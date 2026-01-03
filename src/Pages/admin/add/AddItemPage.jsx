import { CloudUpload } from "lucide-react";
import { useForm } from "react-hook-form";

const AddItemPage = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Submit Data:", data);
    // Logic: Send data to your Node.js backend here
    alert("Item successfully added!");
    reset();
  };

  return (
    <div className="max-w-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 text-gray-600"
      >
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

        <div className="flex flex-col gap-2">
          <p>Product name</p>
          <input
            {...register("name")}
            className="p-2 border border-gray-400 rounded outline-orange-500"
            type="text"
            placeholder="Type here"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Product description</p>
          <textarea
            {...register("description")}
            className="p-2 border border-gray-400 rounded outline-orange-500"
            rows="4"
            placeholder="Write content here"
            required
          />
        </div>

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
              {...register("price")}
              className="p-2 border border-gray-400 rounded outline-orange-500 w-32"
              type="number"
              placeholder="$20"
              required
            />
          </div>
        </div>

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
