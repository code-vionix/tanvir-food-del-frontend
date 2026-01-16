/* eslint-disable react/prop-types */
const PaymentCompleteModal = ({ setIsPaid, isPaid, setShow }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-white z-40"
        onClick={() => {
          setShow(false);
          setIsPaid(false);
        }}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className={`bg-white rounded-xl shadow-lg w-11/12 max-w-sm p-6 text-center transform transition-all duration-500 ${
            isPaid ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4 text-green-600">
            Order Complete!
          </h2>
          <p className="text-gray-700 mb-6">
            Your order has been successfully placed. Thank you for shopping with
            us.
          </p>
          <button
            className="px-6 py-2 bg-tomato text-white rounded-lg hover:bg-[#f3493d] transition"
            onClick={() => {
              setShow(false);
              setIsPaid(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentCompleteModal;
