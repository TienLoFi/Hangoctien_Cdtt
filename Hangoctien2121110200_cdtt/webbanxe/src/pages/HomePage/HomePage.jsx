import React from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct,
  BodyContainer,
  SliderContainer,
  ProductsContainer,
  ImageRow,
  ImageContainer,
  TextContainer,
  SaleContainer,
  Title,
} from "./style";
import slider1 from "../../assets/images/sliders/banner1.jpg";
import slider2 from "../../assets/images/sliders/banner2.jpg";
import slider3 from "../../assets/images/sliders/banner3.jpg";

import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import * as PostService from "../../services/PostService";
import { useSelector } from "react-redux";
import { useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect } from "react";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import * as SliderService from "../../services/SliderService";
const HomePage = () => {
  const navigate = useNavigate();
  const handleDetailsPost = (id) => {
    navigate(`/post-details/${id}`);
  };

  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(18);
  const [typeProducts, setTypeProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);

    return res;
  };
  const fetchPostAll = async () => {
    const res = await PostService.getAllPost();
    if (res?.status === "OK") {
      setPosts(res?.data);
    }
  };
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["products", limit, searchDebounce], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  
  useEffect(() => {
    fetchAllTypeProduct();
    fetchPostAll();
  }, []);

  return (
    <Loading isLoading={isLoading || loading}>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {typeProducts.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>

      <div
        className="body-container"
        style={{ width: "100%", backgroundColor: "#efefef" }}
      >
        {" "}
        <BodyContainer>
          <SliderContainer>
            <div
              id="container"
              style={{ height: "423px", width: "823px", paddingLeft: 70 }}
            >
              <SliderComponent settings={sliderSettings} />
            </div>
          </SliderContainer>

          <SaleContainer>
            <TextContainer className="text-container">
              Chương Trình Khuyến Mãi
            </TextContainer>
            {posts &&
              posts.length > 0 &&
              posts.slice(0, 3).map((post, index) => (
                <ImageRow key={index}>
                  <ImageContainer onClick={() => handleDetailsPost(post._id)}>
                    <img
                      src={post.image}
                      alt={`Promotion Image ${index + 1}`}
                      style={{ width: 160, height: 90, borderRadius: 10 }}
                    />
                  </ImageContainer>
                  <Title>{post.title}</Title>
                </ImageRow>
              ))}
          </SaleContainer>
        </BodyContainer>
        <div
          id="container"
          style={{ height: "1000px", width: "1270px", margin: "0 auto" }}
        >
          
          <WrapperProducts>
            {products?.data?.map(
              ({
                _id,
                countInStock,
                description,
                image,
                name,
                imageDetail,
                price,
                rating,
                type,
                selled,
                discount,
              }) => (
                <CardComponent
                  key={_id}
                  countInStock={countInStock}
                  description={description}
                  image={image}
                  name={name}
                  price={price}
                  rating={rating}
                  type={type}
                  selled={selled}
                  discount={discount}
                  id={_id}
                />
              )
            )}
          </WrapperProducts>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <WrapperButtonMore
              textbutton={isPreviousData ? "Đang Tải..." : "Xem thêm"}
              type="outline"
              styleButton={{
                border: `1px solid ${
                  products?.total === products?.data?.length
                    ? "#f5f5f5"
                    : "#fde455"
                }`,
                color: `${
                  products?.total === products?.data?.length
                    ? "#f5f5f5"
                    : "#edc225"
                }`,
                width: "240px",
                height: "38px",
                borderRadius: "4px",
              }}
              disabled={
                products?.total === products?.data?.length ||
                products?.totalPage === 1
              }
              styleTextButton={{
                fontWeight: 500,
                color: products?.total === products?.data?.length && "#fff",
              }}
              onClick={() => setLimit((prev) => prev + 6)}
            />
          </div>
          <Footer />
        </div>
      </div>
    </Loading>
  );
};

export default HomePage;
