import React, { useEffect, useState } from 'react';
import { Button, Input, Space, Table, Row, Col, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import { getUserAll } from '@/services/user/api';

interface DataType {
  user_id: number;
  username: string;
  nickname: string;
  email: string;
  status: string;
  create_time: string;
  last_login: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
  },
  {
    title: '最近登录',
    dataIndex: 'last_login',
  },
  {
    title: '操作',
    key: 'options',
    render: (_, record) => (
      <Space size="middle">
        {/* <a>Invite {record.key}</a> */}
        <Button type="primary" onClick={undefined}>
          编辑
        </Button>
        <Button type="primary" danger onClick={undefined}>
          删除
        </Button>
      </Space>
    ),
  },
];

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);

  const getUser = async () => {
    try {
      const resp = await getUserAll();
      if (resp.code === 200) {
        setUserList(resp.data.list);
      } else {
        message.error(resp.msg);
      }
    } catch (e) {
      message.error(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
          <Col span={4}>
            <Input addonBefore="用户名" />
          </Col>
          <Col span={4}>
            <Input addonBefore="昵称" />
          </Col>
          <Col span={4}>
            <Input addonBefore="邮箱" />
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={undefined}>
              查询
            </Button>
            <Button type="primary" onClick={undefined} style={{ marginLeft: 12 }}>
              <PlusOutlined />
              新增账户
            </Button>
          </Col>
        </Row>
      </div>
      <Table
        rowKey={(record) => record.user_id}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={userList}
      />
    </div>
  );
};
