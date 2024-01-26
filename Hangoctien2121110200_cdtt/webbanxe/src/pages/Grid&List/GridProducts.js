// GridProducts.js
import React from "react";
import { WrapperProducts } from "./style"; // Adjust the import based on your styling file
import CardComponent from "../../components/CardComponent/CardComponent";

const GridProducts = ({ products }) => {
  return (
    <WrapperProducts>
      {products.map((product) => (
        <CardComponent key={product._id} {...product} />
      ))}
    </WrapperProducts>
  );
};

export default GridProducts;
