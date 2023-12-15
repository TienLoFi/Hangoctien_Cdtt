import React from "react";
import {
  StyleNameProduct,
  WrapperReportText,
  WrapperPriceText,
  WrapperDiscountText,
  WrapperCardStyle,
} from "./style";
import { StarFilled } from "@ant-design/icons";
import logo from "../../assets/images/Logo/logoChinhHang.png";
const CardComponent = () => {
  return (
    <WrapperCardStyle
      hoverable
      style={{ width: 200 }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <img
        src={logo}
        style={{
          width: "68px",
          height: "14px",
          position: "absolute",
          top: -1,
          left: -1,
          borderTopLeftRadius: "3px",
        }}
      />

      <StyleNameProduct>Iphone</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: "4px" }}>
          <span>4.96</span>
          <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
        </span>
        <span> | Đã bán 1000+</span>
      </WrapperReportText>
      <WrapperPriceText>
        1.000.000đ
        
          <WrapperDiscountText>-5%</WrapperDiscountText>
        
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
