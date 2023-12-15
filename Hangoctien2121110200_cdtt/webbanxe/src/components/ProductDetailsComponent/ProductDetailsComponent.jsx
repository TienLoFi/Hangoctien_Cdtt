import { Col, Image, Row } from "antd";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import React from "react";
import imageProduct from "../../assets/images/products/d18cee1774aaf5216be9a65d44f8ea6a.jpg.webp";
import imageProductDetails from "../../assets/images/products/productdetailtest.jpg.webp";
import {
  WrapperAddressProduct,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQualityProduct,
  WrapperStyleColImage,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
} from "./style";
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import { StarFilled } from "@ant-design/icons";

const ProductDetailsComponent = () => {
  const onChange =()=>{}
  return (
    <Row style={{ padding: "16px", backgroundColor: "#fff" ,borderRadius:'4px'}}>
      <Col span={10} style={{ borderRight:'1px solid #e5e5e5',paddingRight:'10px'}}>
        <Image src={imageProduct} alt="image prodcut" />
        <Row style={{ padding: "10px", justifyContent: "space-between" }}>
          <WrapperStyleColImage span={4} sty>
            <WrapperStyleImageSmall
              src={imageProductDetails}
              alt="image prodcut DETAILS"
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductDetails}
              alt="image prodcut DETAILS"
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductDetails}
              alt="image prodcut DETAILS"
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductDetails}
              alt="image prodcut DETAILS"
            />
          </WrapperStyleColImage>
          <WrapperStyleColImage span={4}>
            <WrapperStyleImageSmall
              src={imageProductDetails}
              alt="image prodcut DETAILS"
            />
          </WrapperStyleColImage>
        </Row>
      </Col>
      <Col span={14} style={{ padding:'10px'}}>
        <WrapperStyleNameProduct>
          Sach - Tham tú lumg danh Conan - Combo 10 tap tù tap 81 dén tap 90
        </WrapperStyleNameProduct>
        <div>
          <StarFilled
            style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }}
          />

          <StarFilled
            style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }}
          />

          <StarFilled
            style={{ fontSize: "12px", color: "rgb(253, 216, 54)" }}
          />

          <span> | Da ban 1000+</span>
        </div>
        <WrapperPriceProduct>
<WrapperPriceTextProduct>200.0000</WrapperPriceTextProduct>
</WrapperPriceProduct>
<WrapperAddressProduct>
<span>Giao đến </span>
<span className='address'>Q. 1, P. Bén Nghé, HO Chi Minh</span> -
<span className='change-adress'> Dổi địa chỉ </span>
</WrapperAddressProduct>

<div style ={{margin:'10px 0 20px',padding:'10px 0', borderTop:'1px solid #e5e5ec',borderBottom:'1px solid #e5e5ec'} }>
<div style={{marginBottom:'15px'}}>Số Lượng </div>
<WrapperQualityProduct>
  <button style ={{ border:'none',background:'transparent'}}>
    <MinusOutlined style ={{color:'#000',fontSize:'20px'}}/>
  </button>

<WrapperInputNumber defaultValue={3} onChange={onChange} size="small" />
<button style={{ border:'none',background:'tranparent'}}>
  <PlusOutlined style= {{color:'#000',fontSize:'20px'}}/>

</button>
</WrapperQualityProduct>

 </div>
 <div style={{ display: 'flex', aliggItems: 'center', gap: '12px '}}>
<ButtonComponent
bordered={false}
size={40}
styleButton={{
background: 'rgb(255, 57, 69)',
height:' 48px',
width: '220px',
border: 'none',
borderRadius: '4px'
}}
textbutton={'Chọn mua'}
styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
></ButtonComponent>
<ButtonComponent

size={40}
styleButton={{
background: '#fff',
height:'48px',
width: '220px',
border: '1px solid rgb(13,92,182',
borderRadius: '4px'
}}
textbutton={'Mua trả sau'}
styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
></ButtonComponent>
</div>
      </Col>
    </Row>
  );
};

export default ProductDetailsComponent;
  
