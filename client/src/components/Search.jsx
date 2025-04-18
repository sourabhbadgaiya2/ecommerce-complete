import React, { useEffect, useState } from "react";
import getAllCategory from "../hooks/useGetAllCategories";
import useSearch from "../hooks/useSearch";
import toast from "react-hot-toast";

import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../store/features/alertSlice";
import Cards from "./Cards";

const Search = () => {
  const { querySearch } = useSearch();
  const { categoriesData } = getAllCategory();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (categoriesData?.length) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  const searchData = async () => {
    if (!searchText.trim() && !selectedCategory) {
      toast.error("Please enter a search term or select a category.");
      return;
    }

    try {
      dispatch(ShowLoading());

      const searchResults = await querySearch({
        search: searchText.trim() || undefined,
        category: selectedCategory || "All",
      });

      setResult(searchResults);
    } catch (error) {
      toast.error(`Search failed: ${error.message}`);
    } finally {
      dispatch(HideLoading());
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  return (
    <div className='search-container'>
      <form onSubmit={searchSubmit}>
        <div className='flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0'>
          <select
            className='w-full sm:w-auto border bg-transparent border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none'
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value=''>Pick Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <div className='w-full flex-1'>
            <label htmlFor='searchText' className='sr-only'>
              Search by name
            </label>
            <input
              id='searchText'
              type='search'
              className='w-full bg-transparent border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              placeholder='Search by name'
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </div>

          <button
            type='submit'
            className='w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1'
          >
            Search
          </button>
        </div>
      </form>

      {/* Search Results */}
      <div className='search-results flex flex-col gap-3 mb-3'>
        {result === null ? (
          "" // Initially kuch nahi dikhayenge
        ) : result.length > 0 ? (
          <>
            {result.map((product, i) => (
              <Cards key={i} product={product} />
            ))}
            <p className='text-lg font-semibold text-gray-700 mt-4'>
              New Arrivals
            </p>
          </>
        ) : (
          <p className='text-gray-500'>No product found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
