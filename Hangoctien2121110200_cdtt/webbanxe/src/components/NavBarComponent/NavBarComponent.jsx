/* eslint-disable-next-line no-unused-vars */
import { Checkbox, Col, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductService";
import {
  WrapperContent,
  WrapperLableText,
  WrapperTextPrice,
  WrapperTextValue,
} from "./style";
import TypeProduct from "../TypeProduct/TypeProduct";

const NavBarComponent = () => {
  const [typeProducts, setTypeProducts] = useState([]);

  const fetchAllTypeProduct = async () => {
    try {
      const res = await ProductService.getAllTypeProduct();
      if (res?.status === "OK") {
        setTypeProducts(res?.data);
      }
    } catch (error) {
      console.error("Error fetching type products:", error);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  return (
    <div>
      <WrapperLableText>Danh Mục</WrapperLableText>
      {typeProducts.map((item) => (
        <div key={item}>
          <WrapperContent>
            <TypeProduct name={item} />
          </WrapperContent>
          
        </div>
        
      ))}
         {/* <div>
        <WrapperLableText>Thương Hiệu</WrapperLableText>
        {typeProducts.map((item) => (
          <div key={item}>
            <WrapperContent>
              <TypeProduct name={item} />
            </WrapperContent>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default NavBarComponent;
