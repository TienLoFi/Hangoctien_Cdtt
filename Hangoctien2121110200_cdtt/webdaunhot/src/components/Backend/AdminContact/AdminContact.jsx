
import { Button, Form, Select, Space } from 'antd'
import { SearchOutlined ,PlusOutlined,  DeleteOutlined,
  EditOutlined,} from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../../TableComponent/TableComponent'
import { useState } from 'react'
import InputComponent from '../../InputComponent/InputComponent'
import { getBase64, renderOptions } from '../../../utils'
import * as ContactService from '../../../services/ContactService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import Loading from '../../LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../../ModalComponent/ModalComponent'

const AdminContact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null);
  const inittial = () => ({
    title: '',
    detail: '',
    email: '',
    phone: '',
    name: '',

 
  })
  const [stateContact, setStateContact] = useState(inittial())
  const [stateContactDetails, setStateContactDetails] = useState(inittial())

  const [form] = Form.useForm();

  const mutation = useMutationHooks(
    (data) => {
      const {  title,
        detail,
        email,
        name,
        phone,


    } = data
      const res = ContactService.createContact({
        title,
        detail,
        email,
        name,
        phone,

    
     
      })
      return res
    }
  )
  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = ContactService.updateContact(
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
      const res = ContactService.deleteContact(
        id,
        token)
      return res
    },
  )

  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const { token, ...ids
      } = data
      const res = ContactService.deleteManyContact(
        ids,
        token)
      return res
    },
  )

  const getAllContacts = async () => {
    const res = await ContactService.getAllContact()
    return res
  }

  const fetchGetDetailsContact = async (rowSelected) => {
    const res = await ContactService.getDetailsContact(rowSelected)
    if (res?.data) {
      setStateContactDetails({
        title: res?.data?.title,
        phone: res?.data?.phone,
        name: res?.data?.name,
        email: res?.data?.email,
        detail: res?.data?.detail,
       
      })
    }
    setIsLoadingUpdate(false)
  }

  useEffect(() => {
    if(!isModalOpen) {
      form.setFieldsValue(stateContactDetails)
    }else {
      form.setFieldsValue(inittial())
    }
  }, [form, stateContactDetails, isModalOpen])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsContact(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const handleDetailsContact = () => {
    setIsOpenDrawer(true)
  }

  const handleDelteManyContacts = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryContact.refetch()
      }
    })
  }



  const { data, isLoading, isSuccess, isError } = mutation
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


  const queryContact = useQuery({ queryKey: ['categories'], queryFn: getAllContacts })
  const { isLoading: isLoadingContacts, data: categories } = queryContact
  const renderAction = () => {
    return (

       <div>
       <DeleteOutlined
         style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
         onClick={() => setIsModalOpenDelete(true)}
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
      title: 'Tên Liên Hệ ',
      dataIndex: 'name',
      sorter: (a, b) => a.title.length - b.title.length,
      ...getColumnSearchProps('name')
    },
    
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
        title: 'Số Điện Thoại',
        dataIndex: 'phone',
      },
  
    {
        title: 'Tiêu Đề',
        dataIndex: 'title',
      },
  
      {
        title: 'Chi Tiết',
        dataIndex: 'detail',
      },
  
    
  




    {
      title: 'Chọn',
      dataIndex: 'action',
      render: renderAction
    },
  ];
  const dataTable = categories?.data?.length && categories?.data?.map((contact) => {
    return { ...contact, key: contact._id }
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
    setStateContactDetails({
        title: '',
        detail: '',
        email: '',
        phone: '',
        name: '',
    
  
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


  const handleDeleteContact = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryContact.refetch()
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateContact({
        title: '',
        detail: '',
        email: '',
        phone: '',
        name: '',
    
  
    })
    form.resetFields()
  };

  const onFinish = () => {
    const params = {
      title: stateContact.title,
   
      content: stateContact.content,
 
      
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryContact.refetch()
      }
    })
  }

  const handleOnchange = (e) => {
    setStateContact({
      ...stateContact,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeDetails = (e) => {
    setStateContactDetails({
      ...stateContactDetails,
      [e.target.name]: e.target.value
    })
  }




  const onUpdateContact = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateContactDetails }, {
      onSettled: () => {
        queryContact.refetch()
      }
    })
  }


  return (
    <div>
      <WrapperHeader>Quản lý Liên Hệ</WrapperHeader>
      <div style={{ marginTop: '10px',textAlign:'center' }}>
    
      
        <TableComponent handleDelteMany={handleDelteManyContacts} columns={columns} isLoading={isLoadingContacts} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          };
        }} />
      </div>
      <ModalComponent forceRender title="Tạo Liên Hệ" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Loading isLoading={isLoading}>

          <Form
            title="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên Liên Hệ"
              title="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateContact['name']} onChange={handleOnchange} name="name" />
            </Form.Item>
            <Form.Item
              label="Email"
              title="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <InputComponent value={stateContact['email']} onChange={handleOnchange} name="email" />
            </Form.Item>
            <Form.Item
              label="Số Điện Thoại"
              title="phone"
              rules={[{ required: true, message: 'Please input your phone!' }]}
            >
              <InputComponent value={stateContact['phone']} onChange={handleOnchange} name="phone" />
            </Form.Item>
            <Form.Item
              label="Tên Tiêu Đề "
              title="title"
              rules={[{ required: true, message: 'Please input your title!' }]}
            >
              <InputComponent value={stateContact['title']} onChange={handleOnchange} name="title" />
            </Form.Item>
            <Form.Item
              label="Chi tiết"
              title="detail"
              rules={[{ required: true, message: 'Please input your count detail!' }]}
            >
              <InputComponent value={stateContact.detail} onChange={handleOnchange} name="detail" />
            </Form.Item>
          
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent title='Chi tiết Liên Hệ' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

          <Form
            title="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateContact}
            autoComplete="on"
            form={form}
          >
               <Form.Item
              label="Tên Liên Hệ"
              title="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateContact['name']} onChange={handleOnchangeDetails} title="name" />
            </Form.Item>
            <Form.Item
              label="Email"
              title="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <InputComponent value={stateContact['email']} onChange={handleOnchangeDetails} name="email" />
            </Form.Item>
            <Form.Item
              label="Số Điện Thoại"
              title="phone"
              rules={[{ required: true, message: 'Please input your phone!' }]}
            >
              <InputComponent value={stateContact['phone']} onChange={handleOnchangeDetails} name="phone" />
            </Form.Item>
            <Form.Item
              label="Tên Tiêu Đề "
              title="title"
              rules={[{ required: true, message: 'Please input your title!' }]}
            >
              <InputComponent value={stateContact['title']} onChange={handleOnchangeDetails} name="title" />
            </Form.Item>
            <Form.Item
              label="Chi tiết"
              title="detail"
              rules={[{ required: true, message: 'Please input your count detail!' }]}
            >
              <InputComponent value={stateContact.detail} onChange={handleOnchangeDetails} name="detail" />
            </Form.Item>
  
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent title="Xóa Liên Hệ" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteContact}>
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa Liên Hệ này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminContact