import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
padding-left:20vh

`
export const WrapperTypeProduct2 = styled.div`
width:500px;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;

`

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: #9255FD;
        span {
            color: #fff;
        }
    }
    width: 100%;
    color: #9255FD;
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
`

export const WrapperProducts = styled.div`
    display: flex;
    gap: 14px;
    margin-top:20px;
    flex-wrap: wrap;

`
export const BodyContainer = styled.div`
display: grid;
grid-template-rows: auto; 
grid-template-columns: 823px 1fr; 
gap: 20px; 
`;

export const SliderContainer = styled.div`
grid-col: 1; 
`;

export const TextContainer = styled.div`

text-align:center;
margin-top: 10px;
font-weight: 900; 
font-size: 20px;
color: #EE5131; 
`;
export const ImageRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 30px;
    
 
`;

export const ImageContainer = styled.div`

  grid-col: 3; margin-top: 20px;
  &:hover {
    background-color: ${props => (props.disabled ? '#ccc' : '#ddd')};
    transform: scale(1.05);
    transition: background-color 0.3s ease, transform 0.3s ease;
}
`;
export const SaleContainer = styled.div`
grid-col: 2; 
width: 100%;
  
  margin-left: 10px;
`;
export const Title= styled.div`
font-weight: 600; 
&:hover {
  color: red;
  span {
      color: #fff;
  }
`;
export const TypeContainer = styled.div`
display: flex;
align-items: center;  
text-align:left;
margin-top: 10px;
font-weight: 800; 
font-size: 35px;
color: #EE5131; 

`
;
export const ProductContainer = styled.div`
display: flex;
text-align:center;
margin-top: 10px;
font-weight: 800; 
font-size: 25px;
color: #EE5131; 
margin-left:40%
`;