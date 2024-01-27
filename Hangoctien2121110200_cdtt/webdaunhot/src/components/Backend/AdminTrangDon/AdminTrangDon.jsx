import { Button, Form, Select, Space } from 'antd'
import { SearchOutlined, DeleteOutlined,PlusOutlined,
  EditOutlined, } from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../../TableComponent/TableComponent'
import { useState } from 'react'
import InputComponent from '../../InputComponent/InputComponent'
import { getBase64, renderOptions } from '../../../utils'
import * as TrangdonService from '../../../services/TrangdonService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import Loading from '../../LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../../ModalComponent/ModalComponent'

const AdminTrangdon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null);
  const inittial = () => ({
    name: '',
    title: '',
    slug: '',
    detail: '',
    description: '',
    image: '',
    type: '',
    newType: '',
  })
  const [stateTrangdon, setStateTrangdon] = useState(inittial())
  const [stateTrangdonDetails, setStateTrangdonDetails] = useState(inittial())

  const [form] = Form.useForm();

  const mutation = useMutationHooks(
    (data) => {
      const { name,
        title,
        slug,
        detail,
        image,
        description,
        type } = data
      const res = TrangdonService.createTrangdon({
        name,
        title,
        slug,
        detail,
        image,
        description,
        type
      })
      return res
    }
  )
  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = TrangdonService.updateTrangdon(
        id,
        token,
        { ...rests })
      return res
    },
  )

  const mutationDeleted = useMutationHooks(
    (data) => {
      const { id,
        token,
      } = data
      const res = TrangdonService.deleteTrangdon(
        id,
        token)
      return res
    },
  )

  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const { token, ...ids
      } = data
      const res = TrangdonService.deleteManyTrangdon(
        ids,
        token)
      return res
    },
  )

  const getAllTrangdons = async () => {
    const res = await TrangdonService.getAllTrangdon()
    return res
  }

  const fetchGetDetailsTrangdon = async (rowSelected) => {
    const res = await TrangdonService.getDetailsTrangdon(rowSelected)
    if (res?.data) {
      setStateTrangdonDetails({
        name : res?.data?.name,
        title : res?.data?.title,
        slug : res?.data?.slug ,
        detail : res?.data?.detail ,
        image : res?.data?.image ,
        description : res?.data?.description,
        type : res?.data?.type
      })
    }
    setIsLoadingUpdate(false)
  }

  useEffect(() => {
    if(!isModalOpen) {
      form.setFieldsValue(stateTrangdonDetails)
    }else {
      form.setFieldsValue(inittial())
    }
  }, [form, stateTrangdonDetails, isModalOpen])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsTrangdon(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const handleDetailsTrangdon = () => {
    setIsOpenDrawer(true)
  }

  const handleDelteManyTrangdons = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryTrangdon.refetch()
      }
    })
  }

  const fetchAllTypeTrangdon = async () => {
    const res = await TrangdonService.getAllTypeTrangdon()
    return res
  }

  const { data, isLoading, isSuccess, isError } = mutation
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


  const queryTrangdon = useQuery({ queryKey: ['trangdons'], queryFn: getAllTrangdons })
  const typeTrangdon = useQuery({ queryKey: ['type-trangdon'], queryFn: fetchAllTypeTrangdon })
  const { isLoading: isLoadingTrangdons, data: trangdons } = queryTrangdon
  const renderAction = () => {
    return (
      <div>
      <DeleteOutlined
        style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
        onClick={() => setIsModalOpenDelete(true)}
      />
      <EditOutlined
        style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
        onClick={handleDetailsTrangdon}
      />
    </div>
     
    )
  }


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
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
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
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
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
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Xóa
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
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


  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
        title: 'Title',
        dataIndex: 'title',
  
    },
    {
        title: 'Chi tiết',
        dataIndex: 'detail',
  
    },

    {
      title: 'Mô tả',
      dataIndex: 'description',
    },
    {
      title: 'Hình ảnh',
    dataIndex: 'image',
    render: (image) => (
      <img
        src={image}
        style={{
          height: '60px',
          width: '60px',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
        alt="Hình ảnh"
      />
    ),

    },

    {
      title: 'Chọn',
      dataIndex: 'action',
      render: renderAction
    },
  ];
  const dataTable = trangdons?.data?.length && trangdons?.data?.map((trangdon) => {
    return { ...trangdon, key: trangdon._id }
  })

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success()
      handleCancel()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess])

  useEffect(() => {
    if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
      message.success()
    } else if (isErrorDeletedMany) {
      message.error()
    }
  }, [isSuccessDelectedMany])

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === 'OK') {
      message.success()
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isSuccessDelected])

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateTrangdonDetails({
      name: '',
      title: '',
      description: '',
      slug: '',
      image: '',
      type: '',
      detail: ''
    })
    form.resetFields()
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success()
      handleCloseDrawer()
    } else if (isErrorUpdated) {
      message.error()
    }
  }, [isSuccessUpdated])

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }


  const handleDeleteTrangdon = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryTrangdon.refetch()
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateTrangdon({
        name: '',
        title: '',
        description: '',
        slug: '',
        image: '',
        type: '',
        detail: ''
    })
    form.resetFields()
  };

  const onFinish = () => {
    const params = {
      name: stateTrangdon.name,
      title: stateTrangdon.title,
      slug: stateTrangdon.slug,
      description: stateTrangdon.description,
      detail: stateTrangdon.detail,
      image: stateTrangdon.image,
      type: stateTrangdon.type === 'add_type' ? stateTrangdon.newType : stateTrangdon.type,
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryTrangdon.refetch()
      }
    })
  }

  const handleOnchange = (e) => {
    setStateTrangdon({
      ...stateTrangdon,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeDetails = (e) => {
    setStateTrangdonDetails({
      ...stateTrangdonDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateTrangdon({
      ...stateTrangdon,
      image: file.preview
    })
  }

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateTrangdonDetails({
      ...stateTrangdonDetails,
      image: file.preview
    })
  }
  const onUpdateTrangdon = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateTrangdonDetails }, {
      onSettled: () => {
        queryTrangdon.refetch()
      }
    })
  }

  const handleChangeSelect = (value) => {
      setStateTrangdon({
        ...stateTrangdon,
        type: value
      })
  }

  return (
    <div>
      <WrapperHeader>Quản lý bài đăng</WrapperHeader>
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
      <div style={{ marginTop: '20px' }}>
        <TableComponent handleDelteMany={handleDelteManyTrangdons} columns={columns} isLoading={isLoadingTrangdons} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          };
        }} />
      </div>
      <ModalComponent forceRender title="Tạo bài đăng" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
              label="Tên bài đăng"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateTrangdon['name']} onChange={handleOnchange} name="name" />
            </Form.Item>

            <Form.Item
              label="Loại bài đăng "
              name="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >
              <Select
                name="type"
                // defaultValue="lucy"
                // style={{ width: 120 }}
                value={stateTrangdon.type}
                onChange={handleChangeSelect}
                options={renderOptions(typeTrangdon?.data?.data)}
                />
            </Form.Item>
            {stateTrangdon.type === 'add_type' && (
              <Form.Item
                label='Loại bài đăng mới'
                name="newType"
                rules={[{ required: true, message: 'Please input your type!' }]}
              >
                <InputComponent value={stateTrangdon.newType} onChange={handleOnchange} name="newType" />
              </Form.Item>
            )}
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input your count title!' }]}
            >
              <InputComponent value={stateTrangdon.title} onChange={handleOnchange} name="title" />
            </Form.Item>
            <Form.Item
              label="Slug"
              name="slug"
              rules={[{ required: true, message: 'Please input your count slug!' }]}
            >
              <InputComponent value={stateTrangdon.slug} onChange={handleOnchange} name="slug" />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: 'Please input your count description!' }]}
            >
              <InputComponent value={stateTrangdon.description} onChange={handleOnchange} name="description" />
            </Form.Item>
            <Form.Item
              label="Chi tiết"
              name="detail"
              rules={[{ required: true, message: 'Please input your count detail!' }]}
            >
              <InputComponent value={stateTrangdon.detail} onChange={handleOnchange} name="detail" />
            </Form.Item>
            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[{ required: true, message: 'Please input your count image!' }]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                <Button >Chọn ảnh</Button>
                {stateTrangdon?.image && (
                  <img src={stateTrangdon?.image} style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt="hình trangdon" />
                )}
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent title='Chi tiết bài đăng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateTrangdon}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên bài đăng "
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateTrangdonDetails['name']} onChange={handleOnchangeDetails} name="name" />
            </Form.Item>

            <Form.Item
              label="Loại bài đăng"
              name="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >
              <InputComponent value={stateTrangdonDetails['type']} onChange={handleOnchangeDetails} name="type" />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: 'Please input your count description!' }]}
            >
              <InputComponent value={stateTrangdon.description} onChange={handleOnchangeDetails} name="description" />
            </Form.Item>
            <Form.Item
              label="Chi tiết"
              name="detail"
              rules={[{ required: true, message: 'Please input your count detail!' }]}
            >
              <InputComponent value={stateTrangdonDetails.detail} onChange={handleOnchangeDetails} name="detail" />
            </Form.Item>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input your title of trangdon!' }]}
            >
              <InputComponent value={stateTrangdonDetails.title} onChange={handleOnchangeDetails} name="title" />
            </Form.Item>
            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[{ required: true, message: 'Please input your count image!' }]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                <Button >Chọn ảnh</Button>
                {stateTrangdonDetails?.image && (
                  <img src={stateTrangdonDetails?.image} style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt="avatar" />
                )}
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent title="Xóa bài đăng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteTrangdon}>
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa bài đăng này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminTrangdon