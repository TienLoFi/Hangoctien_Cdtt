import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./stlye";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/sliders/slider1.jpg";
import slider2 from "../../assets/images/sliders/slider2.jpg";
import slider3 from "../../assets/images/sliders/slider3.jpg";
import CardComponent from "../../components/CardComponent/CardComponent";

const HomePage = () => {
  const arr = ["TV", "LAPTOP", "TU LANH"];
  return (
    <>
      <div style={{ padding: "0 120px" }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div
        id="container"
        style={{ backgroundColor: "#efefef", padding: "0 120px" }}
      >
        <SliderComponent arrImages={[slider1, slider2, slider3]} />
     
<WrapperProducts>
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />

     </WrapperProducts>
     <div style={{ width:'100%',display:'flex',justifyContent: 'center',marginTop:'10px'}}>
      <WrapperButtonMore textButton="Xem Thêm " type="outline" styleButton={{width:'24px',height:'39px',borderRadius:'4px'}}
      styleTextButton={{fontWeight:500}}/>
     </div>
      </div>
    </>
  );
};

export default HomePage;
