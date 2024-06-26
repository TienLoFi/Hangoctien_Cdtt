import { Button, Form, Select, Space } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { useRef } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../../TableComponent/TableComponent";
import { useState } from "react";
import InputComponent from "../../InputComponent/InputComponent";
import { getBase64, renderOptions, renderOptions2 } from "../../../utils";
import * as ProductService from "../../../services/ProductService";
import * as BrandService from "../../../services/BrandService";
import { useMutationHooks } from "../../../hooks/useMutationHook";
import Loading from "../../LoadingComponent/Loading";
import { useEffect } from "react";
import * as message from "../../Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../../ModalComponent/ModalComponent";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const user = useSelector((state) => state?.user);
  const searchInput = useRef(null);
  const inittial = () => ({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    imageDetail: [],
    type: "",
    brand: "",
    countInStock: "",
    newType: "",
    newBrand: "",
    discount: "",
  });
  const [stateProduct, setStateProduct] = useState(inittial());
  const [stateProductDetails, setStateProductDetails] = useState(inittial());
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedBrandDetails, setSelectedBrandDetails] = useState("");

  const [form] = Form.useForm();
  // const renderOptions2 = (data) => {
  //   if (!data) return [];

  //   return data.map((brand) => ({
  //     value: brand._id,
  //     label: brand.name,
  //   }));
  // };

  const mutation = useMutationHooks((data) => {
    const {
      name,
      price,
      description,
      rating,
      image,
      imageDetail,
      type,
      countInStock,
      brand,
      discount,
    } = data;
    const res = ProductService.createProduct({
      name,
      price,
      description,
      rating,
      image,
      imageDetail,
      type,
      countInStock,
      brand,
      discount,
    });
    return res;
  });
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, token, { ...rests });
    return res;
  });

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
  });

  const mutationDeletedMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = ProductService.deleteManyProduct(ids, token);
    return res;
  });

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        rating: res?.data?.rating,
        image: res?.data?.image,
        imageDetail: res?.data?.imageDetail,
        type: res?.data?.type,
        brand: res?.data?.brand,
        countInStock: res?.data?.countInStock,
        discount: res?.data?.discount,
      });
    }
    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateProductDetails);
    } else {
      form.setFieldsValue(inittial());
    }
  }, [form, stateProductDetails, isModalOpen]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };

  const handleDelteManyProducts = (ids) => {
    mutationDeletedMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
  };
  const fetchAllBrand = async () => {
    const res = await ProductService.getAllBrandProduct();
    return res;
  };
  const { data, isLoading, isSuccess, isError } = mutation;
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDelected,
    isError: isErrorDeleted,
  } = mutationDeleted;
  const {
    data: dataDeletedMany,
    isLoading: isLoadingDeletedMany,
    isSuccess: isSuccessDelectedMany,
    isError: isErrorDeletedMany,
  } = mutationDeletedMany;

  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const typeProduct = useQuery({
    queryKey: ["type-product"],
    queryFn: fetchAllTypeProduct,
  });
  const BrandProduct = useQuery({
    queryKey: ["brands"],
    queryFn: fetchAllBrand,
  });
  const { isLoading: isLoadingProducts, data: products } = queryProduct;
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
          onClick={handleDetailsProduct}
        />
      </div>
    );
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{
    //     //     backgroundColor: '#ffc069',
    //     //     padding: 0,
    //     //   }}
    //     //   searchWords={[searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  });

  const commonColumnStyle = {
    fontSize: "16px",
    textAlign: "center",
  };

  const columns = [
    {
      title: "Hình Ảnh",
      dataIndex: "image",
      render: (text, record) => (
        <img
          src={text}
          alt={record.name}
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      ),
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
      render: (text) => <span style={commonColumnStyle}>{text}</span>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">= 50",
          value: ">=",
        },
        {
          text: "<= 50",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.price >= 50;
        }
        return record.price <= 50;
      },
      render: (text) => (
        <span style={commonColumnStyle}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text)}
        </span>
      ),
    },
    {
      title: "Đánh Giá",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: ">= 3",
          value: ">=",
        },
        {
          text: "<= 3",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return Number(record.rating) >= 3;
        }
        return Number(record.rating) <= 3;
      },
      render: (text) => <span style={commonColumnStyle}>{text}</span>,
    },
    {
      title: "Danh Mục",
      dataIndex: "type",
      render: (text) => <span style={commonColumnStyle}>{text}</span>,
    },
    {
      title: "Số Lượng Trong Kho",
      dataIndex: "countInStock",
      render: (text) => <span style={commonColumnStyle}>{text}</span>,
    },
    {
      title: "Hành Động",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
      return { ...product, key: product._id };
    });

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessDelectedMany && dataDeletedMany?.status === "OK") {
      message.success();
    } else if (isErrorDeletedMany) {
      message.error();
    }
  }, [isSuccessDelectedMany]);

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDelected]);

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      price: "",
      description: "",
      rating: "",
      image: "",
      imageDetail: "",
      type: "",
      brand: "",
      countInStock: "",
    });
    form.resetFields();
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated]);

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteProduct = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      price: "",
      description: "",
      rating: "",
      image: "",
      imageDetail: [],
      type: "",
      brand: "",
      countInStock: "",
      discount: "",
    });
    form.resetFields();
  };

  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      price: stateProduct.price,
      description: stateProduct.description,
      rating: stateProduct.rating,
      image: stateProduct.image,
      imageDetail: stateProduct.imageDetail,
      brand:
        stateProduct.brand === "add_brand"
          ? stateProduct.newBrand
          : stateProduct.brand,
      type:
        stateProduct.type === "add_type"
          ? stateProduct.newType
          : stateProduct.type,
      countInStock: stateProduct.countInStock,
      discount: stateProduct.discount,
    };
    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  const handleOnchangeAvatarsMultiple = async ({ fileList }) => {
    const updatedDetails = await Promise.all(
      fileList.map(async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        return file.preview;
      })
    );

    setStateProduct({
      ...stateProduct,
      imageDetail: [
        ...new Set([...stateProduct.imageDetail, ...updatedDetails]),
      ],
    });
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview,
    });
  };

  const handleOnchangeAvatarDetailsMultiple = async ({ fileList }) => {
    const updatedDetails = await Promise.all(
      fileList.map(async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        return file.preview;
      })
    );

    setStateProduct({
      ...stateProduct,
      imageDetail: [
        ...new Set([...stateProduct.imageDetail, ...updatedDetails]),
      ],
    });
  };

  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        // ...stateProductDetails,
        // brand: selectedBrandDetails,
      },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  const handleChangeSelect = (value) => {
    setStateProduct({
      ...stateProduct,
      type: value,
    });
  };

  //brand
  const handleChangeSelect1 = (value) => {
    setStateProduct({
      ...stateProduct,
      brand: value,
    });
  };
  const handleChangeSelect1Details = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          handleDelteMany={handleDelteManyProducts}
          columns={columns}
          isLoading={isLoadingProducts}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>
      <ModalComponent
        forceRender
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Loading isLoading={isLoading}>
        <Form
  name="basic"
  labelCol={{ span: 6 }}
  wrapperCol={{ span: 18 }}
  onFinish={onFinish}
  autoComplete="on"
  form={form}
