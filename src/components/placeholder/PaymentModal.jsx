/* eslint-disable react/prop-types */
import API from "@/services/api";
import { useState } from "react";
import PaymentCompleteModal from "./PaymentCompleteModal";

const PaymentModal = ({ formData, setShow }) => {
  const [isPaid, setIsPaid] = useState(false);
  const [loadingType, setLoadingType] = useState(null); // "cod" | "online"
  const [codOrder, setCodOrder] = useState(null);

  const handlePaid = async () => {
    try {
      setLoadingType("online");

      const res = await API.post("/order/place", formData);
      setShow(false);

      if (res.data.sessionUrl) {
        window.location.href = res.data.sessionUrl;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingType(null);
    }
  };

  const handleCodPaid = async () => {
    try {
      setLoadingType("cod");
      setIsPaid(true);

      const res = await API.post("/order/cod", formData);
      setCodOrder(res.data.order);

      //   window.location.reload();
    } catch (error) {
      console.log(error);
      setIsPaid(false);
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 transition-all"
        onClick={() => !loadingType && setShow(false)}
      />

      {isPaid && (
        <PaymentCompleteModal
          isPaid={isPaid}
          setIsPaid={setIsPaid}
          setShow={setShow}
          codOrder={codOrder}
        />
      )}

      {/* MODAL */}
      <div className="fixed inset-0 flex items-center justify-center z-30 animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-md p-6 relative border border-gray-100">
          {/* Close Button */}
          <button
            disabled={!!loadingType}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 transition disabled:opacity-30"
            onClick={() => setShow(false)}
          >
            ✕
          </button>

          <h2 className="text-xl font-bold mb-2 text-center">
            Choose Payment Method
          </h2>

          <p className="text-center text-gray-500 text-sm mb-6">
            Select how you would like to complete your order
          </p>

          <div className="flex flex-col gap-4">
            {/* Cash on Delivery */}
            <button
              disabled={!!loadingType}
              className="w-full px-4 py-3 bg-green-500 text-white font-semibold rounded-xl 
              hover:bg-green-600 transition active:scale-[0.98]
              disabled:opacity-70 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
              onClick={handleCodPaid}
            >
              {loadingType === "cod" ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                "Cash on Delivery"
              )}
            </button>

            {/* Pay Now */}
            <button
              disabled={!!loadingType}
              className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-xl
              hover:bg-blue-600 transition active:scale-[0.98]
              disabled:opacity-70 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
              onClick={handlePaid}
            >
              {loadingType === "online" ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Redirecting...
                </>
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
