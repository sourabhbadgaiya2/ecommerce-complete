import { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import useProduct from "../hooks/useProduct";
import Card from "../components/Card";

const ProductDetails = () => {
  const { product } = useProduct();

  return (
    <DefaultLayout
      title='Product Page'
      description='Welcome to Ecommerce'
      className='container p-4 bg-gray-50'
    >
      <div className=''>
        <div className='w-full'>
          {product && product.description && (
            <Card product={product} showViewProductBtn={false} />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductDetails;
