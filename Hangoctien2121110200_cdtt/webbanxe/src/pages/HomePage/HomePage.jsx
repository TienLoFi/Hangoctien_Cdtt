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
  TypeContainer,
  ProductContainer,
  WrapperTypeProduct2,
} from "./style";

import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import * as PostService from "../../services/PostService";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect } from "react";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import * as SliderService from "../../services/SliderService";
import FlashSaleCountdown from "../../components/FlashSaleCountdown/FlashSaleCountdown";
import ButttonInputSearch from "../../components/ButtonInputSearch/ButttonInputSearch";
import { searchProduct } from "../../redux/slides/productSlide";
const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDetailsPost = (id) => {
    navigate(`/post-details/${id}`);
  };
  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };
  const [isFlashSaleActive, setIsFlashSaleActive] = useState(true);
  const searchProduct1 = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct1, 500);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(12);
  const [typeProducts, setTypeProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [flashSaleEndTime, setFlashSaleEndTime] = useState(
    new Date("2024-01-27T16:20:00").toISOString()
  );
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);

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
  const [search, setSearch] = useState("");
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
    const currentDateTime = new Date();
    const isSaleActive = currentDateTime < new Date(flashSaleEndTime);

    setIsFlashSaleActive(isSaleActive);

    if (isSaleActive) {
      // Flash Sale is still active, filter Flash Sale products
      const filteredProducts = products?.data?.filter(
        ({ discount }) => discount !== null && discount !== 0
      );
      setFlashSaleProducts(filteredProducts);
    } else {
      // Flash Sale is over, clear Flash Sale products
      setFlashSaleProducts([]);
    }

    fetchAllTypeProduct();
    fetchPostAll();
  }, [products, flashSaleEndTime]);

  return (
    <Loading isLoading={isLoading || loading}>
      <WrapperTypeProduct2 style={{ width: "700px", margin: "0 auto" }}>
        <ButttonInputSearch
          style={{ color: "blue" }}
          size="large"
          bordered={true}
          textbutton="Tìm kiếm"
          placeholder="Bạn Muốn Tìm Gì?"
          onChange={onSearch}
          backgroundColorButton="#1E73BE"
        />
      </WrapperTypeProduct2>
      <div
        style={{
          width: "100%",
          margin: "0 auto",
          boxShadow: "0 4px 8px rgba(0.2, 0, 0, 0.2)",
          margin: "5px",
          backgroundColor: "#F1F1F1",
        }}
      >
        <WrapperTypeProduct>
          {typeProducts.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>

      <div
        className="body"
        style={{ width: "100%", backgroundColor: "#FFFFFF" }}
      >
        <div
          id="container"
          style={{ height: "100%", width: "1270px", margin: "0 auto" }}
        >
          <BodyContainer>
            <SliderContainer>
              <div
                id="container2"
                style={{ height: "423px", width: "823px", paddingLeft: 50 }}
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

          <TypeContainer>
      {isFlashSaleActive && (
        <>
          Flash sale <FlashSaleCountdown saleEndTime={flashSaleEndTime} />
        </>
      )}
    </TypeContainer>
    <WrapperProducts>
  {flashSaleProducts
    .filter(({ discount }) => discount !== null && discount !== 0) // Lọc sản phẩm có giảm giá
    .slice(0, 6) // Giới hạn số lượng sản phẩm hiển thị
    .map(
      ({
        _id,
        countInStock,
        description,
        image,
        name,
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

          <ProductContainer>
    
        
          Sản Phẩm Mới
      
    
    </ProductContainer>
    <WrapperProducts>
  {products?.data
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sắp xếp mảng theo thời gian thêm mới
    .slice(0, 6) // Giới hạn số lượng sản phẩm hiển thị
    .map(
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

          <ProductContainer>Gợi Ý Hôm Nay</ProductContainer>

          <WrapperProducts>
  {products?.data
    ?.sort(() => Math.random() - 0.5) // Sắp xếp mảng ngẫu nhiên
    .map(
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
        </div>
      </div>
      <div style={{ backgroundColor: "#D6D6D6" }}>
        <Footer />
      </div>
    </Loading>
  );
};

export default HomePage;
