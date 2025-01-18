import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import getAllCategory from "../hooks/getAllCategories";
import search from "../hooks/useSearch";

const Shop = () => {
  const [checked, setChecked] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [] },
  });
  const [filterResult, setFilterResult] = useState();
  // console.log(filterResult);

  const { categoriesData } = getAllCategory();
  const { querySearch } = search();

  const handleToggle = (categoryId) => () => {
    const currentCategoryIndex = checked.indexOf(categoryId);
    const updatedChecked = [...checked];

    // Add or remove the category ID
    if (currentCategoryIndex === -1) {
      updatedChecked.push(categoryId);
    } else {
      updatedChecked.splice(currentCategoryIndex, 1);
    }

    setChecked(updatedChecked);
    handleFilter(updatedChecked);
  };

  const handleFilter = (filters) => {
    const updatedFilters = { ...myFilters };
    updatedFilters.filters.category = filters;
    // loadFilteredResults(myFilters.filters);
    setMyFilters(updatedFilters);
  };

  const loadFilteredResults = async (newFilters) => {
    // console.log(newFilters);
    const data = await querySearch(newFilters);
    setFilterResult(data);
  };

  useEffect(() => {
    loadFilteredResults(myFilters.filters);
  }, []);

  return (
    <DefaultLayout
      title='Shop Page'
      description='Welcome to Ecommerce'
      className='container mx-auto p-6 bg-gray-50'
    >
      <div className='flex gap-6'>
        {/* Left Column: Category Filter */}
        <div className='w-1/4 bg-white p-4 rounded shadow'>
          <h2 className='text-lg mb-4 font-semibold text-gray-800'>
            Filter by Category
          </h2>
          {categoriesData &&
            categoriesData.map((category, index) => (
              <div key={index} className='flex items-center mb-3'>
                <input
                  type='checkbox'
                  checked={checked.includes(category._id)}
                  onChange={handleToggle(category._id)}
                  className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                />
                <label className='ml-2 text-gray-700'>{category.name}</label>
              </div>
            ))}
        </div>

        {/* Right Column: Selected Filters */}
        <div className='w-3/4 bg-white p-6 rounded shadow'>
          <h2 className='text-lg font-semibold text-gray-800'>
            Selected Filters
          </h2>
          <p className='mt-2 text-gray-600'>
            <strong>Category Filters:</strong> {JSON.stringify(filterResult)}
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Shop;
