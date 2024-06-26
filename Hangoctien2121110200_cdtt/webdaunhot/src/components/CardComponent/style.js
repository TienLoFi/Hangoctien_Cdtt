import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
        height: 200px;
        width: 200px;
        
    },
    position: relative;
    background-color: ${props => props.disabled ? '#ccc' : '#red'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    &:hover {
        background-color: ${props => (props.disabled ? '#ccc' : '#ddd')};
        transform: scale(1.05);
        transition: background-color 0.3s ease, transform 0.3s ease;
    }
`

export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: rgb(56, 56, 61);
    font-weight: 400;
`

export const WrapperReportText = styled.div`
    font-size: 11px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 0px;
`

export const WrapperPriceText = styled.div`
    color: rgb(255, 66, 78);
    font-size: 16px;
    font-weight: 500;
`

export const WrapperDiscountText = styled.span`
    color: rgb(255, 66, 78);
    font-size: 13px;
    font-weight: 600;
    position: absolute;
    top: 0;
    right: 0;
    background-color: yellow
`

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120)
`