>
  <Form.Item
    label="Tên Sản Phẩm"
    name="name"
    rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
  >
    <InputComponent
      value={stateProduct["name"]}
      onChange={handleOnchange}
      name="name"
    />
  </Form.Item>

  <Form.Item
    label="Thương Hiệu"
    name="brand"
    rules={[{ required: true, message: "Vui lòng nhập thương hiệu!" }]}
  >
    <Select
      name="brand"
      value={stateProduct.brand}
      onChange={handleChangeSelect1}
      options={renderOptions2(BrandProduct?.data?.data)}
    />
  </Form.Item>

  {stateProduct.brand === "add_brand" && (
    <Form.Item
      label="Thương Hiệu Mới"
      name="newBrand"
      rules={[
        { required: true, message: "Vui lòng nhập thương hiệu mới!" },
      ]}
    >
      <InputComponent
        value={stateProduct.newBrand}
        onChange={handleOnchange}
        name="newBrand"
      />
    </Form.Item>
  )}

  <Form.Item
    label="Danh Mục"
    name="type"
    rules={[{ required: true, message: "Vui lòng nhập danh mục!" }]}
  >
    <Select
      name="type"
      value={stateProduct.type}
      onChange={handleChangeSelect}
      options={renderOptions(typeProduct?.data?.data)}
    />
  </Form.Item>

  {stateProduct.type === "add_type" && (
    <Form.Item
      label="Danh Mục Mới"
      name="newType"
      rules={[{ required: true, message: "Vui lòng nhập danh mục mới!" }]}
    >
      <InputComponent
        value={stateProduct.newType}
        onChange={handleOnchange}
        name="newType"
      />
    </Form.Item>
  )}

  <Form.Item
    label=" Nhập Kho"
    name="countInStock"
    rules={[
      { required: true, message: "Vui lòng nhập số lượng trong kho!" },
    ]}
  >
    <InputComponent
      value={stateProduct.countInStock}
      onChange={handleOnchange}
      name="countInStock"
    />
  </Form.Item>

  <Form.Item
    label="Giá "
    name="price"
    rules={[
      { required: true, message: "Vui lòng nhập giá sản phẩm!" },
    ]}
  >
    <InputComponent
      value={stateProduct.price}
      onChange={handleOnchange}
      name="price"
    />
  </Form.Item>

  <Form.Item
    label="Mô Tả "
    name="description"
    rules={[
      { required: true, message: "Vui lòng nhập mô tả sản phẩm!" },
    ]}
  >
    <InputComponent
      value={stateProduct.description}
      onChange={handleOnchange}
      name="description"
    />
  </Form.Item>

  <Form.Item
    label="Đánh Giá"
    name="rating"
    rules={[
      { required: true, message: "Vui lòng nhập đánh giá sản phẩm!" },
    ]}
  >
    <InputComponent
      value={stateProduct.rating}
      onChange={handleOnchange}
      name="rating"
    />
  </Form.Item>

  <Form.Item
    label="Giảm Giá"
    name="discount"
    rules={[
      { required: true, message: "Vui lòng nhập giảm giá sản phẩm!" },
    ]}
  >
    <InputComponent
      value={stateProduct.discount}
      onChange={handleOnchange}
      name="discount"
    />
  </Form.Item>

  <Form.Item
    label="Ảnh"
    name="image"
    rules={[
      { required: true, message: "Vui lòng chọn ảnh sản phẩm!" },
    ]}
  >
    <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
      <Button>Chọn ảnh</Button>
      {stateProduct?.image && (
        <img
          src={stateProduct?.image}
          style={{
            height: "60px",
            width: "60px",
            borderRadius: "50%",
            objectFit: "cover",
            marginLeft: "10px",
          }}
          alt="avatar"
        />
      )}
    </WrapperUploadFile>
  </Form.Item>

  <Form.Item
    label="Ảnh"
    name="image"
    rules={[
      { required: true, message: "Vui lòng chọn ít nhất một ảnh sản phẩm!" },
    ]}
  >
    <WrapperUploadFile
      onChange={handleOnchangeAvatarsMultiple}
      maxCount={6}
    >
      <Button>Chọn ảnh</Button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "10px",
        }}
      >
        {stateProduct?.imageDetail &&
          stateProduct.imageDetail.map((preview, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <img
                src={preview}
                style={{
                  height: "40px",
                  width: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "10px",
                }}
                alt={`avatar-${index}`}
              />
            </div>
          ))}
      </div>
    </WrapperUploadFile>
  </Form.Item>

  <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
    <Button type="primary" htmlType="submit">
      Gửi
    </Button>
  </Form.Item>
