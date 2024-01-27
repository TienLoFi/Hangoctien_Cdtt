
import { Checkbox, Col, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductService";
import * as BrandService from "../../services/BrandService";
import {
  WrapperContent,
  WrapperLableText,
  WrapperTextPrice,
  WrapperTextValue,
} from "./style";
import TypeProduct from "../TypeProduct/TypeProduct";
import BrandProduct from "../BrandProduct/BrandProduct";

const NavBarComponent = () => {
  const [Brands, setBrands] = useState([]);
  const [typeProducts, setTypeProducts] = useState([]);
  const fetchAllBrands = async () => {
    try {
      const res = await ProductService.getAllBrandProduct();
      if (res?.status === "OK") {
        setBrands(res?.data);
      }
    } catch (error) {
      console.error("Không tìm thấy thương hiệu:", error);
    }
  };


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
    fetchAllBrands();
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
      <div>
        <WrapperLableText>Thương Hiệu</WrapperLableText>

        {Brands.map((item) => (
          <div key={item}>
            <WrapperContent>
              <BrandProduct name={item} />
            </WrapperContent>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBarComponent;
