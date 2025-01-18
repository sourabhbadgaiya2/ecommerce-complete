import React, { useEffect, useState } from "react";
import getAllCategory from "../hooks/getAllCategories";
import useSearch from "../hooks/useSearch";
import toast from "react-hot-toast";
import Card from "./Card";

const Search = () => {
  const { querySearch } = useSearch();
  const { categoriesData } = getAllCategory();

  const [data, setData] = useState({
    categories: [],
    selectedCategory: "",
    searchText: "",
    result: null,
    searched: false,
  });

  const { categories, selectedCategory, searchText, result, searched } = data;

  useEffect(() => {
    if (categoriesData) {
      setData((prevState) => ({
        ...prevState,
        categories: categoriesData,
      }));
    }
  }, [categoriesData]);

  const searchProduct = (result = []) => {
    return (
      result && result.map((product, i) => <Card key={i} product={product} />)
    );
  };

  const searchData = async () => {
    try {
      const searchResults = await querySearch({
        search: searchText || undefined,
        category: selectedCategory || "All",
      });

      setData((prevState) => ({
        ...prevState,
        result: searchResults,
        searched: true,
      }));
    } catch (error) {
      toast.error("Search failed:", error);
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value, searched: false });
  };

  return (
    <div className='row'>
      <div className='flex justify-center mt-6 px-4'>
        <div className='w-full max-w-9xl bg-white p-4 rounded-lg shadow-md'>
          <form onSubmit={searchSubmit}>
            <div className='flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0'>
              <select
                className='w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                onChange={handleChange("selectedCategory")}
                value={selectedCategory}
              >
                <option value=''>Pick Category</option>
                {categories.map((c, i) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <input
                type='search'
                className='w-full flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                placeholder='Search by name'
                onChange={handleChange("searchText")}
                value={searchText}
                // required
              />

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

      {/* //!Searched product */}
      <div className='container-fluid mb-3'>
        <div className='flex gap-4'>{searchProduct(result)}</div>
      </div>
    </div>
  );
};

export default Search;
