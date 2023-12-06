import { Card } from "antd";
import styled from "styled-components";
export const WrapperCardStyle=styled(Card)`
width:200px;
& img{
    height:200px;
    width:200px;
}
positon:relative;
`
export const StyleNameProduct =styled.div`
font-weight: 400;
font-style: 12px;
line-height:16px;
color:rgb(56,56,61);
`   
export const WrapperReportText =styled.div`
font-size:11px;
color:rgb(128,128,137);
display:flex;
align-items:center;
`   
export const WrapperPriceText =styled.div`
color:rgb(255,66,79);
font-weight:500;
margin:6px 0 0px;
`
export const WrapperDiscountText =styled.span`
color:rgb(255,66,78);
font-weight:500;
font-size:12px;
`
export const WrapperImageStyle=styled.img`
top:-1px
left:-1px;
border-top-left-radius:3px;
position:absolute;
height:14px ;
width:68px;
`