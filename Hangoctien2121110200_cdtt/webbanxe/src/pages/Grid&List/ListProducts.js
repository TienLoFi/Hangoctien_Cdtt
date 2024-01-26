// ListProducts.js
import React from "react";
import CardComponent from "../../components/CardComponent/CardComponent";
import { WrapperProducts } from "./style"; // Adjust the import based on your styling file

const ListProducts = ({ products }) => {
  return (
    <WrapperProducts>
      {products.map((product) => (
        <CardComponent key={product._id} {...product} />
      ))}
    </WrapperProducts>
  );
};

export default ListProducts;
