import React, { useState } from "react";
import { Search, X, Clock } from "lucide-react";

const SearchModal = ({ show, setShow }) => {
  const [query, setQuery] = useState("");

  const dummyResults = [
    "Chicken Burgersss",
    "Pizza Large",
    "Cold Coffee",
    "Beef Sandwich",
  ];

  if (!show) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
        onClick={() => setShow(false)}
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 animate-fadeIn">
        <div className="bg-white w-11/12 max-w-lg rounded-xl shadow-lg p-4">
          {/* HEADER */}
          <div className="flex items-center gap-2 border-b pb-3">
            <Search size={18} className="text-gray-400" />
            <input
              autoFocus
              className="w-full outline-none text-sm"
              placeholder="Search foods..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button onClick={() => setShow(false)}>
              <X size={18} />
            </button>
          </div>

          {/* BODY */}
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">Recent Searches</p>

            {dummyResults.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                <Clock size={14} className="text-gray-400" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
