import styled from "styled-components";

export const WrapperLableText = styled.h4`
    color: rgb(56, 56, 61);
    font-size: 16px;
    font-weight: 700;
`

export const WrapperTextValue = styled.span`
    color: rgb(56, 56, 61);
    font-size: 12px;
    font-weight: 400;
`

export const WrapperContent = styled.div`
    display: flex;
    // align-items: center;
    flex-direction: column;
    gap: 12px;
`

export const WrapperTextPrice = styled.div`
    padding: 4px;
    color: rgb(56, 56, 61);
    border-radius: 10px;
    backgroundColor: rgb(238, 238, 238);
    width: fit-cotent;
`
export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
`

export const WrapperType = styled.div`
  padding: 10px 10px;
  cursor: pointer;
  &:hover {
    background-color: var(--primary-color);
    color: red;
    border-radius: 4px;
  }
` 