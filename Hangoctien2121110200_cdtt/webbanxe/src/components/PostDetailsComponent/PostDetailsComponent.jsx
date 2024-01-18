import { Col, Image} from "antd";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import * as PostService from "../../services/PostService";
import Footer from "../../pages/Footer/Footer";
import {
  WrapperStyleNameProduct,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperType,
  WrapperStyleNameTitle,
  ImageRow,
  ImageContainer,
  TextContainer,
  SaleContainer,
  Title,
} from "./style";
import { useNavigate } from "react-router-dom";
const PostDetailsComponent = ({ idPost }) => {
  const navigate = useNavigate();
  const handleDetailsPost = (id) => {
    navigate(`/post-details/${id}`);
  };
  const [posts, setPosts] = useState([]);
  const fetchGetDetailsPost = async (context) => {
    try {
      const id = context?.queryKey && context?.queryKey[1];
      if (id) {
        const res = await PostService.getDetailsPost(id);
        return res.data;
      }
    } catch (error) {
      console.error("Error fetching post details:", error);
      throw error;
    }
  };

  const {
    isLoading,
    data: postDetails,
    isError,
    error,
  } = useQuery(["post-details", idPost], fetchGetDetailsPost, {
    enabled: !!idPost,
  });

  const fetchPostAll = async () => {
    const res = await PostService.getAllPost();
    if (res?.status === "OK") {
      setPosts(res?.data);
    }
  };
  useEffect(() => {
    fetchPostAll();
  }, []);
  
  return (
    <Loading isLoading={isLoading}>
      {isError && <div>Error loading post details: {error.message}</div>}

      <Col>
        <WrapperType> KHUYẾN MÃI</WrapperType>

        <WrapperStyleNameProduct>
          <h2>{postDetails?.name}</h2>
        </WrapperStyleNameProduct>
        <WrapperStyleNameTitle>
          <h4>{postDetails?.title}</h4>
        </WrapperStyleNameTitle>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            src={postDetails?.image}
            alt="image product"
            preview={true}
            style={{
              width: "700px",
              height: "100%",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
        </div>
      </Col>
      <WrapperPriceProduct>
        <WrapperPriceTextProduct>{postDetails?.detail}</WrapperPriceTextProduct>
      </WrapperPriceProduct>
      <div className="">
        <TextContainer className="text-container">
          Chương Trình Khuyến Mãi
        </TextContainer>
        <SaleContainer>   
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
      </div>
      <Footer />
    </Loading>
  );
};

export default PostDetailsComponent;