</Form>

        </Loading>
      </ModalComponent>
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="90%"
      >
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateProduct}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên Sản Phẩm"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
            >
              <InputComponent
                value={stateProductDetails["name"]}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="Thương Hiệu"
              name="brand"
              rules={[{ required: true, message: "Please input your brand!" }]}
            >
              <InputComponent
                value={stateProductDetails["brand"]}
                onChange={handleOnchangeDetails}
                name="brand"
              />
            </Form.Item>
            <Form.Item
              label="Danh Mục"
              name="type"
              rules={[{ required: true, message: "Vui lòng nhập danh mục!" }]}
            >
              <InputComponent
                value={stateProductDetails["type"]}
                onChange={handleOnchangeDetails}
                name="type"
              />
            </Form.Item>
            <Form.Item
              label="Count inStock"
              name="countInStock"
              rules={[
                { required: true, message: "Please input your count inStock!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.countInStock}
                onChange={handleOnchangeDetails}
                name="countInStock"
              />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[
                { required: true, message: "Please input your count price!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.price}
                onChange={handleOnchangeDetails}
                name="price"
              />
            </Form.Item>
            <Form.Item
              label="Mô Tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your count description!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetails.description}
                onChange={handleOnchangeDetails}
                name="description"
              />
            </Form.Item>
            <Form.Item
              label="Đánh Giá"
              name="rating"
              rules={[
                { required: true, message: "Please input your count rating!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.rating}
                onChange={handleOnchangeDetails}
                name="rating"
              />
            </Form.Item>
            <Form.Item
              label="Giảm Giá"
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Please input your discount of product!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetails.discount}
                onChange={handleOnchangeDetails}
                name="discount"
              />
            </Form.Item>
            <Form.Item
              label="Ảnh"
              name="image"
              rules={[
                { required: true, message: "Vui lòng chọn ảnh sản phẩm!" },
              ]}
            >
              <WrapperUploadFile
                onChange={handleOnchangeAvatarDetails}
                maxCount={1}
              >
                <Button>Select File</Button>
                {stateProductDetails?.image && (
                  <img
                    src={stateProductDetails?.image}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item
              label="Ảnh"
              name="image"
              rules={[
                { required: true, message: "Vui lòng chọn ít nhất một ảnh sản phẩm" },
              ]}
            >
              <WrapperUploadFile
                onChange={handleOnchangeAvatarDetailsMultiple}
                maxCount={6}
              >
                <Button>Select File</Button>
                {stateProductDetails?.imageDetail && (
                  <img
                    src={stateProductDetails?.imageDetail}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}
      >
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa sản phẩm này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};
export default AdminProduct;
