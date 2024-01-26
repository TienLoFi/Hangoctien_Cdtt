import { Col, Image, Rate, Row, Form } from "antd";
import React from "react";

import {
  WrapperStyleImageSmall,
  WrapperStyleColImage,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperAddressProduct,
  WrapperQualityProduct,
  WrapperInputNumber,
  WrapperBtnQualityProduct,
  WrapperProducts,
} from "./style";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct, resetOrder } from "../../redux/slides/orderSlide";
import { convertPrice, initFacebookSDK } from "../../utils";
import { useEffect } from "react";
import * as message from "../Message/Message";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import CommentComponent from "../CommentComponent/CommentComponent";
import { useMemo } from "react";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import { updateUser } from "../../redux/slides/userSlide";
import CardComponent from "../CardComponent/CardComponent";
import Footer from "../../pages/Footer/Footer";
const ProductDetailComponent = ({ idProduct }) => {
  const [limit, setLimit] = useState(6);
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [errorLimitOrder, setErrorLimitOrder] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onChange = (value) => {
    setNumProduct(Number(value));
  };

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const [form] = Form.useForm();
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);
  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };
  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleCancleUpdate = () => {
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };
  const handleUpdateInforUser = () => {
    const { name, address, city, phone } = stateUserDetails;
    if (name && address && city && phone) {
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...stateUserDetails },
        {
          onSuccess: () => {
            dispatch(updateUser({ name, address, city, phone }));
            setIsOpenModalUpdateInfo(false);
          },
        }
      );
    }
  };
  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);

    return res;
  };
  useEffect(() => {
    initFacebookSDK();
  }, []);

  useEffect(() => {
    const orderRedux = order?.orderItems?.find(
      (item) => item.product === productDetails?._id
    );
    if (
      orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
      (!orderRedux && productDetails?.countInStock > 0)
    ) {
      setErrorLimitOrder(false);
    } else if (productDetails?.countInStock === 0) {
      setErrorLimitOrder(true);
    }
  }, [numProduct]);

  useEffect(() => {
    if (order.isSucessOrder) {
      message.success("Đã thêm vào giỏ hàng");
    }
    return () => {
      dispatch(resetOrder());
    };
  }, [order.isSucessOrder]);

  const handleChangeCount = (type, limited) => {
    if (type === "increase") {
      if (!limited) {
        setNumProduct(numProduct + 1);
      }
    } else {
      if (!limited) {
        setNumProduct(numProduct - 1);
      }
    }
  };

  const { isLoading, data: productDetails } = useQuery(
    ["product-details", idProduct],
    fetchGetDetailsProduct,
    { enabled: !!idProduct }
  );

  const { data: products } = useQuery(["products", limit], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      // {
      //     name: { type: String, required: true },
      //     amount: { type: Number, required: true },
      //     image: { type: String, required: true },
      //     price: { type: Number, required: true },
      //     product: {
      //         type: mongoose.Schema.Types.ObjectId,
      //         ref: 'Product',
      //         required: true,
      //     },
      // },
      const orderRedux = order?.orderItems?.find(
        (item) => item.product === productDetails?._id
      );
      if (
        orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
        (!orderRedux && productDetails?.countInStock > 0)
      ) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: productDetails?.name,
              amount: numProduct,
              image: productDetails?.image,
              imageDetail: productDetails?.imageDetail,
              price: productDetails?.price,
              product: productDetails?._id,
              discount: productDetails?.discount,
              countInstock: productDetails?.countInStock,
            },
          })
        );
      } else {
        setErrorLimitOrder(true);
      }
    }
  };
  const [mainImage, setMainImage] = useState(null);
  const [thumbnailImages, setThumbnailImages] = useState([]);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(0);

  const handleThumbnailClick = (clickedImage, index) => {
    setMainImage(clickedImage);
    setSelectedThumbnailIndex(index);
  };

  useEffect(() => {
    if (productDetails?.imageDetail?.length > 0) {
      setMainImage(productDetails.image);
      setThumbnailImages([productDetails.image, ...productDetails.imageDetail]);
      setSelectedThumbnailIndex(0); // Reset the index to 0 when productDetails change
    }
  }, [productDetails]);
  return (
    <Loading isLoading={isLoading}>
      <Row
        style={{
          padding: "16px",
          background: "#fff",
          borderRadius: "4px",
          height: "100%",
        }}
      >
        <Col
          span={10}
          style={{ borderRight: "1px solid #e5e5e5", paddingRight: "8px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={mainImage}
              alt="image product"
              preview={true}
              style={{
                width: "300px",
                height: "250px",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </div>
          <Row style={{ paddingTop: "10px", justifyContent: "center" }}>
            {thumbnailImages.map((image2, index) => (
              <WrapperStyleColImage key={index} span={4}>
                <WrapperStyleImageSmall
                  src={image2}
                  alt={`image small ${index}`}
                  preview={false}
                  onClick={() => handleThumbnailClick(image2, index)}
                  style={{
                    height: "73px",
                    width: "73px",
                    objectFit: "contain",
                    border:
                      index === selectedThumbnailIndex
                        ? "2px solid #00f"
                        : "none",
                    opacity: index === selectedThumbnailIndex ? 1 : 0.5,
                  }}
                />
              </WrapperStyleColImage>
            ))}
          </Row>
        </Col>
        <Col span={14} style={{ paddingLeft: "10px" }}>
          <WrapperStyleNameProduct>
            {productDetails?.name}
          </WrapperStyleNameProduct>
          <div>
            <Rate
              allowHalf
              defaultValue={productDetails?.rating}
              value={productDetails?.rating}
            />
            <WrapperStyleTextSell> | Da ban 1000+</WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>
              {convertPrice(productDetails?.price)}
            </WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressProduct>
            <span>Giao đến </span>
            <span className="address">{user?.address}</span> -
            <span
              className="change-address"
              onClick={handleChangeAddress}
              style={{ color: "#9255FD", cursor: "pointer" }}
            >
              Đổi địa chỉ
            </span>
          </WrapperAddressProduct>
          {/* { <LikeButtonComponent
                     dataHref={ process.env.REACT_APP_IS_LOCAL 
                                ? "https://developers.facebook.com/docs/plugins/" 
                                : window.location.href
                            } 
                    /> } */}
          <div
            style={{
              margin: "10px 0 20px",
              padding: "10px 0",
              borderTop: "1px solid #e5e5e5",
              borderBottom: "1px solid #e5e5e5",
            }}
          >
            <div style={{ marginBottom: "10px" }}>Số lượng</div>
            <WrapperQualityProduct>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => handleChangeCount("decrease", numProduct === 1)}
              >
                <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
              </button>
              <WrapperInputNumber
                onChange={onChange}
                defaultValue={1}
                max={productDetails?.countInStock}
                min={1}
                value={numProduct}
                size="small"
              />
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleChangeCount(
                    "increase",
                    numProduct === productDetails?.countInStock
                  )
                }
              >
                <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
              </button>
            </WrapperQualityProduct>
          </div>
          <div style={{ display: "flex", aliggItems: "center", gap: "12px" }}>
            <div>
              <ButtonComponent
                size={40}
                styleButton={{
                  background: "rgb(238, 160, 25)",
                  height: "48px",
                  width: "220px",
                  border: "none",
                  borderRadius: "4px",
                  transition: "background 0.3s ease, transform 0.3s ease",
                }}
                onClick={handleAddOrderProduct}
                textbutton={"Chọn mua"}
                styleTextButton={{
                  color: "rgb(252, 252, 252)",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              ></ButtonComponent>
              {errorLimitOrder && (
                <div style={{ color: "red" }}>Sản phẩm không đủ hàng</div>
              )}
            </div>
            <ButtonComponent
              size={40}
              styleButton={{
                background: "#fff",
                height: "48px",
                width: "220px",
                border: "1px solid rgb(13, 92, 182)",
                borderRadius: "4px",
              }}
              textbutton={"Mua trả sau"}
              styleTextButton={{ color: "rgb(13, 92, 182)", fontSize: "15px" }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            ></ButtonComponent>
          </div>

          {/* <LikeButtonComponent
            dataHref={"https://developers.facebook.com/docs/plugins/"}
          /> */}
        </Col>
      </Row>
      <div className="">
        <h3>
          <b>Sản Phẩm Cùng Loại</b>
        </h3>
      </div>
      <div className="row">
        <WrapperProducts>
          {products?.data?.map(
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
      </div>

      <div>
        <h3>
          <b>Mô Tả</b>
        </h3>

        <h4>
          <p>{productDetails?.description}</p>
        </h4>
        <Image
          src={productDetails?.image}
          alt="image product"
          preview={false}
          style={{
            width: "350px",
            height: "250px",
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />
      </div>

      {/* COMMENT */}
      {
        <CommentComponent
          dataHref={
            process.env.REACT_APP_IS_LOCAL
              ? "https://developers.facebook.com/docs/plugins/comments#configurator"
              : window.location.href
          }
          width="1270"
        />
      }
      <CommentComponent
        dataHref={
          "https://developers.facebook.com/docs/plugins/comments#configurator"
        }
        width="1270"
      />
      <ModalComponent
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancleUpdate}
        onOk={handleUpdateInforUser}
      >
        <Loading isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            // onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent
                value={stateUserDetails["name"]}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please input your city!" }]}
            >
              <InputComponent
                value={stateUserDetails["city"]}
                onChange={handleOnchangeDetails}
                name="city"
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please input your  phone!" }]}
            >
              <InputComponent
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>

            <Form.Item
              label="Adress"
              name="address"
              rules={[
                { required: true, message: "Please input your  address!" },
              ]}
            >
              <InputComponent
                value={stateUserDetails.address}
                onChange={handleOnchangeDetails}
                name="address"
              />
            </Form.Item>
          </Form>
        </Loading>
        
      </ModalComponent>
  
    </Loading>
  );
};

export default ProductDetailComponent;
