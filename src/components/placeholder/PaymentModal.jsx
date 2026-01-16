/* eslint-disable react/prop-types */
import API from "@/services/api";
import { useState } from "react";
import PaymentCompleteModal from "./PaymentCompleteModal";

const PaymentModal = ({ formData, setShow }) => {
  const [isPaid, setIsPaid] = useState(false);
  const handlePaid = async () => {
    const res = await API.post("/order/place", formData);
    setShow(false);
    if (res.data.sessionUrl) {
      window.location.href = res.data.sessionUrl;
    }
  };

  const handleCodPaid = async () => {
    setIsPaid(true);
    // setShow(false);
  };
  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-20"
        onClick={() => setShow(false)}
      ></div>
      {isPaid && (
        <PaymentCompleteModal
          isPaid={isPaid}
          setIsPaid={setIsPaid}
          setShow={setShow}
        />
      )}
      {/* MODAL */}
      <div className="fixed inset-0 flex items-center justify-center z-30">
        <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-md p-6 relative">
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            onClick={() => setShow(false)}
          >
            ✕
          </button>

          <h2 className="text-xl font-bold mb-4 text-center">
            Choose Payment Method
          </h2>

          <div className="flex flex-col gap-4 mt-4">
            {/* Cash on Delivery */}
            <button
              className="w-full px-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
              onClick={handleCodPaid}
            >
              Cash on Delivery
            </button>

            {/* Pay Now */}
            <button
              className="w-full px-4 py-3 active:scale-95 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
              onClick={handlePaid}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
