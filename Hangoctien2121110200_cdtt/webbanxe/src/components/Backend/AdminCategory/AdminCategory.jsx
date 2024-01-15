import { Button, Form, Select, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../../TableComponent/TableComponent'
import { useState } from 'react'
import InputComponent from '../../InputComponent/InputComponent'
import { getBase64, renderOptions } from '../../../utils'
import * as CategoryService from '../../../services/CategoryService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import Loading from '../../LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../../ModalComponent/ModalComponent'

const AdminCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null);
  const inittial = () => ({
    name: '',
    description: '',
    image: '',
 
  })
  const [stateCategory, setStateCategory] = useState(inittial())
  const [stateCategoryDetails, setStateCategoryDetails] = useState(inittial())

  const [form] = Form.useForm();

  const mutation = useMutationHooks(
    (data) => {
      const { name,
        description,
        image,
    } = data
      const res = CategoryService.createCategory({
        name,
        description,
        image,
     
      })
      return res
    }
  )
  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = CategoryService.updateCategory(
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
      const res = CategoryService.deleteCategory(
        id,
        token)
      return res
    },
  )

  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const { token, ...ids
      } = data
      const res = CategoryService.deleteManyCategory(
        ids,
        token)
      return res
    },
  )

  const getAllCategorys = async () => {
    const res = await CategoryService.getAllCategory()
    return res
  }

  const fetchGetDetailsCategory = async (rowSelected) => {
    const res = await CategoryService.getDetailsCategory(rowSelected)
    if (res?.data) {
      setStateCategoryDetails({
        name: res?.data?.name,
        description: res?.data?.description,
        image: res?.data?.image,
      })
    }
    setIsLoadingUpdate(false)
  }

  useEffect(() => {
    if(!isModalOpen) {
      form.setFieldsValue(stateCategoryDetails)
    }else {
      form.setFieldsValue(inittial())
    }
  }, [form, stateCategoryDetails, isModalOpen])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsCategory(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const handleDetailsCategory = () => {
    setIsOpenDrawer(true)
  }

  const handleDelteManyCategorys = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryCategory.refetch()
      }
    })
  }



  const { data, isLoading, isSuccess, isError } = mutation
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


  const queryCategory = useQuery({ queryKey: ['categories'], queryFn: getAllCategorys })
  const { isLoading: isLoadingCategorys, data: categories } = queryCategory
  const renderAction = () => {
    return (
      <div>
        <Button style={{ color:'orange'}} onClick={handleDetailsCategory}>Edit</Button>
        <Button style={{ color:'red'}} onClick={() => setIsModalOpenDelete(true)}>Delete</Button>
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
      title: 'Tên category',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
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
  const dataTable = categories?.data?.length && categories?.data?.map((category) => {
    return { ...category, key: category._id }
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
    setStateCategoryDetails({
      name: '',
      description: '',
      image: '',
  
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


  const handleDeleteCategory = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryCategory.refetch()
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateCategory({
      name: '',
      description: '',
      image: '',
  
    })
    form.resetFields()
  };

  const onFinish = () => {
    const params = {
      name: stateCategory.name,
   
      description: stateCategory.description,
      image: stateCategory.image,
      
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryCategory.refetch()
      }
    })
  }

  const handleOnchange = (e) => {
    setStateCategory({
      ...stateCategory,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeDetails = (e) => {
    setStateCategoryDetails({
      ...stateCategoryDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateCategory({
      ...stateCategory,
      image: file.preview
    })
  }

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateCategoryDetails({
      ...stateCategoryDetails,
      image: file.preview
    })
  }
  const onUpdateCategory = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateCategoryDetails }, {
      onSettled: () => {
        queryCategory.refetch()
      }
    })
  }


  return (
    <div>
      <WrapperHeader>Quản lý Danh Mục</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button style={{ color:'#008000', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}>Create </Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent handleDelteMany={handleDelteManyCategorys} columns={columns} isLoading={isLoadingCategorys} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          };
        }} />
      </div>
      <ModalComponent forceRender title="Tạo Danh Mục" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
              label="Tên Danh Mục"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateCategory['name']} onChange={handleOnchange} name="name" />
            </Form.Item>

           
            <Form.Item
              label="Chi tiết"
              name="description"
              rules={[{ required: true, message: 'Please input your count description!' }]}
            >
              <InputComponent value={stateCategory.description} onChange={handleOnchange} name="description" />
            </Form.Item>
          
            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[{ required: true, message: 'Please input your count image!' }]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                <Button >Chọn ảnh</Button>
                {stateCategory?.image && (
                  <img src={stateCategory?.image} style={{
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
      </ModalComponent>
      <DrawerComponent title='Chi tiết Danh Mục' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateCategory}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên Danh Mục "
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateCategoryDetails['name']} onChange={handleOnchangeDetails} name="name" />
            </Form.Item>

        
            <Form.Item
              label="Chi tiết Danh Mục"
              name="description"
              rules={[{ required: true, message: 'Please input your count description!' }]}
            >
              <InputComponent value={stateCategoryDetails.description} onChange={handleOnchangeDetails} name="description" />
            </Form.Item>
  
            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[{ required: true, message: 'Please input your count image!' }]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                <Button >Chọn ảnh</Button>
                {stateCategoryDetails?.image && (
                  <img src={stateCategoryDetails?.image} style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt="Danh Mục" />
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
      <ModalComponent title="Xóa Danh Mục" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteCategory}>
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa Danh Mục này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminCategory