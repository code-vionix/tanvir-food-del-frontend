/* eslint-disable react/prop-types */
import { useState } from "react";
import { useCartItem } from "@/Contex/CartContext";
import API from "@/services/api";
import PaymentModal from "@/components/placeholder/PaymentModal";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useCartItem();
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  // ================= VALIDATION FUNCTION =================
  const validateForm = (data) => {
    const errors = {};

    if (!data.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!data.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email address";
    }

    if (!data.street.trim()) {
      errors.street = "Street is required";
    }

    if (!data.city.trim()) {
      errors.city = "City is required";
    }

    if (!data.state.trim()) {
      errors.state = "State is required";
    }

    if (!data.zipCode.trim()) {
      errors.zipCode = "Zip code is required";
    }

    if (!data.country.trim()) {
      errors.country = "Country is required";
    }

    if (!data.phone.trim()) {
      errors.phone = "Phone number is required";
    }
    // Bangladesh + international basic check
    else if (
      !/^(?:\+88|88)?01[3-9]\d{8}$/.test(data.phone) &&
      data.phone.length < 10
    ) {
      errors.phone = "Invalid phone number";
    }

    return errors;
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // realtime error remove
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    setShow(true);
  };
  console.log(show);

  const InputError = ({ msg }) =>
    msg ? <p className="text-red-500 text-sm mt-1">{msg}</p> : null;

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between justify-center items-center md:gap-40 gap-4 lg:my-28 my-6">
      {/* ===== LEFT FORM ===== */}
      {show && <PaymentModal formData={formData} setShow={setShow} />}
      <div className="lg:flex-[1] w-full">
        <h1 className="sm:text-3xl text-xl font-bold lg:mb-10 mb-6">
          Delivery Information
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 lg:max-w-[600px]"
        >
          <div className="flex justify-between gap-3">
            <div className="w-full">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="h-10 w-full px-3 py-1 border rounded-md outline-none"
                type="text"
                placeholder="First Name"
              />
              <InputError msg={errors.firstName} />
            </div>

            <div className="w-full">
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="h-10 w-full px-3 py-1 border rounded-md outline-none"
                type="text"
                placeholder="Last Name"
              />
              <InputError msg={errors.lastName} />
            </div>
          </div>

          <div>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="h-10 w-full px-3 py-1 border rounded-md outline-none"
              type="email"
              placeholder="Email Address"
            />
            <InputError msg={errors.email} />
          </div>

          <div>
            <input
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="h-10 w-full px-3 py-1 border rounded-md outline-none"
              type="text"
              placeholder="Street"
            />
            <InputError msg={errors.street} />
          </div>

          <div className="flex gap-3">
            <div className="w-full">
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="h-10 w-full px-3 py-1 border rounded-md outline-none"
                type="text"
                placeholder="City"
              />
              <InputError msg={errors.city} />
            </div>

            <div className="w-full">
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="h-10 w-full px-3 py-1 border rounded-md outline-none"
                type="text"
                placeholder="State"
              />
              <InputError msg={errors.state} />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-full">
              <input
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="h-10 w-full px-3 py-1 border rounded-md outline-none"
                type="text"
                placeholder="Zip Code"
              />
              <InputError msg={errors.zipCode} />
            </div>

            <div className="w-full">
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="h-10 w-full px-3 py-1 border rounded-md outline-none"
                type="text"
                placeholder="Country"
              />
              <InputError msg={errors.country} />
            </div>
          </div>

          <div>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="h-10 w-full px-3 py-1 border rounded-md outline-none"
              type="text"
              placeholder="Phone"
            />
            <InputError msg={errors.phone} />
          </div>

          <button
            type="submit"
            className="bg-tomato px-8 py-3 text-white text-sm rounded hover:bg-[#f3493d]"
          >
            PROCEED TO PAYMENT
          </button>
        </form>
      </div>

      {/* ===== RIGHT TOTAL ===== */}
      <div className="lg:flex-[1] w-full">
        <h1 className="text-2xl font-semibold mb-4">Cart Totals</h1>

        <div className="flex justify-between">
          <h3>Subtotal</h3>
          <p>${getTotalCartAmount()}</p>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between">
          <h3>Delivery Fee</h3>
          <p>${getTotalCartAmount() > 0 ? 20 : 0}</p>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-bold">
          <h3>Total</h3>
          <p>${getTotalCartAmount() > 0 ? getTotalCartAmount() + 20 : 0}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
