import React, { useEffect, useState } from "react";
import getAllCategory from "../hooks/getAllCategories";
import useSearch from "../hooks/useSearch";
import toast from "react-hot-toast";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../store/features/alertSlice";

const Search = () => {
  const { querySearch } = useSearch();
  const { categoriesData } = getAllCategory();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  const searchData = async () => {
    try {
      dispatch(ShowLoading());
      const searchResults = await querySearch({
        search: searchText || undefined,
        category: selectedCategory || "All",
      });
      setResult(searchResults);
    } catch (error) {
      dispatch(HideLoading());
      toast.error(`Search failed: ${error.message}`);
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  return (
    <div className='row'>
      <div className='flex justify-center mt-6 px-4'>
        <div className='w-full max-w-9xl bg-white p-4 rounded-lg shadow-md'>
          <form onSubmit={searchSubmit}>
            <div className='flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0'>
              <select
                className='w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none'
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
                  className='w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none'
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
        </div>
      </div>

      {/* Searched */}
      <div className='container-fluid mb-3'>
        <div className='flex gap-4'>
          {result && result.length > 0
            ? result.map((product, i) => <Card key={i} product={product} />)
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Search;
