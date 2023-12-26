import React from 'react';
import { StarFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';
import { WrapperCardStyle, StyleNameProduct, WrapperReportText, WrapperPriceText, WrapperDiscountText, WrapperStyleTextSell } from './style';
import logo from '../../assets/images/logo.png';

const CardComponent = (props) => {
  const { id, image, name, price, rating, selled, discount } = props;
  const navigate = useNavigate();

  const handleDetailsProduct = () => {
    navigate(`/product-details/${id}`);
  };

  return (
    <WrapperCardStyle
      hoverable
      headStyle={{ width: '100%', height: '200px', overflow: 'hidden' }}
      style={{ width: 200, borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
      bodyStyle={{ padding: '10px' }}
      cover={<img alt="example" src={image} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px', maxWidth: '200px', maxHeight: '200px'  }} />}
      onClick={handleDetailsProduct}
    >
      <img
        src={logo}
        alt="logo"
        style={{
          width: '68px',
          height: '14px',
          position: 'absolute',
          top: '10px',
          left: '10px',
          borderTopLeftRadius: '3px',
        }}
      />
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: '4px', display: 'flex', alignItems: 'center' }}>
          <span>{rating} </span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
        </span>
        <WrapperStyleTextSell> | Đã bán {selled || 1000}+</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        <span style={{ marginRight: '8px', fontSize: '14px', fontWeight: 'bold', color: 'rgb(255, 66, 78)' }}>{convertPrice(price)}</span>
        <WrapperDiscountText style={{ fontSize: '12px', fontWeight: 'bold', color: 'rgb(255, 66, 78)' }}>- {discount || 5} %</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
