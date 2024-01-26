import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperHeader = styled.header`
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    width: 1270px;
    padding: 10px 0;
    margin:10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
    
 `

export const WrapperTextHeader = styled(Link)`
    font-size: 16px;
    color: yellow;
    font-weight: bold;
    text-align: left;
    &:hover {
        font-size: 16px;
        color: #fff;
    }
`

export const WrapperHeaderAccout = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    max-width: 200px;
`

export const WrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    color: #000;
    white-space: nowrap;
    font-Weight:500
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`