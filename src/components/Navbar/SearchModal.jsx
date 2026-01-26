import { useState, useMemo } from "react";
import { Search, X, Clock } from "lucide-react";
import { useFoodItem } from "@/Contex/StoreContex";

// eslint-disable-next-line react/prop-types
const SearchModal = ({ show, setShow }) => {
  const [query, setQuery] = useState("");
  const { food_list } = useFoodItem();

  const recentSearches = ["Salad", "Rolls", "Deserts", "Noodles"];

  // 🔍 SEARCH LOGIC
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    return food_list.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, food_list]);

  if (!show) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setShow(false)}
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
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
            <button
              onClick={() => {
                setShow(false);
                setQuery("");
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* BODY */}
          <div className="mt-3 max-h-72 overflow-y-auto">
            {/* 🔹 WHEN NO QUERY */}
            {!query && (
              <>
                <p className="text-xs text-gray-500 mb-2">Recent Searches</p>
                {recentSearches.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => setQuery(item)}
                  >
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </>
            )}

            {/* 🔹 SEARCH RESULT */}
            {query && (
              <>
                {searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 px-2 py-2 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">৳ {item.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 text-center py-6">
                    No food found 😔
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
