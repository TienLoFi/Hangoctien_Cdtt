import { Form, Input, Button, Col, Row, notification } from "antd";
import React from "react";
import { useState } from "react";
import * as ContactService from "../../services/ContactService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import * as message from "../../components/Message/Message";
import GoogleMapReact from "google-map-react";

import { MailOutlined, HomeOutlined, PhoneOutlined } from "@ant-design/icons";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const ContactComponent = () => {
  const defaultProps = {
    center: {
      lat: 10.839879549506612,
      lng: 106.76649636482787,
    },
    zoom: 19,
  };
  const inittial = () => ({
    name: "",
    email: "",
    phone: "",
    title: "",
    detail: "",
  });
  const [stateContact, setStateContact] = useState(inittial());
  const [form] = Form.useForm();
  const mutation = useMutationHooks((data) => {
    const { name, email, phone, title, detail } = data;
    const res = ContactService.createContact({
      name,
      email,
      phone,
      title,
      detail,
    });
    return res;
  });
  const { data, isLoading, isSuccess, isError } = mutation;

  const getAllContacts = async () => {
    const res = await ContactService.getAllContact();
    return res;
  };

  const queryContact = useQuery({
    queryKey: ["contacts"],
    queryFn: getAllContacts,
  });
  const onFinish = (values) => {
    const params = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      title: values.title,
      detail: values.detail,
    };

    mutation.mutate(params, {
      onSettled: () => {
        queryContact.refetch();
      },
    });
  };

  const handleOnchange = (e) => {
    setStateContact({
      ...stateContact,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success("Operation successful!");

      setTimeout(() => {
        form.resetFields();
      }, 500);
    } else if (isSuccess && data?.status !== "OK") {
      message.error("Operation failed. Please try again.");
    }
  }, [isSuccess, data, form]);

  return (
    <Row>
      <div style={{ width: "100%", height: "100%" }}>
        <Col span={35} style={{ margin: "10px" }}>
          <h1 style={{ fontWeight: "bold" }}>Liên Hệ </h1>
          <h2 style={{ fontWeight: "initial" }}>
            Chúng tôi luôn sẵn sàng tiếp nhận mọi ý kiến ​đóng góp và giải đáp
            những yêu cầu của bạn. Hãy liên hệ ngay với chúng tôi
          </h2>

          <h4 style={{ fontWeight: "bold" }}>
            <HomeOutlined /> 8 Thống Nhất Phước Long B Thủ Đức Thành phố Hồ Chí
            Minh
          </h4>
          <h4 style={{ fontWeight: "bold" }}>
            <PhoneOutlined /> 0246.329.1102
          </h4>
          <h4 style={{ fontWeight: "bold" }}>
            <MailOutlined /> contact@fullstack.edu.vn
          </h4>
        </Col>
        <div style={{ display: "flex", padding: "10px" }}>
          <Col span={11} style={{}}>
            <Form
              name="basic"
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 18 }}
              onFinish={onFinish}
              autoComplete="on"
              form={form}
              style={{ fontWeight: "bold", marginTop: "100px" }}
            >
              <Form.Item
                label="Họ Và Tên"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  value={stateContact["name"]}
                  onChange={handleOnchange}
                  name="name"
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input your city!" }]}
              >
                <Input
                  value={stateContact["email"]}
                  onChange={handleOnchange}
                  name="email"
                />
              </Form.Item>
              <Form.Item
                label="Điện Thoại"
                name="phone"
                rules={[
                  { required: true, message: "Please input your phone!" },
                ]}
              >
                <Input
                  value={stateContact["phone"]}
                  onChange={handleOnchange}
                  name="phone"
                />
              </Form.Item>
              <Form.Item
                label="Tiêu Đề "
                name="title"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
              >
                <Input
                  value={stateContact["title"]}
                  onChange={handleOnchange}
                  name="title"
                />
              </Form.Item>
              <Form.Item
                label="Chi Tiết"
                name="detail"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
                wrapperCol={{ span: 18 }}
              >
                <Input.TextArea
                  rows={5}
                  value={stateContact["detail"]}
                  onChange={handleOnchange}
                  name="detail"
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
                <Button
                  style={{
                    fontWeight: "bold",
                    height: "50px",
                    width: "100px",
                    borderRadius: "30px",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  Gửi Đi
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col
            span={12}
            style={{
              border: "2px solid black",
              margin: "0 auto",
              height: "552px",
            }}
          >
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyAp1wiXcD3heI7Yue8qaFa63phqiHOV-UI",
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent
                lat={10.839879549506612}
                lng={106.76649636482787}
              />
            </GoogleMapReact>
          </Col>
        </div>
      </div>
    </Row>
  );
};

export default ContactComponent;
