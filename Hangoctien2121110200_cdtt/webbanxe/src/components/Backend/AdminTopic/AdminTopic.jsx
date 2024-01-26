import { Button, Form, Select, Space } from 'antd'
import { SearchOutlined ,  PlusOutlined,
  DeleteOutlined,
  EditOutlined,} from '@ant-design/icons'
import React, { useRef } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../../TableComponent/TableComponent'
import { useState } from 'react'
import InputComponent from '../../InputComponent/InputComponent'
import { getBase64, renderOptions } from '../../../utils'
import * as TopicService from '../../../services/TopicService'
import { useMutationHooks } from '../../../hooks/useMutationHook'
import Loading from '../../LoadingComponent/Loading'
import { useEffect } from 'react'
import * as message from '../../Message/Message'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../../DrawerComponent/DrawerComponent'
import { useSelector } from 'react-redux'
import ModalComponent from '../../ModalComponent/ModalComponent'

const AdminTopic = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null);
  const inittial = () => ({
    title: '',
    content: '',

 
  })
  const [stateTopic, setStateTopic] = useState(inittial())
  const [stateTopicDetails, setStateTopicDetails] = useState(inittial())

  const [form] = Form.useForm();

  const mutation = useMutationHooks(
    (data) => {
      const { title,
        content,

    } = data
      const res = TopicService.createTopic({
        title,
        content,
    
     
      })
      return res
    }
  )
  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = TopicService.updateTopic(
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
      const res = TopicService.deleteTopic(
        id,
        token)
      return res
    },
  )

  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const { token, ...ids
      } = data
      const res = TopicService.deleteManyTopic(
        ids,
        token)
      return res
    },
  )

  const getAllTopics = async () => {
    const res = await TopicService.getAllTopic()
    return res
  }

  const fetchGetDetailsTopic = async (rowSelected) => {
    const res = await TopicService.getDetailsTopic(rowSelected)
    if (res?.data) {
      setStateTopicDetails({
        title: res?.data?.title,
        content: res?.data?.content,
       
      })
    }
    setIsLoadingUpdate(false)
  }

  useEffect(() => {
    if(!isModalOpen) {
      form.setFieldsValue(stateTopicDetails)
    }else {
      form.setFieldsValue(inittial())
    }
  }, [form, stateTopicDetails, isModalOpen])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsTopic(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const handleDetailsTopic = () => {
    setIsOpenDrawer(true)
  }

  const handleDelteManyTopics = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryTopic.refetch()
      }
    })
  }



  const { data, isLoading, isSuccess, isError } = mutation
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


  const queryTopic = useQuery({ queryKey: ['categories'], queryFn: getAllTopics })
  const { isLoading: isLoadingTopics, data: categories } = queryTopic
  const renderAction = () => {
    return (

        <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
          onClick={handleDetailsTopic}
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
      title: 'Tiêu Đề Chủ Đề ',
      dataIndex: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
      ...getColumnSearchProps('title')
    },
    
    {
      title: 'Nội dung',
      dataIndex: 'content',
    },


  




    {
      title: 'Chọn',
      dataIndex: 'action',
      render: renderAction
    },
  ];
  const dataTable = categories?.data?.length && categories?.data?.map((topic) => {
    return { ...topic, key: topic._id }
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
    setStateTopicDetails({
      title: '',
      content: '',
   
  
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


  const handleDeleteTopic = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryTopic.refetch()
      }
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateTopic({
      title: '',
      content: '',

  
    })
    form.resetFields()
  };

  const onFinish = () => {
    const params = {
      title: stateTopic.title,
   
      content: stateTopic.content,
 
      
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryTopic.refetch()
      }
    })
  }

  const handleOnchange = (e) => {
    setStateTopic({
      ...stateTopic,
      [e.target.title]: e.target.value
    })
  }

  const handleOnchangeDetails = (e) => {
    setStateTopicDetails({
      ...stateTopicDetails,
      [e.target.title]: e.target.value
    })
  }




  const onUpdateTopic = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateTopicDetails }, {
      onSettled: () => {
        queryTopic.refetch()
      }
    })
  }


  return (
    <div>
      <WrapperHeader>Quản lý Chủ Đề</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
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
        <TableComponent handleDelteMany={handleDelteManyTopics} columns={columns} isLoading={isLoadingTopics} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          };
        }} />
      </div>
      <ModalComponent forceRender title="Tạo Chủ Đề" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
              label="Tên Chủ Đề"
              title="title"
              rules={[{ required: true, message: 'Please input your title!' }]}
            >
              <InputComponent value={stateTopic['title']} onChange={handleOnchange} title="title" />
            </Form.Item>

           
            <Form.Item
              label="Chi tiết"
              title="content"
              rules={[{ required: true, message: 'Please input your count content!' }]}
            >
              <InputComponent value={stateTopic.content} onChange={handleOnchange} title="content" />
            </Form.Item>
          
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent title='Chi tiết Chủ Đề' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

          <Form
            title="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateTopic}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Tên Chủ Đề "
              title="title"
              rules={[{ required: true, message: 'Please input your title!' }]}
            >
              <InputComponent value={stateTopicDetails['title']} onChange={handleOnchangeDetails} title="title" />
            </Form.Item>

        
            <Form.Item
              label="Chi tiết Chủ Đề"
              title="content"
              rules={[{ required: true, message: 'Please input your count content!' }]}
            >
              <InputComponent value={stateTopicDetails.content} onChange={handleOnchangeDetails} title="content" />
            </Form.Item>
  
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent title="Xóa Chủ Đề" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteTopic}>
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc xóa Chủ Đề này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminTopic