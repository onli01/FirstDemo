import React, { useState } from 'react';
import { Cascader, Button, Input, Space, Table, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';

interface DataType {
  key: React.Key;
  name: string;
  project: string;
  method: string;
  url: string;
  auth: string;
  update_time: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '接口名称',
    dataIndex: 'name',
  },
  {
    title: '项目名称',
    dataIndex: 'project',
  },
  {
    title: '方法',
    dataIndex: 'method',
  },
  {
    title: 'URL',
    dataIndex: 'url',
  },
  {
    title: '开发者',
    dataIndex: 'auth',
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
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
        <Button type="primary" onClick={undefined}>
          调试
        </Button>
        <Button type="primary" danger onClick={undefined}>
          删除
        </Button>
      </Space>
    ),
  },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    project: '项目一',
    method: 'GET',
    url: `London, Park Lane no. ${i}`,
    auth: 'admin',
    update_time: '2023-08-03 10:10:10',
  });
}

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

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
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        {/* <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span> */}
        {/* <Space direction="vertical">
          <Input addonBefore="接口名称" defaultValue="" />
        </Space> */}
        <Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
          <Col span={4}>
            <Input addonBefore="接口名称" />
          </Col>
          <Col span={4}>
            <Input addonBefore="URL" />
          </Col>
          <Col span={4}>
            <Input addonBefore="开发者" />
          </Col>
          <Col span={4}>
            <Input addonBefore="更新时间" />
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={undefined}>
              查询
            </Button>
            <Button type="primary" onClick={undefined} style={{ marginLeft: 12 }}>
              <PlusOutlined />
              新增接口
            </Button>
          </Col>
        </Row>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};
