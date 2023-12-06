import React from "react";
import { Col } from "antd";
import { WrapperHeader, WrapperHeaderAcount, WrapperTextHeader,WrapperTextHeaderSmall } from "./style";
// import Search from "antd/es/input/Search";
import { UserOutlined, CaretDownOutlined ,ShoppingCartOutlined} from "@ant-design/icons";
import ButttonInputSearch from "../ButtonInputSearch/ButttonInputSearch";
const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader gutter={16}>
        <Col span={6}>
          <WrapperTextHeader> T-Supper</WrapperTextHeader>
        </Col>
        <Col span={12}>
        <ButttonInputSearch
              size="large"
              bordered={false}
              textbutton="Tìm kiếm"
              placeholder="input search text"
             // onChange={onSearch}
              backgroundColorButton="#5a20c1"
            />  
        </Col>
        <Col span={6} style={{display:"flex",gap:"25px"}}>
          <WrapperHeaderAcount >
          <UserOutlined style={{ fontSize:'30px'}} />
          <div>
            
            <div>
             <WrapperTextHeaderSmall>Đăng Nhập Đăng Kí</WrapperTextHeaderSmall>
            </div>
            <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
            <CaretDownOutlined />
          </div>
          </WrapperHeaderAcount>
      <div>
      <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
      <WrapperTextHeaderSmall>Giỏ Hàng </WrapperTextHeaderSmall>
      </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
